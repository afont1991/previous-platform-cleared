export default function(sequelize, DataTypes) {
  let SimilarCompanies;
  return SimilarCompanies = sequelize.define('SimilarCompanies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER
    },
    similar_company_id: {
      type: DataTypes.INTEGER
    },
    similar_company_name: {
      type: DataTypes.STRING
    },
    similar_company_location: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Similar_companies'
  });
};
