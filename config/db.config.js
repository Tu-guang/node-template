const Sequelize = require('sequelize');
const sequelize = new Sequelize('node', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('../model/user.model.js')(sequelize, Sequelize);

module.exports = db;
