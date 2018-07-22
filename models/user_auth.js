'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_auth = sequelize.define('user_auth', {
    access_token: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT,
    expires_in: DataTypes.INTEGER,
    spotify_id: DataTypes.STRING,
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
  user_auth.associate = function(models) {
    user_auth.belongsTo(models.user);
  };
  return user_auth;
};
