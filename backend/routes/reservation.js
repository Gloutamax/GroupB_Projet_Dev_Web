const { Router } = require("express");
const ReservationController = require("../controllers/reservation");
const router = Router();

router.get("/reservation", ReservationController.cget);

router.post("/reservation", ReservationController.create);

router.get("/reservation/:id", ReservationController.get);
router.patch("/reservation/:id", ReservationController.patch);
router.delete("/reservation/:id", ReservationController.delete);

module.exports = router;
