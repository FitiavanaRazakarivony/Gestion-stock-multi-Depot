const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd_config');

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

    volume_actuel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
    qtt_actuel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    id_dep: {
        type: DataTypes.INTEGER,
        references: {
            model: 'depot',
            key: 'id_dep'
        }
    },

    longeur: {
        type: DataTypes.INTEGER,
    },
    largeur: {
        type: DataTypes.INTEGER,
    },
    hauteur: {
        type: DataTypes.INTEGER,
    },
    
    volume_max: {
        type: DataTypes.VIRTUAL, // Utilisation de DataTypes.VIRTUAL car ce champ est calculé
        get() {
            // Calcul du volume si longeur, largeur et hauteur sont définis
            const longeur = this.longeur;
            const largeur = this.largeur;
            const hauteur = this.hauteur;
            return longeur && largeur && hauteur ? longeur * largeur * hauteur : null;
        }
    },

    qtt_libre: {
        type: DataTypes.VIRTUAL, 
        get() {
            const volume_max = this.volume_max;
            const volume_actuel = this.volume_actuel;
            return volume_max && volume_actuel !== null ? volume_max - volume_actuel : 0;
        }
    },

    pourcentage: {
        type: DataTypes.VIRTUAL, 
        get() {
            const volume_max = this.volume_max;
            const volume_actuel = this.volume_actuel;
            return volume_max && volume_actuel !== null && volume_max !== 0 ? (volume_actuel * 100) / volume_max : 0;
        }
    }
},
{
    tableName: 'emplacement'
});

module.exports = Emplacement;
