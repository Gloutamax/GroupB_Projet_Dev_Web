const { DataTypes, Model } = require('sequelieze');
const { connection } = require('../lib/database'); // ATTENTION A VOIR LE FICHER DE CONFIG FAIT PAR LES AUTRES MEMBRE DE L'EQUIPE
const bcrypt = require('bcrypt'); // Pour pouvoir hasher les mots de passe 

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate : {
                notEmpty: true,
                len: [3, 25],
            }
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true, 
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                len: [4, 100],
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false, 
            defaultValue: 'user',
            validate: {
                isIn : [['user', 'admin']], // A voir si il faut plus de role --> voir consigne
            },
        },
    },
    {
        sequelize: connection, 
        tableName: 'users', 
        undersored: true, 
    }
);

User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt()
    );
});

User.addHook("beforeUpdate", async (user) => {
    if (options.fields.includes("password")) {
        user.password = await bcrypt.hash(
            user.password,
            await bcrypt.genSalt()
        );
    }
});

module.exports = User;