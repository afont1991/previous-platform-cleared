export default function(sequelize, DataTypes) {
  let SavedSearch;

  return SavedSearch = sequelize.define('SavedSearch', {
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    filters: {
      type: DataTypes.TEXT,
    },
  },{
    classMethods: {
      associate: (models) => {
        SavedSearch.belongsTo(models.User)
      }
    }
  })
};
