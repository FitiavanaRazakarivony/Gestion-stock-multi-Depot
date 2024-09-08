// associations.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd_config");

const Depot = require("./depot");
const Emplacement = require("./emplacement");
const Mouvement = require("./mouvement");
const Produit = require("./produits");
const Stock = require("./stock");
const Utilisateur = require("./utilisateur");

module.exports = () => {
  // Produit peut être dans plusieurs mouvements (alias : mouvements)
  Produit.hasMany(Mouvement, { foreignKey: 'id_p', as: 'mouvements' });
  Mouvement.belongsTo(Produit, { foreignKey: 'id_p', as: 'produit' });

  // Dépôt peut avoir plusieurs emplacements (alias : emplacements)
  Depot.hasMany(Emplacement, { foreignKey: 'id_dep', as: 'emplacements' });
  Emplacement.belongsTo(Depot, { foreignKey: 'id_dep', as: 'depot' });

  // Emplacement peut être utilisé dans plusieurs mouvements (alias : mouvements)
  Depot.hasMany(Mouvement, { foreignKey: 'id_dep', as: 'mouvements' });
  Mouvement.belongsTo(Depot, { foreignKey: 'id_dep', as: 'depot' });

  // Utilisateur peut effectuer plusieurs mouvements (alias : mouvements)
  Utilisateur.hasMany(Mouvement, { foreignKey: 'id_ut', as: 'mouvements' });
  Mouvement.belongsTo(Utilisateur, { foreignKey: 'id_ut', as: 'utilisateur' });

  // Produit peut être en stock dans plusieurs emplacements (alias : stocks)
  Produit.hasMany(Stock, { foreignKey: 'id_p', as: 'stocks' });
  Stock.belongsTo(Produit, { foreignKey: 'id_p', as: 'produit' });

  // Depot peut contenir plusieurs Stock (alias : stocks)
  Depot.hasMany(Stock, { foreignKey: 'id_dep', as: 'stocks' });
  Stock.belongsTo(Depot, { foreignKey: 'id_dep', as: 'depot' });

  // // Produit peut contenir plusieurs emplacement (alias : emplacements)
  // Produit.hasMany(Emplacement, {foreignKey:'id_p', as:'emplacements'})
  // Emplacement.belongsTo(Produit, {foreignKey:'id_p', as:'produit'})  

};
