'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    spotify_url: DataTypes.STRING,
    spotify_uri: DataTypes.STRING,
    spotify_id: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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
  user.associate = function(models) {
    user.hasOne(models.user_auth, { as: 'auth' });
    user.belongsToMany(user, { as: 'friend', through: 'user_friend' });
    user.belongsToMany(models.group, { as: 'groups', through: 'group_member' });
    user.hasMany(models.group, { as: 'owner' });
  };
  return user;
};
