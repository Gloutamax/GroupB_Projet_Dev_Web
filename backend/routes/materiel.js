const { Router } = require("express");
const MaterialController = require("../controllers/materiel");
const router = Router();
const checkAuth = require("../middlewares/check-auth");
const checkRole = require("../middlewares/check-role");

// Routes publiques (lecture)
router.get("/materiels", MaterialController.cget);
router.get("/materiels/:id", MaterialController.get);

// Routes protégées admin (création, modification, suppression)
router.post(
  "/materiels",
  checkAuth,
  checkRole(["admin"]),
  MaterialController.create
);
router.patch(
  "/materiels/:id",
  checkAuth,
  checkRole(["admin"]),
  MaterialController.patch
);
router.delete(
  "/materiels/:id",
  checkAuth,
  checkRole(["admin"]),
  MaterialController.delete
);

module.exports = router;
