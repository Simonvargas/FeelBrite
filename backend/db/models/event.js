'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Registration, {foreignKey: 'eventId'})
    Event.belongsToMany(models.User, {through: 'Bookmark', otherKey:'userId', foreignKey: 'eventId'})
    Event.belongsTo(models.Category, {foreignKey: 'categoryId'})
  };
  return Event;
};