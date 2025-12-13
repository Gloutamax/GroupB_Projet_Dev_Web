const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");
const User = require("./users");
const Materiel = require("./materiel");

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

//hooks
Reservation.addHook("beforeCreate", async (reservation, options) => {
  const materiel = await Materiel.findByPk(reservation.materielId);
  if (!materiel) {
    throw new Error("Matériel introuvable");
  }
  if (materiel.status !== "available") {
    throw new Error("Le matériel n'est pas disponible");
  }
});

Reservation.addHook("beforeCreate", async (reservation, options) => {
  const user = await User.findByPk(reservation.userId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }
});

Reservation.addHook("beforeUpdate", async (reservation, options) => {
  if (reservation.changed("materielId")) {
    const materiel = await Materiel.findByPk(reservation.materielId);
    if (!materiel) {
      throw new Error("Matériel introuvable");
    }
    if (materiel.status !== "available") {
      throw new Error("Le matériel n'est pas disponible");
    }
  }
});

Reservation.addHook("afterCreate", async (reservation, options) => {
  await Materiel.update(
    { status: "reserved" },
    { where: { id: reservation.materielId } }
  );
});

// Après la suppression d'une réservation, remettre le matériel en "available"
Reservation.addHook("afterDestroy", async (reservation, options) => {
  await Materiel.update(
    { status: "available" },
    { where: { id: reservation.materielId } }
  );
});

module.exports = Reservation;
