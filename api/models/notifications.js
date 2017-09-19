export default function(sequelize, DataTypes) {
  let Notifications;
  return Notifications = sequelize.define('Notifications', {
    type: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unread'

    },
  },{
    classMethods: {
      associate: (models) => {
        Notifications.belongsTo(models.User)
      }
    }
  })
};
