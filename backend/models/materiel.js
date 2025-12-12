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
    validate: {
      // Validation personnalisée pour rejeter les champs non attendus
      noExtraFields() {
        const allowedFields = ['name', 'status', 'description'];
        const providedFields = Object.keys(this.dataValues).filter(
          key => !['id', 'createdAt', 'updatedAt', 'created_at', 'updated_at'].includes(key)
        );
        const extraFields = providedFields.filter(field => !allowedFields.includes(field));
        if (extraFields.length > 0) {
          throw new Error(`Champs non autorisés: ${extraFields.join(', ')}`);
        }
      }
    }
  }
);

module.exports = Material;