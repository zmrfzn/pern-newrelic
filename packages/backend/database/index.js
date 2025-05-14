const dbConfig = require("./config.json")[`${process.env.NODE_ENV}`];

console.log(`ENV: ${process.env.NODE_ENV}`);
// const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.hostname,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  sync:true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./models/tutorial.model")(sequelize, Sequelize.DataTypes);



module.exports = db;