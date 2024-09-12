const { Op } = require("sequelize");
const Depot = require("../models/depot");
const depotRepository = require("../repository/depot.repository");
const Emplacement = require("../models/emplacement");

class depotSercie{

    async findById(id){
        return await depotRepository.findById(id);
    }
    async create(data){
        return depotRepository.create(data);
    }
    async delete(id){
        return depotRepository.delete(id);
    }

    async findAll(page, nbrEl) {
        const offset = (page - 1) * nbrEl;
        
        const depots = await Depot.findAll({
            limit: nbrEl,
            offset: offset,
            include: [{
                model: Emplacement,
                as: 'emplacements',
                attributes: ['nom_em', 'volume_actuel', 'longeur', 'largeur', 'hauteur'], // Correction de 'longeur' en 'longeur'
                required: false
            }],
        });
    
        return depots.map(depot => {
            // Si le dépôt a des emplacements, on calcule le volume maximum de chaque emplacement
            if (depot.emplacements.length > 0) {
                return depot.emplacements.map(emplacement => {
                    const volume_max = emplacement.longeur * emplacement.largeur * emplacement.hauteur;
    
                    return {
                        id_dep: depot.id_dep,
                        nom_dep: depot.nom_dep,
                        emplacement: emplacement.nom_em,
                        volume_actuel: emplacement.volume_actuel + " m³",
                        volume_max: volume_max + " m³" // Calcul du volume maximum
                    };
                });
            } else {
                // Si aucun emplacement n'est associé au dépôt
                return {
                    id_dep: depot.id_dep,
                    nom_dep: depot.nom_dep,
                    emplacement: 'aucun',
                    volume_actuel: 'aucun',
                    volume_max: 'aucun'
                };
            }
        }).flat(); // Utilisation de .flat() pour éviter une liste de listes si plusieurs emplacements
    }
    
    


    
        
    async putDepot(id,data){
        return depotRepository.update(id, data);
    }
    async getDepotByID(id){
        return depotRepository.findById(id);
    }
}
module.exports = new depotSercie();