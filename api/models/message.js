export default function(sequelize, DataTypes) {
  let Message;

  return Message = sequelize.define('Message', {
    text: DataTypes.TEXT,
    sender: DataTypes.STRING,
    status: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Deal)
        Message.belongsTo(models.Company)
      }
    }
  })
};
