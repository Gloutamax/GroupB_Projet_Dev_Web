const Material = require("../models/materiel");

module.exports = {
  cget: async (req, res) => {
    res.json(await Material.findAll());
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await Material.create(req.body));
    } catch (e) {
      // Gérer les erreurs de validation Sequelize
      if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError') {
        return res.status(422).json({
          error: 'Validation error',
          details: e.errors ? e.errors.map(err => ({
            field: err.path,
            message: err.message
          })) : e.message
        });
      }
      next(e);
    }
  },
  get: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const material = await Material.findByPk(id);
    if (!material) {
      res.sendStatus(404);
    } else {
      res.json(material)
    }
  },
  patch: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [nbUpdated, [MaterialUpdated]] = await Material.update (req.body, {
        where: { id },
        returning: true,
      });
      if (nbUpdated === 0) {
        return res.sendStatus(404);
      }

      return res.json(MaterialUpdated);
    } catch(e) {
      // Gérer les erreurs de validation Sequelize
      if (e.name === 'SequelizeValidationError' || e.name === 'SequelizeUniqueConstraintError') {
        return res.status(422).json({
          error: 'Validation error',
          details: e.errors ? e.errors.map(err => ({
            field: err.path,
            message: err.message
          })) : e.message
        });
      }
      next(e);
    }
  },
  delete: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const nbDeleted = await Material.destroy({ where: { id } });
    if (nbDeleted === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);  
  },
};
