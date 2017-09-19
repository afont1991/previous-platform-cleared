
export default function(sequelize, DataTypes) {
  let CriteriaCategories;
  return CriteriaCategories = sequelize.define('CriteriaCategories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    parent_id: {
      type: DataTypes.INTEGER
    },
    category_name: {
      type: DataTypes.STRING
    },
    category_group_type: {
      type: DataTypes.STRING
    },
    value_type: {
      type: DataTypes.STRING
    },
    value_format: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Criteria_categories'
  });
};
