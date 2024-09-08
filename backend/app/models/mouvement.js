const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const Mouvement = sequelize.define("mouvement", {
    id_mvt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    type_mvt: {
        type: DataTypes.STRING(50),
    },
    date_mvt: {
        type: DataTypes.DATE(),
    },
    qtt_mvt: {
        type: DataTypes.INTEGER,
    },
    id_p:{
        type: DataTypes.INTEGER,
        references: {
            model: 'produit', // nom de la table référencée
            key: 'id_p', // clé primaire référencée
        },
        allowNull: false,
    },

    id_dep:{
        type: DataTypes.INTEGER,
        references:{
            model: 'depot',
            key:'id_dep'
        }
    },
    id_ut:{
        type: DataTypes.INTEGER,
        references:{
            model: 'utilisateur',
            key:'id_ut'
        }
    }
},{
    tableName:'mouvement'
});

module.exports = Mouvement