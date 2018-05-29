const passport = require("passport");
require("./passport");

const hotelController = require("../controllers/HotelController");
const authController = require("../controllers/AuthController");
const reservationController = require("../controllers/ReservationsController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const requireSocial = passport.authenticate("social", { session: false });
const router = require("express").Router();

const protected = (req, res, next) => {
  res.send("Here's the token");
};

router.route("/protected").get(requireAuth, protected);
router.route("/register").post(authController.Register);
router.route("/login").post(requireLogin, authController.Login);
router.route("/socialLogin").post(requireSocial, authController.Login);

router.route("/hotels").get(hotelController.getHotels);
router.route("/book").post(requireAuth, reservationController.book);
router
  .route("/reservations/:hotel")
  .get(requireAuth, reservationController.getReservationsForReception);
router
  .route("/reservations/user/:userId")
  .get(requireAuth, reservationController.getReservationsForUser);
router
  .route("/reservations/:id")
  .put(requireAuth, reservationController.updateStatus);
router
  .route("/reservations/cancel/:id")
  .delete(requireAuth, reservationController.cancelReservation);

module.exports = router;
