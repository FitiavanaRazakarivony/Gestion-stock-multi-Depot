
const Depot = require('../models/depot')

class depotRepository{
    
    async findById(id){
        return await Depot.findByPk(id);
    }
    async delete(id){
        const depot = await this.findById(id);
        if (depot) {
            await Depot.destroy({where:{id_dep:id}});
            return depot;
            
        }
        return null;
    }
    async create(data){
        return await Depot.create(data);
    }
    async findAll(page){
        const nbrEl = 5
        const offset = (page - 1) * nbrEl
        return await Depot.findAll({limit: nbrEl, offset: offset});
    }
    async findAllByNom_dep(nom_dep){
        return await Depot.findOne({ where: { nom_dep : nom_dep } });
    }
    
    // async findByName(nom){
    //     return await Depot.findOne({where:{nom_dep:nom}})
    // }
    // async update(id, data){
    //     const depot = await this.findById(id);
    //     if (depot) {
    //         await Depot.update(data);
    //         return depot;
    //     }
    //     return null;
    // }

    async update(nom_dep, data){
        const depot = await this.findAllByNom_dep(nom_dep)
        if (depot) {
            return await Depot.update(data,{where:{nom_dep:nom_dep}});
        }
        return null
    }

    async updateNom_dep(id, data){
        const depot = await this.findById(id)
        if (depot) {
            return await Depot.update(data,{where:{nom_dep:id}});
        }
        return null
    }
}

module.exports = new depotRepository();