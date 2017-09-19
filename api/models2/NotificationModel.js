export default function(sequelize, DataTypes) {
  let Notifications;
  return Notifications = sequelize.define('Notifications', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
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
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Notifications'
  });
};
