const { where } = require("sequelize")
const Stock = require("../models/stock")
const stockService = require("../service/stock.service")
const Depot = require("../models/depot")
const Produit = require("../models/produits")
const Emplacement = require("../models/emplacement")

class stockRepository{
    async findById(id){
        return await Stock.findByPk(id)
    }
    async create(data){
        return await Stock.create(data)
    }
    async findAll(){
        return await Stock.findAll({
            include:['produit',
                {
                    model:Depot,
                    as:'depot',
                    include:[
                        {
                            model:Emplacement,
                            as:'emplacements'
                        }
                    ]
                }

            ]})
    }
    async update(id, data){
        const stock = await this.findById(id)
        if (stock) {
            return await Stock.update(data,{where:{id_st:id}});
        }
        return null
    }
    async delete (id){
        const stock = await this.findById(id)
        if (stock) {
            await Stock.destroy({where:{id_st:id}})
            return stock;
        }
    }

    async findStockByProdDep( id_dep, id_p ){
        return await Stock.findOne({where:{id_p, id_dep}})
    }
       
    async getIdStock(id){
        return Stock.findByPk(id, {include: ["produit", "depot"]})
    }
    
    async findAllDep_Pro(id_p, id_dep){
        return stockService.findAllDep_Pro(id_p, id_dep)
    }
    
}

module.exports = new stockRepository();