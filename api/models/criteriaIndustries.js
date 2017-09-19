export default function(sequelize, DataTypes) {
  let CriteriaIndustries;

  return CriteriaIndustries = sequelize.define('CriteriaIndustries', {}, {
    classMethods: {
      associate: (models) => {
        CriteriaIndustries.belongsTo(models.Company)
        CriteriaIndustries.belongsTo(models.LookupIndustries)
      }
    }
  })
};
