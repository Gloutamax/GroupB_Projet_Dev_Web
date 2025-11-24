const { DataTypes } = require('sequelize');
const DB = require('../lib/db');

const initUserModel = async () => {
    const connection = await DB.getConnection();
    
    const User = connection.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    await User.sync();
    return User;
};

module.exports = { initUserModel };