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

    async count(){
        return await depotRepository.count();
    }

    async findAll(page) {
        const nbrEl = 5;
        const offset = (page - 1) * nbrEl;
        
        const depots = await Depot.findAll({
            limit: nbrEl,
            offset: offset,
            
            include: [{
                model: Emplacement,
                as: 'emplacements',
                attributes: ['nom_em', 'volume_actuel', 'longeur', 'largeur', 'hauteur','volume_max','pourcentage'], // Correction de 'longeur' en 'longeur'
                required: false
            }],
        });
        
        return depots;               
    }
        
    async putDepot(id,data){
        return depotRepository.update(id, data);
    }
    async getDepotByID(id){
        return depotRepository.findById(id);
    }
}
module.exports = new depotSercie();