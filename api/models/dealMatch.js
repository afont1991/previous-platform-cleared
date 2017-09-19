export default function(sequelize, DataTypes) {
  let DealMatch;

  return DealMatch = sequelize.define('DealMatch', {
    borrower_status: DataTypes.STRING,
    lender_status: DataTypes.STRING,
    teaser: DataTypes.BOOLEAN,
    nda: DataTypes.BOOLEAN,
    cim: DataTypes.BOOLEAN,
    termsheet: DataTypes.BOOLEAN,
    credit_committee: DataTypes.BOOLEAN,
    commitment_letter: DataTypes.BOOLEAN,
    do_not_contact: DataTypes.BOOLEAN,
  },{
    classMethods: {
      associate: (models) => {
        DealMatch.belongsTo(models.Deal)
        DealMatch.belongsTo(models.Company)
        DealMatch.hasMany(models.Message)
      }
    }
  })
};
