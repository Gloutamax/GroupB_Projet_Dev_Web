const Reservation = require("../models/reservations");
const Materiel = require("../models/materiel");
const User = require("../models/users");

module.exports = {
  // Récupérer toutes les réservations
  cget: async (req, res, next) => {
    try {
      const reservations = await Reservation.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "username"], // nom et id de l'utilisateur
          },
          {
            model: Materiel,
            attributes: ["id", "name", "description"], // infos du matériel
          },
        ],
        order: [["startDate", "DESC"]],
      });

      res.json(reservations);
    } catch (e) {
      next(e);
    }
  },

  // Récupérer les réservations de l'utilisateur connecté
  getUserReservation: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const reservations = await Reservation.findAll({
        where: { userId },
        include: [
          {
            model: Materiel,
            attributes: ["id", "name", "status", "description"],
          },
        ],
        order: [["startDate", "DESC"]],
      });

      res.json(reservations);
    } catch (e) {
      next(e);
    }
  },

  // Créer une réservation
  create: async (req, res, next) => {
    try {
      const reservation = await Reservation.create({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(reservation);
    } catch (e) {
      next(e);
    }
  },

  // Récupérer une réservation par ID
  get: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return res.sendStatus(404);
      }
      res.json(reservation);
    } catch (e) {
      next(e);
    }
  },

  // Mettre à jour une réservation
  patch: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);

      const [nbUpdated, [reservationUpdated]] = await Reservation.update(
        req.body,
        {
          where: { id },
          returning: true,
        }
      );

      if (nbUpdated === 0) {
        return res.sendStatus(404);
      }

      return res.json(reservationUpdated);
    } catch (e) {
      next(e);
    }
  },

  // Supprimer une réservation
  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const nbDeleted = await Reservation.destroy({
        where: { id, userId: req.user.id },
      });
      if (nbDeleted === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
};
