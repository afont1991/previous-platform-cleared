export default function(sequelize, DataTypes) {
  let DealContact;

  return DealContact = sequelize.define('DealContact', {},{
    classMethods: {
      associate: (models) => {
        DealContact.belongsTo(models.Deal)
        DealContact.belongsTo(models.Team)
      }
    }
  })
};
