'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    details: DataTypes.STRING,
    date: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Registration, {foreignKey: 'eventId'})
    Event.belongsTo(models.Category, {foreignKey: 'categoryId'})
    Event.belongsTo(models.User, {foreignKey: 'hostId'})
    Event.hasMany(models.Bookmark, {foreignKey: 'eventId'})
  };
  return Event;
};