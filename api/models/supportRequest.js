export default function(sequelize, DataTypes) {
  let SupportRequest;

  return SupportRequest = sequelize.define('SupportRequest', {
    email: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT
    },
  },{
    classMethods: {
      associate: (models) => {
        SupportRequest.belongsTo(models.User)
      }
    }
  })
};
