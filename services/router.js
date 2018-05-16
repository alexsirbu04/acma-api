const passport = require("passport");

const hotelController = require("../controllers/HotelController");
const authController = require("../controllers/AuthController");
const passportService = require("./passport");

var requireAuth = passport.authenticate("jwt", { session: false });
var requireLogin = passport.authenticate("local", { session: false });
var router = require("express").Router();

const hotels = hotelController.Hotels;
router.route("/hotels").get(hotels);

function protected(req, res, next) {
  res.send("Here's the token");
}

router.route("/protected").get(requireAuth, protected);

router.route("/register").post(authController.Register);

router.route("/login").post(requireLogin, authController.Login);

module.exports = router;
