const { Router } = require("express");
const MaterialController = require("../controllers/materiel");
const router = Router();
const checkAuth = require("../middlewares/check-auth");
const checkRole = require("../middlewares/check-role");

router.get("/materiels", checkAuth, checkRole(["ADMIN","USER"]), MaterialController.cget);

router.post("/materiels", checkAuth, checkRole(["ADMIN"]), MaterialController.create);

router.get("/materiels/:id", checkAuth, checkRole(["ADMIN","USER"]), MaterialController.get);
router.patch("/materiels/:id", checkAuth, checkRole(["ADMIN"]), MaterialController.patch);
router.delete("/materiels/:id", checkAuth, checkRole(["ADMIN"]), MaterialController.delete);

module.exports = router;