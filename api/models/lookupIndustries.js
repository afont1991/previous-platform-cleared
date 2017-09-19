export default function(sequelize, DataTypes) {
  let LookupIndustries;

  return LookupIndustries = sequelize.define('LookupIndustries', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupIndustries.belongsTo(models.LookupIndustries, {
          as: 'Parent'
        })
        LookupIndustries.belongsToMany(models.Company, {through: 'CriteriaIndustries'})
        LookupIndustries.belongsToMany(models.Deal, {through: 'DealIndustry'})
      }
    }
  })
};
