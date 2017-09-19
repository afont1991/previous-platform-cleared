export default function(sequelize, DataTypes) {
  let LookupSize;

  return LookupSize = sequelize.define('LookupSize', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupSize.belongsToMany(models.Company, {through: 'CriteriaSize'})
      }
    }
  })
};
