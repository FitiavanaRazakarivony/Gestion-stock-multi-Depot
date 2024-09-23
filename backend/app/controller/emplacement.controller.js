const Emplacement = require('../models/emplacement');
const emplacementRepository = require('../repository/emplacement.repository');
const emplacementService = require('../service/emplacement.service');

// Creer une emplacement

exports.creeremplacement = async (req, res) =>{
    try {
        const emplacement = await emplacementRepository.create(req.body)
        res.status(201).json(emplacement)
    } catch (erreur) {
        console.log('erreur', erreur);
        res.status(400).json({erreur:erreur.message});
    }
}

//List emplacement
exports.listeemplacement = async(req, res) =>{
    try {
        const page = req.query.page;

        const emplacement = await emplacementRepository.findAll(page);
        res.status(200).json(emplacement);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Supprimer le emplacement
exports.supprimeremplacement = async(req, res) =>{
    try {
        const id = req.params.id_em;
        console.log("id", id);
        const emplacement = await emplacementRepository.delete({ where: {id_em:id}});
        res.status(200).json(emplacement);
        
    } catch (erreur) {

        console.log("erreur", erreur);
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification  emplacement
exports.modificationemplacement = async (req, res)=>{
    const id = req.params.id_em;
    console.log("idddd", id);
    const { nom_em, volume_max, volume_actuel, id_dep, longeur, largeur, hauteur } = req.body;

    try {
        const [modification] = await emplacementRepository.updateEmplacement(
            { nom_em, volume_max, volume_actuel, id_dep, longeur, largeur, hauteur }, 
            { where:{ id_em : id}
        });

        if(!modification){
            return res.status(404).json({error : 'emplacement invalide'});
        }

        const modifemplacement = await Emplacement.findOne({ where: {id_em:id}});
        res.status(200).json({message:"Modification emplacement est avec succés", emplacement:modifemplacement});
                
    } catch (erreur) {
        console.log('erreur', erreur);
        res.status(500).json({error : 'Erreur modification de emplacement'});
    }
}

// prend stock par id
exports.getIdEmplacement = async (req,res) =>{
    try {
        let id = req.params.id_em;
        const emplacement = await emplacementRepository.findByEmplacement(id);
        res.status(200).json(emplacement);

    } catch (error) {
        res.status(400).json({error:error.message})   
    }
}

exports.countEmplacements = async (req, res) =>{
    const emplacement = await emplacementRepository.count();
    res.status(200).json({total_emplacement: emplacement});
};
