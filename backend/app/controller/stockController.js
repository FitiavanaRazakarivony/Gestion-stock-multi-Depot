const { log } = require('handlebars');
const Produit = require('../models/produits')
const stockService = require('../service/stock.service');
const stockRepository = require('../repository/stock.repository');
const Emplacement = require('../models/emplacement');

// Creer une Stock

exports.creerStock = async (req, res) =>{
    const {
        qtt_st,
        id_em,
        id_p
    }= req.body

    try {        

        const produit = await Produit.findByPk(req.body.id_p);
        const emplacement = await Emplacement.findByPk(req.body.id_em);

        if(!produit){
            return res.status(404).json({erreur:'Produit invalide'});
        }

        if(!emplacement){
            return res.status(404).json({erreur:'Emplacement invalide'});
        }
        
        const nouveStock = await stockRepository.create( qtt_st, id_p, id_em);

        res.status(201).json({message:'Creation Stock avec succés', stock:nouveStock, produit, emplacement});
        
    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({erreur:'Creation invalide'});
    }
}


//List Stock

exports.listeStock = async (req, res) =>{
    try {
        const stock = await stockRepository.findAll(); // mitovy oe jointure
        
        res.status(200).json(stock);

    } catch (erreur) {
        res.status(400).json({erreur});
    }
}

//List par Id Stock

exports.getIdStock = async (req, res) =>{
    try {
        const id  = req.params.id_st
        const stock = await stockRepository.getIdStock(id) 
        
        res.status(200).json(stock);

    } catch (erreur) {
        res.status(400).json({error});    
    }
}

// Supprimer le stock

exports.supprimerStock = async(req, res) =>{

    try {
        const id = req.params.id_st;
        const stock = await stockRepository.delete(id);
        res.status(200).json({message:"Supprimer stock est avec succés", stocks : stock});
        
    } catch (erreur) {
        console.log("errrrr", e);
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification Stock

exports.modificationStock = async (req, res)=>{
    const id = req.params.id_st;
    const { qtt_st, id_p,id_em } = req.body;

    try {
        const [modification] = await stockService.updateStock(
            { qtt_st, id_p, id_em }, 
            { where:{ id_st:id}
        });

        if(!modification){
            return res.status(404).json({error :'Stock invalide'});
        }

        const modifStock = await Stock.findOne({ where: {id_st:id}});
        res.status(200).json({message:"Modification Stock est avec succés", stock:modifStock});
                
    } catch (erreur) {
        res.status(500).json({error :'Erreur Stock de produit'});
    }
}

