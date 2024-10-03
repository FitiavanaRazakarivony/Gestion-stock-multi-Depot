const Depot = require('../models/depot');
const Mouvement = require('../models/mouvement');
const Produit = require('../models/produits');
const Utilisateur = require('../models/utilisateur');
const mouvementService = require('../service/mouvement.service');
const mouvementRepository = require('../repository/mouvement.repository');
const stockRepository = require('../repository/stock.repository');
const Stock = require('../models/stock');
const { findAllDep_Pro } = require('../service/stock.service');
const { where } = require('sequelize');
const depotService = require('../service/depot.service');
const Emplacement = require('../models/emplacement');

// Fonction pour créer un mouvement
exports.creerMouvement = async (req, res) => {
    const { id_mvt: id } = req.params;
    const id_ut = req.user;
    const { id_p, id_dep, type_mvt, qtt_mvt, date_mvt } = req.body;

    try {
        // Vérifier la présence des emplacements et du dépôt
        const [emplacements, depot] = await Promise.all([
            Emplacement.findAll({ where: { id_dep } }),
            Depot.findByPk(id_dep)
        ]);

        if (!emplacements.length) return res.status(404).json({ erreur: 'Aucun emplacement trouvé pour ce dépôt.' });
        if (!depot) return res.status(404).json({ erreur: 'Dépôt invalide' });

        // Vérifier la présence du produit et calculer son volume
        const produit = await Produit.findByPk(id_p);
        if (!produit) return res.status(404).json({ erreur: 'Produit invalide' });

        const volume_p = produit.longeur * produit.largeur * produit.hauteur;
        if (volume_p <= 0) return res.status(400).json({ erreur: 'Volume du produit non défini ou invalide' });

        // Vérifier l'utilisateur
        const utilisateur = await Utilisateur.findByPk(id_ut);
        if (!utilisateur) return res.status(404).json({ erreur: 'Utilisateur invalide' });

        // Vérifier le mouvement d'entrée
        if (type_mvt === "Entrée") {
            // Calculer le volume total du produit (volume_p * qtt_mvt)
            const total_volume_mvt = volume_p * qtt_mvt;

            // Vérifier si le volume total dépasse la capacité du dépôt
            let volume_max_total = 0;
            let volume_actuel_total = 0;

            // Calculer le volume maximal et actuel total pour tous les emplacements
            emplacements.forEach(emplacement => {
                volume_max_total += emplacement.volume_max;
                volume_actuel_total += emplacement.volume_actuel;
            });

            const nouvelle_volume_actuel = volume_actuel_total + total_volume_mvt;

            if (nouvelle_volume_actuel > volume_max_total) {
                // Annuler la création du mouvement si le volume dépasse
                return res.status(400).json({ erreur: 'Le volume total du mouvement dépasse la capacité maximale du dépôt.' });
            }

            // Si la vérification passe, procéder à la modification de la quantité
            await mouvementService.distributeQtt_modification_qtt_actuelle(volume_p, qtt_mvt, emplacements);

            // Créer le mouvement
            const newMouvement = await mouvementService.createMouvement(id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut, id);

            // Réponse avec succès
            return res.status(201).json({
                message: 'Création du mouvement avec succès',
                mouvement: newMouvement,
                utilisateur,
                depot,
                produit
            });

        } else {
            // Mouvement de sortie (par exemple)
            const newMouvement = await mouvementService.createMouvement(id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut, id);

            // Réponse avec succès
            return res.status(201).json({
                message: 'Création du mouvement avec succès',
                mouvement: newMouvement,
                utilisateur,
                depot,
                produit
            });
        }

    } catch (erreur) {
        console.error("Erreur lors de la création du mouvement : ", erreur);
        res.status(500).json({ erreur: erreur.message });
    }
};

//List Mouvement

exports.listeMouvement = async (req, res) =>{
    try {
        const mouvement = await Mouvement.findAll({include:
            [
                // 'produit','depot','utilisateur'
                // { model: Stock, as: 'stocks' }, // Utiliser l'alias défini pour Stock
                { model: Produit, as: 'produit' },
                { model: Depot, as: 'depot' },
                { model: Utilisateur, as: 'utilisateur'}
                
            ]});
        res.status(200).json(mouvement);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}



//List par Id mouvement

exports.getIdMouv = async (req, res) =>{
    
    try {
        const id  = req.params.id_mvt
        const mouvement = await mouvementService.getIdMouv(id) 
        
        res.status(200).json(mouvement);

    } catch (erreur) {
        res.status(400).json({error : 'cette id mouvement est vide' });    
    }
}

//Supprimer Mouvement

exports.supprimerMouvement = async (req, res) =>{
    try {
        const id = req.params.id_mvt;
        const mouvement = await Mouvement.destroy({where:{id_mvt:id}});
        res.status(200).json(mouvement);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification Mouvement

exports.modificationMouvement = async (req, res)=>{
    const id_ut = req.user ;
    const id = req.params.id_mvt;
    const { type_mvt, date_mvt, qtt_mvt, id_dep, id_p } = req.body;

    try {        

        const ancienMouv = await Mouvement.findByPk(id);

        const ancienStocks = await findAllDep_Pro(ancienMouv.id_p, ancienMouv.id_dep);

        if (ancienStocks.length) {

            const ancienStock = ancienStocks[0]
            let qttStock = ancienStock.qtt_st

            let oldMvt = ancienMouv.qtt_mvt

            if (ancienMouv.type_mvt == "Entrée")
                qttStock -= oldMvt  
            else
                qttStock += ancienMouv.qtt_mvt
            await Stock.update({qtt_st:qttStock} ,{where:{id_st:ancienStock.id_st }})
        }    

        await Mouvement.destroy({where:{id_mvt:id}});

        const creatMouvement = await mouvementService.createMouvement(
            id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut,id
        );
        
        const modifMouvement = await Mouvement.findOne({ 
            where: {id_mvt:creatMouvement.id_mvt},
            include:['produit','depot','utilisateur']
        });

        res.status(200).json({message:"Modification Mouvement est avec succés", mouvement:modifMouvement});
                
    } catch (erreur) {
        console.log("eer++++", erreur);
        res.status(500).json({error : 'Erreur Mouvement de produit'});
    }
    
}

// exports.produitDetails = async (req, res) =>{
//     try {
//         const produitDetails = await Mouvement.findAll({include:['stocks', 'produit']});

//         res.status(200).json(produitDetails);       

//     } catch (erreur) {
//         res.status(400).json({erreur:erreur.message});
//     }
// }

exports.contProduiMouvement =async (req, res)=>{
    const id_p = req.params.id_p

    const result =  await mouvementService.contProduiMouvement(id_p)

    res.status(200).json(result);

}

