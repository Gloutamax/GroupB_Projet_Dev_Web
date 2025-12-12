const { Router } = require("express");
const ReservationController = require("../controllers/reservations");
const router = Router();

router.get("/reservations", ReservationController.cget);

router.post("/reservations", ReservationController.create);

router.get("/reservations/:id", ReservationController.get);
router.patch("/reservations/:id", ReservationController.patch);
router.delete("/reservations/:id", ReservationController.delete);

module.exports = router;
