const router = require("express").Router();
const { Book, User, Read } = require("../models");
// const withAuth = require('../utils/auth');

router.get('/dashboard', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const bookData = await Book.findAll();
    const userData = await User.findAll();
    
    const logged_in_userData = await User.findByPk(2, {
        attributes: { exclude: ['password'] },
        include: [
          { 
            model: Book,
            attributes: ['id', 'title', 'author'], as: 'user_books' 
          }
        ],
      });

    // Serialize data so the template can read it
    const books = bookData.map((book) => book.get({ plain: true }));
    const users = userData.map((user) => user.get({ plain: true }));
    const logged_in_user = logged_in_userData.get({ plain: true });
console.log(logged_in_user);
    // // Pass serialized data and session flag into template
    res.render('dashboard', { 
      books, users, logged_in_user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
      console.log(err)
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findAll();
    const userData = await User.findAll();
    
    const currentBookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Read,
          attributes: ['rating'],
        },
      ],
    });


    const books = bookData.map((book) => book.get({ plain: true }));
    const users = userData.map((user) => user.get({ plain: true }));
    const currentBook = currentBookData.get({ plain: true });

    res.render('book', { 
      books, users, currentBook,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/user/:id', async (req, res) => {
    try {
    const bookData = await Book.findAll();
    const userData = await User.findAll();
    
    const currentUserData = await User.findByPk(2, {
        attributes: { exclude: ['password'] },
        include: [
          { 
            model: Book,
            attributes: ['id', 'title', 'author'], as: 'user_books' 
          }
        ],
      });
    
  // Serialize data so the template can read it
    const books = bookData.map((book) => book.get({ plain: true }));
    const users = userData.map((user) => user.get({ plain: true }));
    const currentUser = currentUserData.get({ plain: true });
console.log(currentUser);
    // // Pass serialized data and session flag into template
    res.render('user', { 
      books, users, currentUser,
      logged_in: req.session.logged_in 
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
