export default function(sequelize, DataTypes) {
  let Company;

  return Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING
    },
    operating_type: {
      type: DataTypes.STRING
    },
    platform_type: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.STRING
    },
    logo_url: {
      type: DataTypes.STRING
    },
    founding_year: {
      type: DataTypes.FLOAT
    },
    state: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    platform_status: {
      type: DataTypes.STRING
    },
    open_fund: {
      type: DataTypes.STRING
    },
    closed_fund: {
      type: DataTypes.STRING
    },
    aum: {
      type: DataTypes.FLOAT
    },
    dry_powder: {
      type: DataTypes.FLOAT
    },
    new_investments: {
      type: DataTypes.FLOAT
    },
    active_investments: {
      type: DataTypes.STRING
    },
    realized_investments: {
      type: DataTypes.FLOAT
    },
    lockbox: {
      type: DataTypes.BOOLEAN
    },
    yield_minimum: {
      type: DataTypes.FLOAT
    },
    cash_coupon: {
      type: DataTypes.FLOAT
    },
  },{
    classMethods: {
      associate: (models) => {
        Company.belongsTo(models.User)
        Company.hasMany(models.BorrowerTransaction)
        Company.belongsToMany(models.LookupCharacteristics, {through: 'CriteriaCharacteristics'})
        Company.belongsToMany(models.LookupTypesOfCapital, {through: 'CriteriaTypesOfCapital'})
        Company.belongsToMany(models.LookupFinancials, {through: 'CriteriaFinancials'})
        Company.belongsToMany(models.LookupIndustries, {through: 'CriteriaIndustries'})
        Company.belongsToMany(models.LookupIndustries, {as: 'ExcludedIndustries', through: 'CriteriaExcludedIndustries'})
        Company.belongsToMany(models.LookupScenarios, {through: 'CriteriaScenarios'})
        Company.belongsToMany(models.LookupSize, {through: 'CriteriaSize'})
        Company.belongsToMany(models.Deal, {through: 'DealMatch', as: 'Match'})
        Company.hasMany(models.CriteriaGeographies)
        Company.hasMany(models.CriteriaTypesOfCapital)
        Company.hasMany(models.CriteriaSize)
        Company.hasMany(models.CriteriaFinancials)
        Company.hasMany(models.Deal)
        Company.hasMany(models.LenderTransaction)
        Company.hasMany(models.Team)
        Company.hasMany(models.Aggregate)
      }
    }
  })
};
