const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const Emplacement = sequelize.define("emplacement", {
    id_em: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_em: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    qtt_max: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    qtt_actuel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_dep:{
        type: DataTypes.INTEGER,
        references:{
            model: 'depot',
            key:'id_dep'
        }
    },
    // id_p:{
    //     type: DataTypes.INTEGER,
    //     references:{
    //         model: 'produit',
    //         key:'id_p'
    //     }
    // },
    qtt_libre:{
        type: DataTypes.VIRTUAL, 
        get(){
            const qtt_max = this.getDataValue('qtt_max');
            const qtt_actuel = this.getDataValue('qtt_actuel');
            return qtt_max && qtt_actuel ? qtt_max - qtt_actuel : 0;
        }
    },

    pourcentage:{
        type: DataTypes.VIRTUAL, 
        get(){
            const qtt_max = this.getDataValue('qtt_max');
            const qtt_actuel = this.getDataValue('qtt_actuel');
            return qtt_max && qtt_actuel ? qtt_actuel*100/qtt_max : 0;
        }
    }
},
{
    tableName: 'emplacement'
});   

module.exports = Emplacement