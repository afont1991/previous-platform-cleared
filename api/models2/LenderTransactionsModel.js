export default function(sequelize, DataTypes) {
  let LenderTransactions;
  return LenderTransactions = sequelize.define('LenderTransactions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.DATE
    },
    company: {
      type: DataTypes.STRING
    },
    industry: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    scenario: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Lender_transactions'
  });
};
