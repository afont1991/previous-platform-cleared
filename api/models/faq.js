export default function(sequelize, DataTypes) {
  let Faq;

  return Faq = sequelize.define('Faq', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'show'
    },
    question: {
      type: DataTypes.STRING
    },
    answer: {
      type: DataTypes.TEXT
    },
  },{
    classMethods: {
      associate: (models) => {
        Faq.belongsTo(models.Deal)
      }
    }
  })
};
