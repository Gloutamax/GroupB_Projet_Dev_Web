const { Router } = require("express");
const ReservationController = require("../controllers/reservations");
const checkAuth = require("../middlewares/check-auth");
const checkRole = require("../middlewares/check-role");

const router = Router();

// ⚠️ IMPORTANT : Les routes fixes AVANT les routes avec paramètres !
router.get(
  "/reservations/me",
  checkAuth,
  checkRole(["USER", "ADMIN"]),
  ReservationController.getUserReservation
);

// Routes admin uniquement
router.get(
  "/reservations",
  checkAuth,
  checkRole(["ADMIN"]),
  ReservationController.cget
);

// Routes utilisateur connecté
router.post(
  "/reservations",
  checkAuth,
  checkRole(["USER", "ADMIN"]),
  ReservationController.create
);
router.get(
  "/reservations/:id",
  checkAuth,
  checkRole(["USER", "ADMIN"]),
  ReservationController.get
);
router.patch(
  "/reservations/:id",
  checkAuth,
  checkRole(["ADMIN"]),
  ReservationController.patch
);
router.delete(
  "/reservations/:id",
  checkAuth,
  checkRole(["ADMIN"]),
  ReservationController.delete
);

module.exports = router;
