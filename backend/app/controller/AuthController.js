const Utilisateur = require("../models/utilisateur");
const AuthService = require("../service/AuthService");
const jwt  = require('jsonwebtoken')
class AuthController{

    async register(req, res){
        
        try {

            const utilisateur =  await AuthService.register(req.body.role,req.body.email_ut, req.body.mdp_ut);
            
            res.status(201).json(utilisateur);            
        } catch (error) {
            res.status(400).json({error:error.message});
        }

    }
    
    async login(req, res){

        try {
            const {user, token} = await AuthService.login(req.body.email_ut, req.body.mdp_ut);
            res.status(200).json({user, token});   
        } catch (error) {
            res.status(400).json({error: error.message
            })
        }
    }

    async authenticate(req, res,next){
        
        try {

            const token = req.headers.authorization.split(" ")[1];
            console.log("tokenb", token);
            // const user = await AuthService.authenticate(token);
            

            await jwt.verify(token, "dfgqsdf.dfq01DFdHGHjgf01mNt", async (err, decoded) => { 
            

            console.log("error---", err );
            console.log("decoded---", decoded );

                if (!err) {

                    const id = req.user = decoded.id;

                    const utilisateurByID = await AuthService.findUtilById(id);                     
                    next();    
                    console.log("utilisateur ----- ", utilisateurByID);

                    
                }else{;

                    res.status(401).json({error: 'erreur!'});

                }
                
            });   

        } catch (error) {
            console.log("erreur----", error );
            res.status(401).json({error: 'Unauthorized'});
        }
    }
    
}
module.exports = new AuthController();