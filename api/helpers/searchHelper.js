import isEmpty from 'is-empty'

export function getDealSearchDetails(DealIds, sorting){
  let sortRules = sorting
  // Default sorting
  if(!sorting){
    sortRules = ['createdAt', 'DESC']
  }
  let DealQuery = {
    where: {},
    order: [sortRules],
    include: [
      {model: global.database.LookupIndustries},
      {model: global.database.LookupScenarios},
      {model: global.database.LookupTypesOfCapital},
      {model: global.database.Financials},
    ],
  }
  DealQuery.where.$or = DealIds.map((id) => {
    return {id: id}
  })
  return global.database.Deal.findAll(DealQuery).then((DealInstances)=>{
    return DealInstances.map((DealInstance) => {
      return DealInstance.toJSON()
    })
  }).catch((err)=>{
    throw err
  })
}


// { id: 1,
//     name: 'Lender',
//     aum: 100000000,
//     active_investments: 20,
//     location: '-',
//     typesOfCapital:
//      [ 'Asset Based Loan',
//        'Cash Flow Based Loan',
//        'Enterprise Value Based Loan',
//        'Equity Co-Investment' ],
//     industries:
//      [ 'Automotive',
//        'Business Services',
//        'Chemicals',
//        'Consumer Goods' ],
//     investmentSize: { min: 20, max: 200000 },
//     ebitda: { min: 200, max: 2000 },
//     revenue: null },

export function getCompanySearchDetails(CompanyIds, rules, name){
  // Default sorting
  let sortRules = [['name', 'ASC']]
  if(rules && rules.sorting){
    sortRules = rules.sorting
  }
  let limit = 5;
  if(rules && rules.limit){
    limit = rules.limit
  }
  const orIDs = CompanyIds.map((companyID) => {
    return {id: companyID}
  })
  const companiesQuery = {
    where: {$or: orIDs, platform_status: {$ne: 'inactive'},},
    order: sortRules,
    limit: limit,
    include: [
      {model: global.database.LookupTypesOfCapital},
      {model: global.database.LookupFinancials},
      {model: global.database.LookupIndustries},
      {model: global.database.LookupSize},
    ],
  };
  if(name && !isEmpty(name)){
    companiesQuery.where.name = {$iLike: `%${name}%`}
  }
  let companyResults = [];
  return global.database.Company.findAll(companiesQuery).then((CompanyInstances)=>{
    CompanyInstances.forEach((companyInstance) => {
      let city = companyInstance.get().city
      let state = companyInstance.get().city
      let companyLocation = '';
      if(!isEmpty(companyInstance.get().state) && !isEmpty(companyInstance.get().city)){
        companyLocation =  `${companyInstance.get().city}, ${companyInstance.get().state}`
      } else if(!isEmpty(companyInstance.get().state)){
        companyLocation = companyInstance.get().state
      }
      const company = {
        id: companyInstance.get().id,
        name: companyInstance.get().name,
        aum: companyInstance.get().aum,
        description: companyInstance.get().description,
        active_investments: companyInstance.get().active_investments,
        location: companyLocation,
        typesOfCapital: [],
        industries: [],
        investmentSize: null,
        ebitda: null,
        revenue: null,
      }
      companyInstance.get().LookupFinancials.forEach((financial) => {
        if(financial.get().name === 'EBITDA'){
          const min = financial.get().CriteriaFinancials.get().min
          const max = financial.get().CriteriaFinancials.get().max
          company.ebitda = {min: min, max: max}
        }
        if(financial.get().name === 'Revenue'){
          const min = financial.get().CriteriaFinancials.get().min
          const max = financial.get().CriteriaFinancials.get().max
          company.revenue = {min: min, max: max}
        }
      })
      companyInstance.get().LookupTypesOfCapitals.forEach((typeOfCapital) => {
        company.typesOfCapital.push(typeOfCapital.get().name)
      })
      companyInstance.get().LookupIndustries.forEach((industry) => {
        company.industries.push(industry.get().name)
      })
      companyInstance.get().LookupSizes.forEach((size) => {
        if(size.get().name === 'Investment size'){
          const min = size.get().CriteriaSize.get().min
          const max = size.get().CriteriaSize.get().max
          company.investmentSize = {min: min, max: max}
        }
      })
      companyResults.push(company)
    });
    return companyResults
  }).catch((err)=>{
    console.log('ERROR')
    console.log(err)
    throw err
  })
}
