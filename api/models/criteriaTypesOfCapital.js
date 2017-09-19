export default function(sequelize, DataTypes) {
  let CriteriaTypesOfCapital;

  return CriteriaTypesOfCapital = sequelize.define('CriteriaTypesOfCapital', {}, {
    classMethods: {
      associate: (models) => {
        CriteriaTypesOfCapital.belongsTo(models.Company)
        CriteriaTypesOfCapital.belongsTo(models.LookupTypesOfCapital)
      }
    }
  })
};
