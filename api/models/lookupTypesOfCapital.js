export default function(sequelize, DataTypes) {
  let LookupTypesOfCapital;

  return LookupTypesOfCapital = sequelize.define('LookupTypesOfCapital', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupTypesOfCapital.belongsToMany(models.Company, {through: 'CriteriaTypesOfCapital'})
        LookupTypesOfCapital.belongsToMany(models.Deal, {through: 'DealTypeOfCapital'})
      }
    }
  })
};
