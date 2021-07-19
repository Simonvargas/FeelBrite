'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Registration.associate = function(models) {
    Registration.belongsTo(models.User, {foreignKey: 'userId'})
    Registration.belongsTo(models.Event, {foreignKey: 'eventId'})
  };
  return Registration;
};