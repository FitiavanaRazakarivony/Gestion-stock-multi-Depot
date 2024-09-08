

const Depot = require('../models/depot');
const Mouvement = require('../models/mouvement');
const Produit = require('../models/produits');
const Stock = require('../models/stock');
const Utilisateur = require('../models/utilisateur');

class produitRepository{
    async findById(id){
        return await Produit.findByPk(id);
    }
    async create(data){
        return await Produit.create(data);
    }

    async findAll(page){

        const nbrEl = 5
        const offset = (page - 1) * nbrEl
        return await Produit.findAll({limit: nbrEl, offset: offset}, {include:['produit','emplacement']});         
    }
    async findDetail(id){
        return await Produit.findByPk(
            id,
            {
                include: [
                    {
                        model: Stock,
                        as: 'stocks',
                        include:[
                            {
                                model:Depot,
                                as:'depot',
                                include:['emplacements']
                            }
                        ]
                    },
                    
                    {
                        model:Mouvement,
                        as:'mouvements',
                        include:[
                            {
                                model:Depot,
                                as:'depot',
                                include:['emplacements']
                            }
                        ]
                    },
                    {
                        model:Mouvement,
                        as:'mouvements',
                        include:['utilisateur']
                    }
                ]                  
            }
        );       
         
    }

    async update(id, data){
        
        const produit = await this.findById(id);
        if (produit) {
            return await Produit.update(data);
        }
        return null;
    }
    async delete(id){
        const produit = await this.findById(id);
        if (produit) {
            await Produit.destroy({where:{id_p:id}});
            console.log(produit);
            return produit;
        }
        return null;
    }
    async count(){
        return await Produit.count();
    }
}
module.exports= new produitRepository();