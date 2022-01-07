const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Read extends Model { }

Read.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'user',
          key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'book',
          key: 'id'
      }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'read',
  }
);

module.exports = Read;