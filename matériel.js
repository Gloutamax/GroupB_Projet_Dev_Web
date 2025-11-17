const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Material extends Model {}

async function initMaterialModel() {
  const sequelize = await DB.getConnection();

  Material.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("available", "reserved", "maintenance", "unavailable"),
        defaultValue: "available",
      },
    },
    {
      sequelize,           // la connexion Sequelize
      tableName: "materials", // nom de la table
      underscored: true,   // created_at / updated_at au lieu de camelCase
    }
  );

  return Material;
}

module.exports = Material;

