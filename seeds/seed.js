const sequelize = require('../config/connection');
const { User, Book, Read } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const readData = require('./readData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await bookData();

  await readData();

  process.exit(0);
};

seedDatabase();
