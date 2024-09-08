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
    async findAll(){
        return Emplacement.findAll({
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
    async updateEmplacement (id,data){
        return Emplacement.update(id, data);
    }
}
module.exports = new EmplacementService();