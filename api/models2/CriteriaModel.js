export default function(sequelize, DataTypes) {
  let Criteria;
  return Criteria = sequelize.define('Criteria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.STRING
    },
    sub_category: {
      type: DataTypes.STRING
    },
    value_1_int: {
      type: DataTypes.INTEGER
    },
    value_2_int: {
      type: DataTypes.INTEGER
    },
    value_1_text: {
      type: DataTypes.STRING
    },
    value_type: {
      type: DataTypes.STRING
    },
    display_format: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Criteria'
  });
};
