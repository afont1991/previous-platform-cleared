export default function(sequelize, DataTypes) {
  let LookupCharacteristics;

  return LookupCharacteristics = sequelize.define('LookupCharacteristics', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupCharacteristics.belongsToMany(models.Company, {through: 'CriteriaCharacteristics'})
      }
    }
  })
};
