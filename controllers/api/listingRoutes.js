const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Listing, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const listingData = await Listing.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "price",
        "image",
        "date_created",
        "sold",
      ],

      include: [
        {
          model: User,
          attributes: ["name"],
        },

        {
          model: Comment,
          attributes: ["id", "comment_content", "listing_id", "user_id"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    if (!listingData) {
      res.status(404).json({ message: "No listing found with this id!" });
      return;
    }

    res.status(200).json(listingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Draft 2 of listing detail route

router.get("/:id", async (req, res) => {
  try {
    const listingData = await Listing.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "title",
        "description",
        "price",
        "image",
        "date_created",
      ],

      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!listingData) {
      res.status(404).json({ message: "No listing found with this id!" });
      return;
    }
    // Serialize data so the handlebars template can read it
    const listing = listingData.get({ plain: true });
    console.log("Listing:", listing); // delete for deploy

    // Pass serialized data and session flag into template
    res.status(200).render("listing", {
      listing,
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log("catch called");
    res.status(500).json(err);
  }
});

// ~~~ original get route. returns the object~~~

// router.get("/:id", async (req, res) => {
//   try {
//     const listingData = await Listing.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: [
//         "id",
//         "title",
//         "description",
//         "price",
//         "image",
//         "date_created",
//       ],

//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },

//         // ~~~ For comments feature. Turned off for now ~~~
//         // {
//         //   model: Comment,
//         //   attributes: ["id", "comment_content", "blog_id", "user_id"],
//         //   include: {
//         //     model: User,
//         //     attributes: ["name"],
//         //   },
//         // },
//       ],
//     });
//     if (!listingData) {
//       res.status(404).json({ message: "No listing found with this id!" });
//       return;
//     }

//     res.status(200).json(listingData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/", withAuth, async (req, res) => {
  try {
    const newListing = await Listing.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newListing);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const listingData = await Listing.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "title",
        "description",
        "price",
        "image",
        "date_created",
      ],

      include: [
        {
          model: User,
          attributes: ["name"],
        },

        {
          model: Comment,
          attributes: ["id", "comment_content", "blog_id", "user_id"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
    if (!listingData) {
      res.status(404).json({ message: "No listing found with this id!" });
      return;
    }

    res.status(200).json(listingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const listingData = await Listing.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!listingData) {
      res.status(404).json({ message: "No listing found with this id!" });
      return;
    }

    res.status(200).json(listingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
