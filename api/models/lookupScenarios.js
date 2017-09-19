export default function(sequelize, DataTypes) {
  let LookupScenarios;

  return LookupScenarios = sequelize.define('LookupScenarios', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupScenarios.belongsToMany(models.Company, {through: 'CriteriaScenarios'})
        LookupScenarios.belongsToMany(models.Deal, {through: 'DealScenario'})
      }
    }
  })
};
