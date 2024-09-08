const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const Utilisateur =  require('../models/utilisateur');
const JWTStrategy = require('./strategies/JWTStrategy');
const utilisateurRepository = require('./utilisateur.service');

class AuthService{

    constructor(strategy){
        this.strategy = strategy;
    }

    async register(role,email_ut, mdp_ut){

        const hashedMdp_ut = await bcrypt.hash(mdp_ut,8);

        const utilisateur =  await Utilisateur.create({ role,email_ut, mdp_ut: hashedMdp_ut });

        return utilisateur;
    }

    async login(email_ut, mdp_ut){

        const utilisateur = await Utilisateur.findOne({where:{email_ut}});

        if (!utilisateur || !await bcrypt.compare(mdp_ut, utilisateur.mdp_ut )) {
            throw new Error('Invalid credentials');

        }

        const token = jwt.sign({id: utilisateur.id_ut}, "dfgqsdf.dfq01DFdHGHjgf01mNt");
        // const token = jwt.sign({id: utilisateur.id_ut}, process.env.JWT_SECRET, {expiresIn: '1h'});
                        
        return {utilisateur, token};
    }

    async authenticate(token){
        return this.strategy.authenticate(token,{secretOrkey:"dfgqsdf.dfq01DFdHGHjgf01mNt"});
    }

    async findUtilById(id){
        return await utilisateurRepository.findUtilById(id);
    }
}

module.exports = new AuthService(JWTStrategy);