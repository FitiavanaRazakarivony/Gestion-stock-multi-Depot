const Utilisateur = require('../models/utilisateur');

// Creer une Utilisateur

exports.creerUtilisateur = async (req, res) =>{

    try {

        const utilisateur = await Utilisateur.create(req.body)
        res.status(201).json(utilisateur)

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

//List Utilisateur

exports.listeUtilisateur = async (req, res) =>{
    try {
        const utilisateur = await Utilisateur.findAll();
        res.status(200).json(utilisateur);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}
// Supprimer le utilisateur
exports.findUtilisateurById = async(req, res) =>{
    try {
        let id= req.params.id_ut;
        const utilisateurById = await AuthService.findUtilById(id)
        res.status(200).json(utilisateurById);
    } catch (erreur) {
        console.log("erreur ---", erreur);
        res.status(400).json({erreur:erreur.message});
        
    }

}

exports.supprimerUtilisateur = async(req, res) =>{
    try {
        const id = req.params.id_ut;
        const utilisateur = await Utilisateur.destroy({where:{id_ut:id}});
        res.status(200).json(utilisateur);
        
    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification  Produit

exports.modificationUtilisateur = async (req, res)=>{
    const id = req.params.id_ut;
    const {nom_ut} = req.body;

    try {
        const [modification] = await Utilisateur.update(
            { nom_ut }, 
            { where:{ id_ut:id}
        });

        if(!modification){
            return res.status(404).json({error :'Utilisateur invalide'});
        }

        const modifUtilisateur = await Utilisateur.findOne({ where: {id_ut:id}});
        res.status(200).json({message:"Modification Utilisateur est avec succés", utilisateur:modifUtilisateur});
                
    } catch (erreur) {
        res.status(500).json({error : 'Erreur Utilisateur de produit'});
    }
    
}
