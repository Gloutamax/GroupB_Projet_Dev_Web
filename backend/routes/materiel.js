const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materiel");

router.post("/", materialController.create);
router.get("/available", materialController.get);
router.patch("/:id/status", materialController.patch);
router.delete("/:id", materialController.delete);

module.exports = router;
