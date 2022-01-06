const router = require('express').Router();
const { Book, User, Read } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/dashboard', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['username'], as: 'read_books'
        },
      ],
    });

    // const userData = await User.findByPk(req.session.user_id, {
    //     attributes: { exclude: ['password'] },
    //     include: [{ model: Read }],
    //   });
    

    res.json(bookData);
    // res.json(userData);

    // // Serialize data so the template can read it
    // const books = bookData.map((book) => book.get({ plain: true }));
    // const logged_in_user = userData.get({ plain: true });

    // // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   books, users, logged_in_user,
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
      console.log(err)
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Read,
          attributes: ['rating'],
        },
      ],
    });

    res.json(bookData)

    // const book = bookData.get({ plain: true });

    // res.render('book', {
    //   ...book,
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/user/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [
          {
            model: Read,
            attributes: ['rating'],
          },
        ],
      });
  
      res.json(userData)
  
      // const user = userData.get({ plain: true });
  
      // res.render('user', {
      //   ...user,
      //   logged_in: req.session.logged_in
      // });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('dashboard', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
