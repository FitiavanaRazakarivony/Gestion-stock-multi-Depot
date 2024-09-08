const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const Stock = sequelize.define('stock', {
    id_st: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    qtt_st: {
        type: DataTypes.INTEGER,
    },
    id_p:{
        type: DataTypes.INTEGER,
        references:{
            model: 'produit',
            key:'id_p'
        }
    },
    id_dep:{
        type: DataTypes.INTEGER,
        references:{
            model: 'depot',
            key:'id_dep'
        }
    }
},
 {
  tableName: 'stock'
})

module.exports = Stock