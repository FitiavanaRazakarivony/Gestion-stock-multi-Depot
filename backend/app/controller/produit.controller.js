const { where } = require('sequelize');
const Produit = require('../models/produits');
const multer = require('multer');
const produitService = require('../service/produit.service');
const produitRepository = require('../repository/produit.repository');
const Stock = require('../models/stock');
const Mouvement = require('../models/mouvement');
const Depot = require('../models/depot');

const storage= multer.memoryStorage();
const upload = multer({storage: storage});
// Creer une produit

exports.creerProduit = async (req, res) =>{
    let{
        designation_p,
        categorie_p,
        prix_p ,
        photo_p,
        file,
        longeur,
        hauteur,
        largeur
    } = req.body;
    

    try {

        photo_p = await produitService.uploadFile(file,photo_p)
        const produit = await produitService.createProduit({
            designation_p,
            categorie_p,
            photo_p,
            prix_p,
            longeur,
            hauteur,
            largeur,
        })

        res.status(201).json(produit)
        
    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
};

//List produit

exports.listeProduit = async(req, res) =>{

    const page = req.query.page;

    try {
        const produit = await produitService.getProduits(page);
        res.status(200).json(produit);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
};


//Detail produit par id_p 

exports.detailProduit = async(req, res) =>{

    const id = req.params.id_p

    try {
        const produit = await produitService.getdetailProduits(id);
        
        res.status(200).json(produit);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
};
// Supprimer le produit

exports.supprimerProduit = async(req, res) =>{

    try {
        const id = req.params.id_p;
        const produit = await produitService.deleteProduits(id);
        if (produit) {
            res.status(200).json({message: 'produit supprimer'})
        } else {
            res.status(404).json({message: 'produit invalide'})
        }

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
};

// Modification  Produit

exports.modificationProduit = async (req, res)=>{
    const id = req.params.id_p;
    const{
        designation_p,
        categorie_p,
        prix_p ,
        photo_p,
        longeur,
        hauteur,
        largeur
    } = req.body;
    // const {designation_p, categorie_p,photo_p, poid_p, prix_p} = req.body;

    try {
        const [modification] = await Produit.update(
            { designation_p, categorie_p, photo_p, prix_p,longeur,hauteur,largeur }, { where:{ id_p:id} }
        );

        if(!modification){
            return res.status(404).json({error : 'Produit invalide'});
        }

        const modifProduit = await Produit.findOne({ where: {id_p:id}});
        res.status(200).json({message:"Modification produit est avec succés", produit:modifProduit});
                

    } catch (erreur) {
        res.status(500).json({error : 'Erreur modification de produit'});
    }
};

exports.countProduit = async (req, res) =>{
    const produit = await produitService.count();
    res.status(200).json({total_p: produit});
};

exports.search = async (req, res) =>{
    const { name } = req.query;
    try {
      const users = await userService.searchUsersByName(name);
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
};


exports.afficherProduit = async (req, res) => {
    const id = req.params.id_p;

    try {
        // Récupération du produit avec son ID
        const produit = await Produit.findOne({ where: { id_p: id } });

        if (!produit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        // Le champ volume sera calculé automatiquement lorsque vous accédez à produit.volume
        res.status(200).json({ 
            message: "Produit récupéré avec succès", 
            produit: produit, 
            volume: produit.volume  // Affichez explicitement le volume
        });
    } catch (erreur) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
    }
};
  
