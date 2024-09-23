const jwt = require("jsonwebtoken")
const AuthStrategy = require("./AuthStrategy");
const Utilisateur = require("../../models/utilisateur");

class JwTStrategy extends AuthStrategy{

    async authenticate(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Utilisateur.findByPk(decoded.id_ut);

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = new JwTStrategy();