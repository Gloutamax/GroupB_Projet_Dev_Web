const Reservation = require("../models/reservation");

module.exports = {
  cget: async (req, res) => {
    res.json(await Reservation.findAll());
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await Reservation.create(req.body));
    } catch (e) {
      next(e);
    }
  },
  get: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      res.sendStatus(404);
    } else {
      res.json(reservation);
    }
  },
  patch: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [nbUpdated, [reservation]] = await Reservation.update(req.body, {
        where: { id },
        returning: true,
      });
      if (nbUpdated === 0) {
        return res.sendStatus(404);
      }

      return res.json(reservation);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const nbDeleted = await Reservation.destroy({ where: { id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  },
};
