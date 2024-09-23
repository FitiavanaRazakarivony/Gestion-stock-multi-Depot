const Depot = require("../models/depot");
const Emplacement = require("../models/emplacement");
const Produit = require("../models/produits");
const Stock = require("../models/stock");

class EmplacementService{
    async findById(id){
        return await Emplacement.findByPk(id);
    }
    async create(data){
        return Emplacement.create(data);
    }
    async delete(id){
        return Emplacement.destroy(id);
    }
    async findAll(page){

        const nbrEl = 5;
        const offset = (page - 1) * nbrEl

        const emplacements = Emplacement.findAll({
            limit:nbrEl,
            offset : offset,

            include : [
                {
                    model:Depot,
                    as:'depot',
                    include:[
                        {
                            model:Stock,
                            as:'stocks',
                            include:[
                                {
                                    model:Produit,
                                    as:'produit'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        return emplacements;
    }
    async updateEmplacement (id,data){
        return Emplacement.update(id, data);
    }
    async count(){
        return await Emplacement.count();
    }

    async findByEmplacement(id){
        return Emplacement.findByPk(id,{
            include : [
                {
                    model:Depot,
                    as:'depot',
                    include:[
                        {
                            model:Stock,
                            as:'stocks',
                            include:[
                                {
                                    model:Produit,
                                    as:'produit'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }
}
module.exports = new EmplacementService();