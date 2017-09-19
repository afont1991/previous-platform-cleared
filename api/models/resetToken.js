export default function(sequelize, DataTypes) {
  let ResetToken;

  return ResetToken = sequelize.define('ResetToken', {
    token: {
      type: DataTypes.STRING,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{
    classMethods: {
      associate: (models) => {
        ResetToken.belongsTo(models.User)
      }
    }
  })
};
