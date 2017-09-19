export default function(sequelize, DataTypes) {
  let Company;
  return Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    logo_url: {
      type: DataTypes.STRING
    },
    founding_year: {
      type: DataTypes.INTEGER
    },
    main_office_location: {
      type: DataTypes.STRING
    },
    platform_status: {
      type: DataTypes.STRING
    },
    open_fund: {
      type: DataTypes.BOOLEAN
    },
    closed_fund: {
      type: DataTypes.STRING
    },
    aum: {
      type: DataTypes.INTEGER
    },
    dry_powder: {
      type: DataTypes.INTEGER
    },
    new_investments: {
      type: DataTypes.INTEGER
    },
    active_investments: {
      type: DataTypes.INTEGER
    },
    realized_investments: {
      type: DataTypes.INTEGER
    },
  }, {
    tableName: 'Company'
  });
};
