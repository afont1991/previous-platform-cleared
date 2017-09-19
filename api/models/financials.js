export default function(sequelize, DataTypes) {
  let Financials;
  return Financials = sequelize.define('Financials', {
    fiscal_year: {
      type: DataTypes.FLOAT
    },
    revenue: {
      type: DataTypes.FLOAT
    },
    yoy_growth: {
      type: DataTypes.FLOAT
    },
    gross_profit: {
      type: DataTypes.FLOAT
    },
    gross_profit_percentage: {
      type: DataTypes.FLOAT
    },
    ebitda: {
      type: DataTypes.FLOAT
    },
    ebitda_percentage: {
      type: DataTypes.FLOAT
    },
    most_recent: {
      type: DataTypes.BOOLEAN
    },
    ltv_cap: {
      type: DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        Financials.belongsTo(models.Deal)
        Financials.belongsTo(models.Company)

      }
    }
  })
};
