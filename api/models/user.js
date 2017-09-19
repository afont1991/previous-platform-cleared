export default function(sequelize, DataTypes) {
  let User;
  return User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    admin: {
      type: DataTypes.BOOLEAN
    },
    signed_terms: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    initial_setup_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{
    classMethods: {
      associate: (models) => {
        User.hasOne(models.Company)
      }
    }
  })
};
