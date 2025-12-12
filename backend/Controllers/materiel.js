const initMaterialModel = require("../models/materiel");

module.exports = {
  // GET all
  cget: async (req, res, next) => {
    try {
      const Material = await initMaterialModel(); 
      const all = await Material.findAll();
      res.json(all);
    } catch (e) {
      next(e);
    }
  },

  // POST create
  create: async (req, res, next) => {
    try {
      const Material = await initMaterialModel();
      const newMat = await Material.create(req.body);
      res.status(201).json(newMat);
    } catch (e) {
      next(e);
    }
  },

  // GET one by id
  get: async (req, res, next) => {
    try {
      const Material = await initMaterialModel();
      const id = parseInt(req.params.id, 10);
      const mat = await Material.findByPk(id);
      if (!mat) return res.sendStatus(404);
      res.json(mat);
    } catch (e) {
      next(e);
    }
  },

  // PATCH update
  patch: async (req, res, next) => {
    try {
      const Material = await initMaterialModel();
      const id = parseInt(req.params.id, 10);
      const [nbUpdated] = await Material.update(req.body, { where: { id } });
      if (nbUpdated === 0) return res.sendStatus(404);
      const updated = await Material.findByPk(id);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  },

  // DELETE
  delete: async (req, res, next) => {
    try {
      const Material = await initMaterialModel();
      const id = parseInt(req.params.id, 10);
      const nbDeleted = await Material.destroy({ where: { id } });
      if (nbDeleted === 0) return res.sendStatus(404);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
};
