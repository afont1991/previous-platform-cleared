export default function(sequelize, DataTypes) {
  let CriteriaScenarios;

  return CriteriaScenarios = sequelize.define('CriteriaScenarios', {}, {
    classMethods: {
      associate: (models) => {
        CriteriaScenarios.belongsTo(models.Company)
        CriteriaScenarios.belongsTo(models.LookupScenarios)
      }
    }
  })
};
