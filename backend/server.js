const express = require('express');
// const router = express.Router();
const sequelize = require('./app/config/bd_config');
const { Sequelize } = require('sequelize');


const produitRoutes = require('./app/routes/produit.routes');
const depotRoutes = require('./app/routes/depot.routes');
const mouvementRoutes = require('./app/routes/mouvement.routes');
const UtilisateurRoutes = require('./app/routes/utilisateur.routes');
const StockRoutes = require('./app/routes/stock.routes');
const authRoutes = require('./app/routes/auth.routes');
const emplacementRoutes = require('./app/routes/emplacement.routes');


const app = express();
app.use(express.json());

// access origin
const cors = require("cors");
var corsOptions = {
    origin: [
        "http://localhost:4200",
        "http://172.16.25.42:4200" // ip Mr Tovo
    ] // Url Angular
};

app.use(cors(corsOptions));

// Routes
app.use('/api',produitRoutes);
app.use('/api',depotRoutes);
app.use('/api',mouvementRoutes);
app.use('/api',UtilisateurRoutes);
app.use('/api',StockRoutes);
app.use('/api', authRoutes);
app.use('/api', emplacementRoutes);

app.use('/fichier',express.static(__dirname + '/app/uploads/'));

const defineAssociations = require('./app/models/associations');

// Importer les modèles avec sequelize et DataTypes
const Produit = require('./app/models/produits');
const Depot = require('./app/models/depot');
const Mouvement = require('./app/models/mouvement');
const Utilisateur = require('./app/models/utilisateur');
const Stock = require('./app/models/stock');
const Emplacement = require('./app/models/emplacement');

// Exécuter les associations
defineAssociations();

//start servers
const startServer = async () => {  

    try {
        await  sequelize.sync().then(()=>{
            console.log("Database & tables creer");
        })
    } catch (error) {
        console.log("Erreur de creer ",error);
    }

    try {
        await sequelize.sync(); // creer tout les tables
        app.listen(8080, () =>{
            console.log("Serveur en marche en localhost:8080");
        });
    } catch (error) {
        console.log('Erreur de se connecter',error);
    }
}
startServer();