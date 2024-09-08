
const Mouvement = require('../models/mouvement')

class mouvementRepository{
    
    async create(data){
        return await Mouvement.create(data);
    }

    async findByQttMvt(id,qtt_mvt){
        return await Mouvement.findOne(qtt_mvt,{where:{id}});
    }

    async getIdMouv(id){
        return Mouvement.findByPk(id,{include: ["produit","depot","utilisateur"]})
    }
    async geIdByMouv(){
        
    }

    async contProduiMouvement(id_p){
        return await Mouvement.count({where:{id_p}});
    }

}


module.exports = new mouvementRepository();