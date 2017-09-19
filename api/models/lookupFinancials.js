export default function(sequelize, DataTypes) {
  let LookupFinancials;

  return LookupFinancials = sequelize.define('LookupFinancials', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupFinancials.belongsToMany(models.Company, {through: 'CriteriaFinancials'})
      }
    }
  })
};
