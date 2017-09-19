export default function(sequelize, DataTypes) {
  let CompanyTeam;
  return CompanyTeam = sequelize.define('CompanyTeam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    linkedin_url: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Company_team_members'
  });
};
