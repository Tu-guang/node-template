const moment = require("moment");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        mail: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.DATE,
            get(){
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        timestamps: false,
        tableName: 'users', // 手动指定表名
    });
};
