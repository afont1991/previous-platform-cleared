export default function(sequelize, DataTypes) {
  let ErrorLogs;

  return ErrorLogs = sequelize.define('ErrorLogs', {
    type: {
      type: DataTypes.STRING,
    },
    reason: {
      type: DataTypes.STRING
    },
    details: {
      type: DataTypes.TEXT
    },
  },{
    classMethods: {
      associate: (models) => {
        ErrorLogs.belongsTo(models.User)
      }
    }
  })
};
