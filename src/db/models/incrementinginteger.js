'use strict';
module.exports = (sequelize, DataTypes) => {
  const IncrementingInteger = sequelize.define('IncrementingInteger', {
    userInt: DataTypes.BIGINT,
    userId: DataTypes.INTEGER
  }, {});
  IncrementingInteger.associate = function (models) {
    IncrementingInteger.belongsTo(models.User, { as: 'user' });
  };
  return IncrementingInteger;
};
