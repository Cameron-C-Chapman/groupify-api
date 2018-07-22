'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    name: DataTypes.STRING,
    playlist_id: DataTypes.STRING,
    owner_spotify_id: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    underscored: true,
    timestamps: false,
    schema: 'groupify'
  });
  group.associate = function(models) {
//    group.belongsTo(models.user);
    group.belongsToMany(models.user, { as: 'members', through: 'group_member' });
    // group.belongsTo(models.user, { as: 'owner' });
    // group.hasOne(models.user, { as: 'owner' });
  };
  return group;
};
