export default function(sequelize, DataTypes) {
  let IndustryNews;

  return IndustryNews = sequelize.define('IndustryNews', {
    headlines: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATE,
    }
  })
};
