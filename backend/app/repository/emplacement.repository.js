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
    async findAll(){
        return emplacementService.findAll();
    }
    async updateEmplacement (id,data){
        return emplacementService.updateEmplacement(id, data);
    }
}
module.exports = new EmplacementRepository();