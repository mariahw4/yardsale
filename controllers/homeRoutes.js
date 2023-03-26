const router = require("express").Router();
const sequelize = require("../config/connection");
const { Listing, User } = require("../models");
const withAuth = require("../utils/auth");

// Placeholder route for homepage
router.get("/", (req, res) => {
  res.json("Home route");
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
