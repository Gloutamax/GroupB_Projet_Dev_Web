const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "reserved", "maintenance", "unavailable"),
      defaultValue: "available",
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize: connection, 
    tableName: "materials",
    underscored: true,
  }
);

// ? Hooks à ajouter ? 

module.exports = Material;