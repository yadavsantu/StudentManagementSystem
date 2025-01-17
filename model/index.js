const dbConfig = require('./../config/db.config')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

//custom
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Model Call
db.Student = require('./student')(sequelize, Sequelize)
db.User = require('./user')(sequelize, Sequelize)

module.exports = db