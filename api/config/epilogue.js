import epilogue from 'epilogue'

module.exports = (app) => {
  epilogue.initialize({
    app: app,
    sequelize: global.database.sequelize
  })
  let LookupCharacteristics = epilogue.resource({
    model: database.LookupCharacteristics,
    endpoints: [
      '/api/epilogue/lookups/Characteristics',
      '/api/epilogue/lookups/Characteristics/:id'
    ],
    // pagination: false
  })
  let lookupFinancials = epilogue.resource({
    model: database.LookupFinancials,
    endpoints: [
      '/api/epilogue/lookups/financials',
      '/api/epilogue/lookups/financials/:id'
    ],
    // pagination: false
  })
  let LookupIndustries = epilogue.resource({
    model: database.LookupIndustries,
    endpoints: [
      '/api/epilogue/lookups/industry',
      '/api/epilogue/lookups/industry/:id'
    ],
    associations: true,
    // pagination: false
  })
  let lookupScenarios = epilogue.resource({
    model: database.LookupScenarios,
    endpoints: [
      '/api/epilogue/lookups/scenarios',
      '/api/epilogue/lookups/scenarios/:id'
    ],
    // pagination: false
  })
  let lookupSize = epilogue.resource({
    model: database.LookupSize,
    endpoints: [
      '/api/epilogue/lookups/size',
      '/api/epilogue/lookups/size/:id'
    ],
    // pagination: false
  })
  let lookupTypesOfCapital = epilogue.resource({
    model: database.LookupTypesOfCapital,
    endpoints: [
      '/api/epilogue/lookups/typesofcapital',
      '/api/epilogue/lookups/typesofcapital/:id'
    ],
    // pagination: false
  })
  let lookupCriteria = epilogue.resource({
    model: database.LookupCriteria,
    endpoints: [
      '/api/epilogue/lookups/criteria',
      '/api/epilogue/lookups/criteria/:id'
    ],
    associations: true,
    // pagination: false
  })

  let companyTeam = epilogue.resource({
    model: database.Team,
    endpoints: [
      '/api/epilogue/team',
      '/api/epilogue/team/:id'
    ],
    associations: true,
    // pagination: false
  })
  let notifications = epilogue.resource({
    model: database.Notifications,
    endpoints: [
      '/api/epilogue/notifications',
      '/api/epilogue/notifications/:id'
    ],
    // pagination: false
  })
  //
  // lookupResource.create.write.before((req, res, context) => {
  //   console.log(req);
  // })

}
