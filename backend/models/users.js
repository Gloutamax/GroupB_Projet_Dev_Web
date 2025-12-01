const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");
// TODO : Importation de bcrypt pour hasher le mot de passe

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
    },
    // TODO : Ajouter les rôles (admin, user, etc.)
  },
  {
    sequelize: connection,
    tableName: "users",
    underscored: true,
  }
);

// TODO : Ajouter des hooks avant la création et mise à jour pour hasher le mot de passe

module.exports = User;