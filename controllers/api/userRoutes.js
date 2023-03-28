const router = require('express').Router();
const { User, Listing } = require('../../models');

  router.get('/', async (req, res) => {
    try {
    const userData = await User.findAll({
      attributes: {exclude: ['password']}
    })

  res.status(200).json(userData);
    } catch(err) {
      res.status(400).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
    const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Listing,
                    attributes: [
                        // 'id',
                        // 'title',
                        // 'content',
                    ]
                },
            ]
          })
            if (!userData) {
              res.status(404).json({ message: 'No blog found with this id!' });
              return;
            }
        
            res.status(200).json(userData);
          } catch (err) {
            res.status(500).json(err);
          }
        });


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.email = userData.email;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update a user id -- not sure if we need this?? 
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;