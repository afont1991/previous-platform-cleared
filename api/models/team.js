export default function(sequelize, DataTypes) {
  let Team;
  return Team = sequelize.define('Team', {
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
    classMethods: {
      associate: (models) => {
        Team.belongsTo(models.Company)
      }
    }
  })
};
