const { DataTypes, Model } = require("sequelize");
const DB = require("../lib/db");

class Material extends Model {}

async function initMaterialModel() {
  const sequelize = await DB.getConnection(); 

  Material.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      status: {
        type: DataTypes.ENUM("available", "reserved", "maintenance", "unavailable"),
        defaultValue: "available",
      },
    },
    {
      sequelize,
      tableName: "materials",
      underscored: true,
    }
  );

  return Material;
}

module.exports = initMaterialModel;
