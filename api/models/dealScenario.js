export default function(sequelize, DataTypes) {
  let DealScenario;

  return DealScenario = sequelize.define('DealScenario', {}, {
    classMethods: {
      associate: (models) => {
        DealScenario.belongsTo(models.Deal)
        DealScenario.belongsTo(models.LookupScenarios)
      }
    }
  })
};
