const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10],        }
     },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [8],
      },
    },

    education: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    prevEmployer: {
        type: DataTypes.STRING,
        allowNull: false,
    },


  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
       