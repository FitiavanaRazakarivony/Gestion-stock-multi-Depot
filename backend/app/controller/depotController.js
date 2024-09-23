const Depot= require('../models/depot');
const depotRepository = require('../repository/depot.repository');
const depotService = require('../service/depot.service');

// Creer une Depot

exports.creerDepot = async (req, res) =>{
    try {
        const depot = await depotRepository.create(req.body)
        res.status(201).json(depot)
    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}
exports.findSupperieurAncienLimite = async(req, res)=>{

    idSupperieurA_ = req.params.id_dep;

   try {
    const valeurSupperieurAncienLimite = await depotService.findSupperieurAncienLimite(idSupperieurA_)
    res.status(201).json({limite_dep: valeurSupperieurAncienLimite})
 
   } catch (erreur) {
    res.status(400).json({erreur:erreur.message});
    
   }

}
//List Depot

exports.listeDepot = async(req, res) =>{
    try {
        const page = req.query.page;

        const depot = await depotRepository.findAll(page);
        res.status(200).json(depot);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Supprimer le depot

exports.supprimerDepot = async(req, res) =>{
    try {
        const id = req.params.id_dep;
        const depot = await depotRepository.delete(id);
        res.status(200).json(depot);
        
    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification  Depot
exports.modificationDepot = async (req, res)=>{
    const id = req.params.id_dep;
    const {nom_dep,limite_dep} = req.body;

    try {
        const [modification] = await Depot.update(
            { nom_dep, limite_dep }, 
            { where:{ id_dep:id}
        });

        if(!modification){
            return res.status(404).json({error : 'Depot invalide'});
        }

        const modifDepot = await Depot.findOne({ where: {id_dep:id}});
        res.status(200).json({message:"Modification depot est avec succés", depot:modifDepot});
                

    } catch (erreur) {
        res.status(500).json({error : 'Erreur modification de depot'});
    }
}

// prend stock par id
exports.getIdStock = async (req,res) =>{

    try {
     
        let id = req.params.id_dep;
        const depot = await depotRepository.findById(id);
        res.status(200).json(depot);

    } catch (error) {
        res.status(400).json({error:error.message})   
    }

}

// exports.recherche = async (req, res) =>{
//     try {
        
//         const query =  req.query.q;

//         console.log("query", query);
//         const depot =  await depotRepository.findByName(query)

//         res.status(200).json(depot);

//     } catch (error) {
//         res.status(400).json({error:error.message})   
//     }
// }