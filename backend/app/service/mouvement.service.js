
const { Op, json, Error, where, Sequelize } = require('sequelize');
const Depot = require('../models/depot');
const depotRepository = require('../repository/depot.repository');
const mouvementRepository = require('../repository/mouvement.repository');
const stockRepository = require('../repository/stock.repository');
const depotService = require('./depot.service');
const Emplacement = require('../models/emplacement');
const Produit = require('../models/produits');
const emplacementService = require('./emplacement.service');

class mouvementService{
    async create(data){
        return await mouvementRepository.create(data)
    }
    
    async getIdMouv(id){
        return await mouvementRepository.getIdMouv(id);
    }

    async contProduiMouvement(id_p){
        return await mouvementRepository.contProduiMouvement(id_p);
    }

    async createMouvement(id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut){

        let data = { id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut };

        // const updat = ancienLimitDepot = nouvelValeurLimitDepot
        if (type_mvt == "Entrée") {

            //maka an'ilay depot sy prod
            await this.findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p);
            if(data.qtt_mvt < 0)
                data.qtt_mvt = 0
            // creation mouvement
            return await this.create(data)
                
        } else /* type_mvt == "Sortie" */{
            
            //maka an'ilay depot sy prod
            await this.findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p);
            
            // creation mouvement
            return await this.create(data)
        }
    }

    async findAll (){
       return await Emplacement.findAll();
    }

    async updateStock_dep_pro(stock, qtt_mvt, type_mvt){
        
        if (type_mvt ==  "Entrée") {
            stock.qtt_st+= qtt_mvt 
            
        }else {
            stock.qtt_st -= qtt_mvt 
        }

        if (stock.qtt_st < 0) {
            stock.qtt_st = 0
        }

        await stockRepository.update(stock.id_st, stock)
    }

    async createNewStock(id_p, id_dep, qtt_mvt, type_mvt){

        let qtt_st 

            if (type_mvt == "Entrée") {
                qtt_st = qtt_mvt
            }                
            else {
                qtt_st = 0
            }

        const data = {qtt_st, id_p, id_dep }
                
        if (data.qtt_st<0)
            data.qtt_st = 0

        await stockRepository.create(data)
    }

    async findStockByProdDep(id_dep, id_p){
        return await stockRepository.findStockByProdDep(id_dep, id_p);
    }
    async updateEmplacement(id_em,nouvelleQuantite){

        return await Emplacement.update(
            { 
                qtt_actuel: nouvelleQuantite,
                volume_actuel: nouvelleQuantite
            },
            { where: { id_em } }
        );

    }
    async updateVolume_actuel(id_em,updateVolume_actuel){
        return await Emplacement.update(
            {
                volume_actuel : updateVolume_actuel,
            },
            { where: { id_em }}
        )
    }
    async findOneEmplacement(id_em){
        return await Emplacement.findOne({ where: {id_em}})
    }

    async findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p){

        let stock = await this.findStockByProdDep(id_dep, id_p); 
        
        if(stock != null){ //rah misy 
            stock = JSON.stringify(stock)
            stock = JSON.parse(stock)
            return  await this.updateStock_dep_pro(stock, qtt_mvt, type_mvt) // ataov n modif
        }else 
        
        return  await this.createNewStock(id_p, id_dep, qtt_mvt, type_mvt) //raha tss de mcreer
    }

    distributeQtt(qtt_mvt, emplacements) {
        // Calculer l'espace total disponible en soustrayant `qtt_actuelle` de `volume_max` pour chaque emplacement
        const espaceTotalDisponible = emplacements.reduce((total, emplacement) => {
            const volume_max = emplacement.dataValues.longeur * emplacement.dataValues.largeur * emplacement.dataValues.hauteur
            const qtt_actuel = emplacement.dataValues.qtt_actuel || 0;  // Utiliser 0 si qtt_actuel est indéfini
            const espaceDisponible = volume_max - qtt_actuel;
            return total + espaceDisponible;
        }, 0);
    
        // Si aucun espace disponible, retourner une erreur
        if (espaceTotalDisponible === 0) {
            throw new Error('Aucun espace disponible pour le mouvement.');
        }
    
        // Répartir la quantité `qtt_mvt` proportionnellement à l'espace disponible dans chaque emplacement
        return emplacements.map(emplacement => {
            const volume_max = emplacement.dataValues.longeur * emplacement.dataValues.largeur * emplacement.dataValues.hauteur
            const qtt_actuel = emplacement.dataValues.qtt_actuel || 0;
            const espaceDisponible = volume_max - qtt_actuel;
    
            // Calculer la quantité répartie pour cet emplacement
            const qttRepartie = Math.min(Math.round((espaceDisponible / espaceTotalDisponible) * qtt_mvt), espaceDisponible);
    
            return {
                id_em: emplacement.dataValues.id_em,
                qtt_mvt: qttRepartie
            };
        });
    }

    async distributeQtt_modification_qtt_actuelle(volume_p, qtt_mvt, emplacements) {
        // Répartir la quantité entre les emplacements
        const repartition = this.distributeQtt(qtt_mvt, emplacements);
    
        // Si la répartition échoue, retourner une erreur
        if (!repartition) {
            return { erreur: 'Erreur dans la répartition de la quantité' };
        }
    
        // Mettre à jour la quantité actuelle (`qtt_actuel`) pour chaque emplacement
        for (const { id_em, qtt_mvt: qttRepartie } of repartition) {
            const emplacement = emplacements.find(emp => emp.dataValues.id_em === id_em);
    
            if (emplacement) {
                // Rechercher les informations de l'emplacement dans la base de données
                const emplacementDb = await this.findOneEmplacement(id_em);
                console.log('emplacementDb----', emplacementDb);
    
                if (emplacementDb) {
                    const volume_max = emplacementDb.volume_max || 0;                    
                    const qtt_actuelle = emplacementDb.qtt_actuel;    
                    
                    //Calculer la nouvelle quantité
                    await this.calculNouvellQuantite(qtt_actuelle,qttRepartie,qtt_mvt,volume_p,id_em,volume_max )
                    
                } else {
                    console.log(`Emplacement ID ${id_em} introuvable dans la base de données.`);
                }
            }
        }
    }

    //function Calculer la nouvelle quantité
    
    async calculNouvellQuantite(qtt_actuelle,qttRepartie,qtt_mvt,volume_p,id_em,volume_max) {
        const nouvelleQuantite = qtt_actuelle + qttRepartie;
        const nouvelleVolume_actuel = qtt_mvt * volume_p;

        if(volume_max >= nouvelleVolume_actuel){
            await this.updateEmplacement(id_em,nouvelleQuantite);
            const emplacementById = await this.findOneEmplacement(id_em);
            let updateVolume_actuel =  emplacementById.dataValues.qtt_actuel * nouvelleVolume_actuel; 
            await this.updateVolume_actuel(id_em, updateVolume_actuel);
        }
         else {
            throw new Error(`error. Changer autre dépot`);
        }

    }
    
    async verifierVolume(id_em, qtt_mvt, volume_p) {
        try {
            // Rechercher l'emplacement par son identifiant (id_em)
            const emplacement = await findOneEmplacement(id_em);
    
            if (!emplacement) {
                throw new Error(`Emplacement avec ID ${id_em} introuvable.`);
            }
    
            // Récupérer les volumes actuels et maximums de l'emplacement

            const volume_max = emplacement.longeur * emplacement.largeur * emplacement.hauteur;
            const volume_actuel = emplacement.volume_actuel;
    
            console.log(`Volume actuel: ${volume_actuel} m³, Volume maximum: ${volume_max} m³`);
    
            // Calculer le nouveau volume après le mouvement
            const nouvelleVolume_actuel = volume_actuel + (qtt_mvt * volume_p);
    
            // Vérifier si le nouveau volume dépasse le volume maximal
            if (nouvelleVolume_actuel > volume_max) {

                throw new Error(`Erreur: Le volume actuel (${nouvelleVolume_actuel} m³) dépasse la capacité maximale (${volume_max} m³). Mouvement annulé.`);
            }
    
            // Si tout est correct, continuer avec la mise à jour du mouvement
            console.log('Mouvement autorisé, continuer avec la mise à jour.');
            return { succes: true };
        } catch (error) {
            console.error(error.message);
            return { erreur: error.message };
        }
    }
    
}

module.exports = new mouvementService();