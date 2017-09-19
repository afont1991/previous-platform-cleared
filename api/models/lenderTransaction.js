export default function(sequelize, DataTypes) {
  let LenderTransaction;
  return LenderTransaction = sequelize.define('LenderTransaction', {
    date: {
      type: DataTypes.DATE
    },
    company: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        LenderTransaction.belongsTo(models.Company)
        LenderTransaction.belongsTo(models.LookupScenarios)
        LenderTransaction.belongsTo(models.LookupIndustries)
        LenderTransaction.belongsTo(models.LookupTypesOfCapital)
      }
    }
  })
};
