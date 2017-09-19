export default function(sequelize, DataTypes) {
  let Deal;

  return Deal = sequelize.define('Deal', {
    title: {
      type: DataTypes.STRING
    },
    headline: {
      type: DataTypes.STRING
    },
    logo_url: {
      type: DataTypes.STRING
    },
    founded: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING
    },
    platform_status: {
      type: DataTypes.STRING
    },
    termsheet_date: {
      type: DataTypes.DATE
    },
    additional_information: {
      type: DataTypes.TEXT
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blind_sponsor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sponsored: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    financial_review_level: {
      type: DataTypes.STRING
    },
    region: {
      type: DataTypes.STRING
    },
    teaser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    nda: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cim: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{
    classMethods: {
      associate: (models) => {
        Deal.belongsTo(models.Company, {as: 'ParentCompany'})
        Deal.belongsToMany(models.Company, {through: 'DealMatch', as: 'Match'})
        Deal.belongsToMany(models.Team, {through: 'DealContact', as: 'Contact'})
        Deal.belongsToMany(models.LookupIndustries, {through: 'DealIndustry'})
        Deal.belongsToMany(models.LookupScenarios, {through: 'DealScenario'})
        Deal.belongsToMany(models.LookupTypesOfCapital, {through: 'DealTypeOfCapital'})
        Deal.hasMany(models.DealTypeOfCapital)
        Deal.hasMany(models.Financials)
        Deal.hasMany(models.Faq)
        Deal.hasMany(models.Aggregate)
      },
    }
  })
};
