export default function(sequelize, DataTypes) {
  let Aggregate;

  return Aggregate = sequelize.define('Aggregate', {
    value: DataTypes.FLOAT,
    name: DataTypes.STRING,
  },{
    classMethods: {
      associate: (models) => {
        Aggregate.belongsTo(models.Deal)
        Aggregate.belongsTo(models.Company)
      }
    }
  })
};
