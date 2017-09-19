export default function(sequelize, DataTypes) {
  let CriteriaCharacteristics;

  return CriteriaCharacteristics = sequelize.define('CriteriaCharacteristics', {}, {
    classMethods: {
      associate: (models) => {
        CriteriaCharacteristics.belongsTo(models.Company)
        CriteriaCharacteristics.belongsTo(models.LookupCharacteristics)
      }
    }
  })
};
