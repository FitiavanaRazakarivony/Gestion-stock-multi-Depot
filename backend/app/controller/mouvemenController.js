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
// Creer une Stock

exports.creerMouvement = async (req, res) =>{

    const id = req.params.id_mvt
    const id_ut = req.user

    const {
        id_p,
        id_dep, 
        type_mvt, 
        qtt_mvt,
        date_mvt
        } =  req.body
    try {
        
        const utilisateur = await Utilisateur.findByPk(id_ut);
        const depot = await Depot.findByPk(req.body.id_dep);
        const produit = await Produit.findByPk(req.body.id_p);

        if(!utilisateur){
            return res.status(404).json({erreur:'utilisateur invalide'});
        }

        if(!depot){
            return res.status(404).json({erreur:'Depot invalide'});
        }

        if(!produit){
            return res.status(404).json({erreur:'produit invalide'});
        }

        const newMouvement = await mouvementService.createMouvement(
            id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut,id
        );

        // const nouveMouvement = await Mouvement.create(req.body);
        res.status(201).json({message:'Creation Stock avec succés', mouvement: newMouvement, utilisateur, depot, produit});
        // res.status(201).json(nouveMouvement, utilisateur, depot, produit);
    
    } catch (erreur) {
        console.log("eerr", erreur);
        res.status(500).json({erreur:erreur.message});
    }

}

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

