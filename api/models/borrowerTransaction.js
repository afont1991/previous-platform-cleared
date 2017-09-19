export default function(sequelize, DataTypes) {
  let BorrowerTransaction;
  return BorrowerTransaction = sequelize.define('BorrowerTransaction', {
    date: {
      type: DataTypes.DATE
    },
    company: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    size: {
      type: DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        BorrowerTransaction.belongsTo(models.Company)
        BorrowerTransaction.belongsTo(models.LookupScenarios)
        BorrowerTransaction.belongsTo(models.LookupIndustries)
      }
    }
  })
};
