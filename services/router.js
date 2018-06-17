const passport = require("passport");
require("./passport");

const hotelController = require("../controllers/HotelController");
const authController = require("../controllers/AuthController");
const reservationController = require("../controllers/ReservationsController");
const clientController = require("../controllers/ClientController");
const statisticsController = require("../controllers/StatisticsController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const requireSocial = passport.authenticate("social", { session: false });
const router = require("express").Router();

router.route("/register").post(authController.Register);
router.route("/login").post(requireLogin, authController.Login);
router.route("/socialLogin").post(requireSocial, authController.Login);

router.route("/hotels").get(requireAuth, hotelController.getHotels);

router
  .route("/reservations/reception/:hotel")
  .get(requireAuth, reservationController.getReservationsForReception);
router
  .route("/reservations/user/:userId")
  .get(requireAuth, reservationController.getReservationsForUser);
router.route("/reservations/add").post(requireAuth, reservationController.book);
router
  .route("/reservations/:id")
  .put(requireAuth, reservationController.updateStatus);
router
  .route("/reservations/cancel/:id")
  .delete(requireAuth, reservationController.cancelReservation);

router.route("/clients").post(requireAuth, clientController.getData);
router.route("/clients/add").post(requireAuth, clientController.add);

router
  .route("/statistics/:hotel")
  .get(requireAuth, statisticsController.getStatistics);

module.exports = router;
