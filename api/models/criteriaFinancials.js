export default function(sequelize, DataTypes) {
  let CriteriaFinancials;

  return CriteriaFinancials = sequelize.define('CriteriaFinancials', {
    min: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    max: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    no_min: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    no_max: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        CriteriaFinancials.belongsTo(models.Company)
        CriteriaFinancials.belongsTo(models.LookupFinancials)
      }
    }
  })
};
