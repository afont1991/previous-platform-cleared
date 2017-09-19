export default function(sequelize, DataTypes) {
  let FinancialsRedux;
  return FinancialsRedux = sequelize.define('FinancialsRedux', {
    year_1: {
      type: DataTypes.FLOAT
    },
    year_2: {
      type: DataTypes.FLOAT
    },
    year_3: {
      type: DataTypes.FLOAT
    },
    revenue_year_1: {
      type: DataTypes.FLOAT
    },
    revenue_year_2: {
      type: DataTypes.FLOAT
    },
    revenue_year_3: {
      type: DataTypes.FLOAT
    },
    revenue_ltm: {
      type: DataTypes.FLOAT
    },
    gross_profit_year_1: {
      type: DataTypes.FLOAT
    },
    gross_profit_year_2: {
      type: DataTypes.FLOAT
    },
    gross_profit_year_3: {
      type: DataTypes.FLOAT
    },
    gross_profit_ltm: {
      type: DataTypes.FLOAT
    },
    gross_profit_percentage_year_1: {
      type: DataTypes.FLOAT
    },
    gross_profit_percentage_year_2: {
      type: DataTypes.FLOAT
    },
    gross_profit_percentage_year_3: {
      type: DataTypes.FLOAT
    },
    gross_profit_percentage_ltm: {
      type: DataTypes.FLOAT
    },
    ebitda_year_1: {
      type: DataTypes.FLOAT
    },
    ebitda_year_2: {
      type: DataTypes.FLOAT
    },
    ebitda_year_3: {
      type: DataTypes.FLOAT
    },
    ebitda_ltm: {
      type: DataTypes.FLOAT
    },
    ebitda_percentage_year_1: {
      type: DataTypes.FLOAT
    },
    ebitda_percentage_year_2: {
      type: DataTypes.FLOAT
    },
    ebitda_percentage_year_3: {
      type: DataTypes.FLOAT
    },
    ebitda_percentage_ltm: {
      type: DataTypes.FLOAT
    },
    yoy_growth_year_1: {
      type: DataTypes.FLOAT
    },
    yoy_growth_year_2: {
      type: DataTypes.FLOAT
    },
    yoy_growth_year_3: {
      type: DataTypes.FLOAT
    },
    yoy_growth_ltm: {
      type: DataTypes.FLOAT
    },
  },{
    classMethods: {
      associate: (models) => {
        FinancialsRedux.belongsTo(models.Deal)
        FinancialsRedux.belongsTo(models.Company)

      }
    }
  })
};
