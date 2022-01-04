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

  const books = await Book.bulkCreate(bookData);

  const reads = await Read.bulkCreate(readData);

  process.exit(0);
};

seedDatabase();
