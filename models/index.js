const Read = require('./Read');
const Book = require('./Book');
const User = require('./User');

User.belongsToMany(Book, {
    through: {
        model: Read,
        unique: false
    },

    as: 'user_books'
});

Book.belongsToMany(User, {

    through: {
        model: Read,
        unique: false
    },

    as: 'read_books'
});



module.exports = { Read, Book, User };