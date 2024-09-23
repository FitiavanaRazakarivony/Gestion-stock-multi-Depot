 const {Sequelize} = require('sequelize');

 const sequelize = new Sequelize('stage','root','',{
    host:'localhost',
    dialect: "mysql", 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idl: 10000,
    },
    logging : false
});

module.exports =  sequelize;