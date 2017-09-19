export default function(sequelize, DataTypes) {
  let CriteriaExcludedIndustries;

  return CriteriaExcludedIndustries = sequelize.define('CriteriaExcludedIndustries', {}, {
    classMethods: {
      associate: (models) => {
        CriteriaExcludedIndustries.belongsTo(models.Company)
        CriteriaExcludedIndustries.belongsTo(models.LookupIndustries)
      }
    }
  })
};
