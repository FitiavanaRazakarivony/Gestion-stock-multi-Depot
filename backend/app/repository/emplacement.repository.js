const emplacementService = require("../service/emplacement.service");

class EmplacementRepository{
    async findById(id){
        return await emplacementService.findById(id);
    }
    async create(data){
        return emplacementService.create(data);
    }
    async delete(id){
        return emplacementService.delete(id);
    }
    async findAll(page){
        return emplacementService.findAll(page);
    }
    async updateEmplacement (id,data){
        return emplacementService.updateEmplacement(id, data);
    }
    async findByEmplacement(id){
        return emplacementService.findByEmplacement(id);
    }
    async count(){
        return await emplacementService.count();
    }
}
module.exports = new EmplacementRepository();