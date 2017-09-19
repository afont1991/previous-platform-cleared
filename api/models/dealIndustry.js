export default function(sequelize, DataTypes) {
  let DealIndustry;

  return DealIndustry = sequelize.define('DealIndustry', {},{
    classMethods: {
      associate: (models) => {
        DealIndustry.belongsTo(models.Deal)
        DealIndustry.belongsTo(models.LookupIndustries)
      }
    }
  })
};
