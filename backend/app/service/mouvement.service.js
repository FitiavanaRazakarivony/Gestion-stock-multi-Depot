
const { Op, json, Error } = require('sequelize');
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

    async findAll (){
        return await stockRepository.findAll()
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

    async findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p){

        let stock = await this.findStockByProdDep(id_dep, id_p); 
        
        if(stock != null){ //rah misy 
            stock = JSON.stringify(stock)
            stock = JSON.parse(stock)
            return  await this.updateStock_dep_pro(stock, qtt_mvt, type_mvt) // ataov n modif
        }else 
        return  await this.createNewStock(id_p, id_dep, qtt_mvt, type_mvt) //raha tss de mcreer
    }

    // Répartir le volume_p entre les emplacements en fonction de l'espace disponible
    distributeVolume(volume_p, emplacements) {
        // Calculer l'espace total disponible en soustrayant `volume_actuel` de `volume_max` pour chaque emplacement
        const espaceTotalDisponible = emplacements.reduce((total, emplacement) => {
            // Calculer l'espace disponible pour cet emplacement
           const volume_max = emplacement.dataValues.longeur * emplacement.dataValues.largeur * emplacement.dataValues.hauteur
            const espaceDisponible = volume_max - emplacement.dataValues.volume_actuel;
            // Ajouter cet espace disponible au total
            return total + espaceDisponible;
        }, 0);

        // Répartir le volume_p proportionnellement à l'espace disponible dans chaque emplacement
        return emplacements.map(emplacement => {
            // Calculer l'espace disponible pour cet 
            const volume_max = emplacement.dataValues.longeur * emplacement.dataValues.largeur * emplacement.dataValues.hauteur
            const espaceDisponible = volume_max - emplacement.dataValues.volume_actuel;
            // Calculer le volume à attribuer à cet emplacement en fonction de sa part de l'espace total disponible
            const volumeReparti = Math.round((espaceDisponible / espaceTotalDisponible) * volume_p);
            // Retourner l'ID de l'emplacement et le volume réparti
            return {
                id_em: emplacement.dataValues.id_em,
                volume_p: volumeReparti
            };
        });
    }

    async distributeVolume_modification_volume_actuel(volume_p, emplacements) {
        // Répartir le volume entre les emplacements en fonction de l'espace disponible
        const repartition = this.distributeVolume(volume_p, emplacements);        
        // Si la répartition échoue, retourner une erreur
        if (!repartition) return { erreur: 'Erreur dans la répartition du volume' };

        // Parcourir chaque emplacement et mettre à jour la quantité actuelle (`volume_actuel`)
        for (const { id_em, volume_p } of repartition) {
            // Trouver l'emplacement correspondant dans la liste des emplacements
            const emplacement = emplacements.find(emp => emp.dataValues.id_em === id_em);

            if (emplacement) {
                // Rechercher l'emplacement dans la base de données pour obtenir les valeurs actuelles de `volume_actuel` et `volume_max`
                const emplacementDb = await Emplacement.findOne({ where: { id_em } });

                if (emplacementDb) {
                    // Obtenir la quantité maximale (volume_max) de l'emplacement
                    const ancien_volume_max = emplacementDb.volume_max;
                    // Calculer la nouvelle quantité actuelle en ajoutant le volume réparti
                    const nouvelleQuantite = emplacementDb.volume_actuel + volume_p;
                    // Vérifier si la nouvelle quantité dépasse la capacité maximale (volume_max)
                    if (nouvelleQuantite <= ancien_volume_max) {
                        // Mettre à jour `volume_actuel` avec la nouvelle quantité dans la base de données
                        await Emplacement.update(
                            { volume_actuel: nouvelleQuantite },
                            { where: { id_em } }
                        );
                        // Afficher un message indiquant que l'emplacement a été mis à jour avec succès
                        console.log(`Emplacement ID ${id_em} mis à jour avec volume_actuel: ${nouvelleQuantite}`);
                    }                
                    else {
                        // Si la nouvelle quantité dépasse la capacité maximale, lancer une erreur
                        throw new Error(`La nouvelle quantité (${nouvelleQuantite}) dépasse la capacité maximale (${ancien_volume_max}) pour l'emplacement ${emplacementDb.nom_em} car la capacité actuel est: ${emplacementDb.volume_actuel}, donc changer le dépot` );
                    }
                } else {
                    // Si l'emplacement n'est pas trouvé dans la base de données, afficher un message d'erreur
                    console.log(`Emplacement ID ${id_em} introuvable dans la base de données.`);
                }
            }
        }
    }  

    
}

module.exports = new mouvementService();