export default function(sequelize, DataTypes) {
  let LookupCriteria;

  return LookupCriteria = sequelize.define('LookupCriteria', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        LookupCriteria.belongsTo(models.LookupCriteria, {
          as: 'Parent'
        })
      }
    }
  })
};
