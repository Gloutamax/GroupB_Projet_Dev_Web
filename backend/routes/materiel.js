const { Router } = require("express");
const MaterialController = require("../controllers/materiel");
const router = Router();

router.get("/materiels", MaterialController.cget);

router.post("/materiels", MaterialController.create);

router.get("/materiels/:id", MaterialController.get);
router.patch("/materiels/:id", MaterialController.patch);
router.delete("/materiels/:id", MaterialController.delete);

module.exports = router;