const path = require('path');
const express = require('express');
// const session = require('express-session');
const hbs = require('hbs');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();

const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3001;



app.use(routes);
// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
// app.use(session(sess));
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };


// Inform Express.js on which template engine to use

app.get('/', function (req, res) {
  res.render('home');
});


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
