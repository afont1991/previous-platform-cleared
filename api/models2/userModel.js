export default function(sequelize, DataTypes) {
  let User;
  return User = sequelize.define('User', {
    number: {
      type: DataTypes.STRING
    },
    conversation: {
      type: DataTypes.BOOLEAN
    }
  }
  , {
    classMethods: {

      getUser(fromNumber) {
        return User.findOrCreate({
          where: {
            number: fromNumber
          },
          defaults: {
            conversation: false,
            number: fromNumber
          }}).spread(function(user, created) {
          let response = {
            user: user.get({
              plain: true}),
            created
          };

          return response;
        });
      }
    }
  }
  );
};
