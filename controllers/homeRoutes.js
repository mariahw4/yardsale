const router = require("express").Router();
const sequelize = require("../config/connection");
const { Listing, User } = require("../models");
const withAuth = require("../utils/auth");

// Placeholder route for homepage
// router.get("/", (req, res) => {
//   res.json("Home route");
// });

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const listingData = await Listing.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const listings = listingData.map((listing) => listing.get({ plain: true }));
    console.log("Listings:", listings);

    // Pass serialized data and session flag into template
    res.render('homepage', {
      listings,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.loggedIn) {
//     res.redirect("/profile");
//     return;
//   }

//   res.render("login");
// });

module.exports = router;
