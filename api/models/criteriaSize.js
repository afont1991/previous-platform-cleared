export default function(sequelize, DataTypes) {
  let CriteriaSize;

  return CriteriaSize = sequelize.define('CriteriaSize', {
    min: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    max: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    no_min: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    no_max: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        CriteriaSize.belongsTo(models.Company)
        CriteriaSize.belongsTo(models.LookupSize)
      }
    }
  })
};
