const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");
const User = require("./users");
//! Besoin de dépendances vers Material

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    materielId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    tableName: "reservations",
    underscored: true,
  }
);

// Associations
Reservation.belongsTo(User, { foreignKey: "userId" });
//Reservation.belongsTo(Materiel, { foreignKey: "materielId" });

module.exports = Reservation;
