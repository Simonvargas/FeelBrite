'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    eventId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Event, {foreignKey: 'eventId', onDelete: 'CASCADE'})
  };
  return Image;
};