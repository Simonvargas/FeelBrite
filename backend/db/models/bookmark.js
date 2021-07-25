'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User, {foreignKey: 'userId'})
    Bookmark.belongsTo(models.Event, {foreignKey: 'eventId'})
  };
  return Bookmark;
};