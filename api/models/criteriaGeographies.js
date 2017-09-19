export default function(sequelize, DataTypes) {
  let CriteriaGeographies;

  return CriteriaGeographies = sequelize.define('CriteriaGeographies', {
    region: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        CriteriaGeographies.belongsTo(models.Company)
      }
    }
  })
};