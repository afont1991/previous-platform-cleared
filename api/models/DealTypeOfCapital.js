export default function(sequelize, DataTypes) {
  let DealTypeOfCapital;

  return DealTypeOfCapital = sequelize.define('DealTypeOfCapital', {
    amount: DataTypes.FLOAT,
  },{
    classMethods: {
      associate: (models) => {
        DealTypeOfCapital.belongsTo(models.Deal)
        DealTypeOfCapital.belongsTo(models.LookupTypesOfCapital)
      }
    }
  })
};
