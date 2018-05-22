const passport = require("passport");

const hotelController = require("../controllers/HotelController");
const authController = require("../controllers/AuthController");
const reservationController = require("../controllers/ReservationsController");
const passportService = require("./passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const router = require("express").Router();

const protected = (req, res, next) => {
  res.send("Here's the token");
};

router.route("/protected").get(requireAuth, protected);
router.route("/register").post(authController.Register);
router.route("/login").post(requireLogin, authController.Login);

router.route("/hotels").get(hotelController.getHotels);
router.route("/book").post(requireAuth, reservationController.Book);
router
  .route("/reservations")
  .get(requireAuth, reservationController.getReservations);
router
  .route("/reservations/:userId")
  .get(requireAuth, reservationController.getReservationsForUser);

module.exports = router;
