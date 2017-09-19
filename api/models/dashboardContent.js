export default function(sequelize, DataTypes) {
  let DashboardContent;

  return DashboardContent = sequelize.define('DashboardContent', {
    chart_of_the_week_url: DataTypes.STRING,
    market_stats: DataTypes.TEXT,
    market_stats_date: DataTypes.DATE,
    market_stats_source: DataTypes.STRING,
  })
};
