const Stock = require("../models/stock");
const stockRepository = require("../repository/stock.repository");

class stockService{
    
    async create(qtt_st, id_p, id_dep ){
        let data = {qtt_st, id_p, id_dep }

        if(data.qtt_st < 0)
            data.qtt_st = 0
        
        return stockRepository.create(data);
    }
    async delete(id){
        return stockRepository.delete(id);
    }
    async findAll(){
        return stockRepository.findAll({include:['produit','depot']});
    }
    async updateStock(id, data){
        return stockRepository.update(id,data);
    }
    async getIdStock (id){
        return await stockRepository.getIdStock(id, {include: ["produit", "depot"]});
    }

    async findAllDep_Pro(id_p, id_dep){
        return await Stock.findAll({
            where:
                {
                    id_p : id_p,
                    id_dep : id_dep
                }
            });
    }    
    
}
module.exports = new stockService();
