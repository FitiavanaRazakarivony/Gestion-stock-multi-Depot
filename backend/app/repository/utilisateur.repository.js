const { where } = require("sequelize");
const Utilisateur = require("../models/utilisateur");
const bcrypt = require("bcrypt"); 
class UtilisateurRepository {

    async findUtilById(id){
        return await Utilisateur.findByPk(id);
    }

    async creatUtil(data){
        return await Utilisateur.create(data);
    }

    async authentiEmail(email){
      
        return await Utilisateur.findOne( {where:{email_ut:email}} );
            
    }

    async signin(email_ut){
        
        try {
            const existingUser = await Utilisateur.findOne({where:{email_ut}});

            if (existingUser) {
                console.log("user already existe");
            } else {
                const userModel = new Utilisateur();
                userModel.email_ut = email_ut;
                userModel.mdp_ut = mdp_ut;
                const savedUser = await userModel.save()
                savedUser.token = jwt.sign(savedUser.toObject(), process.env.JWT_SECRET);
                const updatedUser = await savedUser.save();
                
                console.log("token:", updatedUser.token);
                
            }
        } catch (err) {
            console.log("Error occured:" , err);         
        }  
    }

    async me(token){
        return await Utilisateur.findOne({where:{token}}).exec();
    }
}

module.exports = new UtilisateurRepository();
