'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    apikey: DataTypes.UUID
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
