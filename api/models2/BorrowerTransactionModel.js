export default function(sequelize, DataTypes) {
  let BorrowerTransactions;
  return BorrowerTransactions = sequelize.define('BorrowerTransactions', {
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
    description: {
      type: DataTypes.STRING
    },
    scenario: {
      type: DataTypes.STRING
    },
  },{
    tableName: 'Borrower_transactions'
  });
};
