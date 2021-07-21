'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Registration, {foreignKey: 'eventId'})
    Event.belongsTo(models.Category, {foreignKey: 'categoryId'})
    Event.belongsTo(models.User, {foreignKey: 'hostId'})
  };
  return Event;
};