import isEmpty from 'is-empty'

export function MapProfileToState(ProfileData, State){
  let formData = State.formData
  formData.CompanyId = ProfileData.basicDetails.id

  // Company Overview
  formData.overview.platform_type.selectedOption = {value: ProfileData.basicDetails.platform_type, label: ProfileData.basicDetails.platform_type}

  if(!isEmpty(ProfileData.basicDetails.operating_type)){
    formData.overview.operating_type.selectedOption = ProfileData.basicDetails.operating_type.split(', ').map((operatingType) => {
      return {value: operatingType, label: operatingType}
    })
  } else {
    formData.overview.operating_type.selectedOption = []
  }
  if(!isEmpty(ProfileData.basicDetails.state)) {
    formData.overview.state.selectedOption = {value: ProfileData.basicDetails.state, label: ProfileData.basicDetails.state}
  }
 if(!isEmpty(ProfileData.basicDetails.country)){
    formData.overview.country.selectedOption = {value: ProfileData.basicDetails.country, label: ProfileData.basicDetails.country}
  }
  if(!isEmpty(ProfileData.basicDetails.city)){ formData.overview.city.value = ProfileData.basicDetails.city }
  if(!isEmpty(ProfileData.basicDetails.name)){formData.overview.company_name.value = ProfileData.basicDetails.name}
  if(!isEmpty(ProfileData.basicDetails.url)){formData.overview.company_url.value = ProfileData.basicDetails.url}
  if(!isEmpty(ProfileData.basicDetails.founding_year)){formData.overview.founding_year.value = ProfileData.basicDetails.founding_year}
  if(!isEmpty(ProfileData.basicDetails.logo_url)){ formData.overview.company_logo.url = ProfileData.basicDetails.logo_url }
  if(!isEmpty(ProfileData.basicDetails.description)){ formData.overview.company_description.value = ProfileData.basicDetails.description }
  if(!isEmpty(ProfileData.basicDetails.open_fund)){formData.overview.open_fund.value = ProfileData.basicDetails.open_fund}
  if(!isEmpty(ProfileData.basicDetails.aum)){formData.overview.aum.value = ProfileData.basicDetails.aum}
  if(!isEmpty(ProfileData.basicDetails.active_investments)){formData.overview.active_investments.selectedOption = {value: ProfileData.basicDetails.active_investments, label: ProfileData.basicDetails.active_investments}}
  if(!isEmpty(ProfileData.basicDetails.dry_powder)){formData.overview.dry_powder.value = ProfileData.basicDetails.dry_powder}

  // if(!isEmpty(ProfileData.basicDetails.lockbox)) {
  //   formData.overview.lockbox.selectedOption = {value: ProfileData.basicDetails.lockbox ? 'yes' : 'no', label: ProfileData.basicDetails.lockbox ? 'Yes' : 'No'}
  // }

  // if(!isEmpty(ProfileData.basicDetails.yield_minimum)){formData.overview.yield_minimum.value = ProfileData.basicDetails.yield_minimum}
  // if(!isEmpty(ProfileData.basicDetails.cash_coupon)){formData.overview.cash_coupon.value = ProfileData.basicDetails.cash_coupon}

  //Team
  formData.team.teamArray = ProfileData.team.map((person, i) => {
    return {
      first_name: person.first_name,
      last_name: person.last_name,
      email: person.email,
      linkedin_url: person.linkedin_url,
      title: person.title,
      id: i,
    }
  })

  //Criteria
  // Financials
  // Size
  if(!isEmpty(ProfileData.criteria.Characteristics)){
    formData.criteria.Characteristics.selectedOption = ProfileData.criteria.Characteristics.map((lookup, i) => {
      return {value: lookup.LookupCharacteristicId, label: lookup.name}
    })
  }
  if(!isEmpty(ProfileData.criteria.Scenarios)){
    formData.criteria.Scenarios.selectedOption = ProfileData.criteria.Scenarios.map((lookup, i) => {
      return {value: lookup.LookupScenarioId, label: lookup.name}
    })
  }
  if(!isEmpty(ProfileData.criteria.Industries)){
    formData.criteria.Industries.selectedOption = ProfileData.criteria.Industries.map((lookup, i) => {
      return {value: lookup.LookupIndustryId, label: lookup.name}
    })
  }
  if(!isEmpty(ProfileData.criteria.ExcludedIndustries)){
    formData.criteria.ExcludedIndustries.selectedOption = ProfileData.criteria.ExcludedIndustries.map((lookup, i) => {
      return {value: lookup.LookupIndustryId, label: lookup.name}
    })
  }
  if(!isEmpty(ProfileData.criteria.TypesOfCapital)){
    formData.criteria.TypesOfCapital.selectedOption = ProfileData.criteria.TypesOfCapital.map((lookup, i) => {
      return {value: lookup.LookupTypesOfCapitalId, label: lookup.name}
    })
  }
  if(!isEmpty(ProfileData.criteria.Geographies)){
    formData.criteria.Geography.selectedOption = ProfileData.criteria.Geographies.map((region, i) => {
      return {value: region, label: region}
    })
  }
  Object.keys(formData.criteria.Financials.ranges).forEach((rangeKey, i) => {
    ProfileData.criteria.Financials.forEach((financial, x) => {
      if(financial.name === formData.criteria.Financials.ranges[rangeKey].display_name){
        if(!isEmpty(financial.min)){formData.criteria.Financials.ranges[rangeKey].min_value = financial.min}
        if(!isEmpty(financial.max)){formData.criteria.Financials.ranges[rangeKey].max_value = financial.max}
        formData.criteria.Financials.ranges[rangeKey].validation = {
          class: 'has-success',
          message: false,
        }
      }
    })
  })
  Object.keys(formData.criteria.Size.ranges).forEach((rangeKey, i) => {
    ProfileData.criteria.Sizes.forEach((size, x) => {
      if(size.name === formData.criteria.Size.ranges[rangeKey].display_name){
        if(!isEmpty(size.min)){formData.criteria.Size.ranges[rangeKey].min_value = size.min}
        if(!isEmpty(size.max)){formData.criteria.Size.ranges[rangeKey].max_value = size.max}
        formData.criteria.Size.ranges[rangeKey].validation = {
          class: 'has-success',
          message: false,
        }
      }
    })
  })



  //Selected transactions
  if(ProfileData.basicDetails.platform_type === 'lender'){
    formData.lender_transactions.transactionArray = ProfileData.transactions.map((transaction, i) => {
      let industries = ''
      if(transaction.LookupIndustry){
        industries = {selectedOption: {value: transaction.LookupIndustry.id, label: transaction.LookupIndustry.name}}
      }
      let scenarios = ''
      if(transaction.LookupScenario){
        scenarios = {selectedOption: {value: transaction.LookupScenario.id, label: transaction.LookupScenario.name}}
      }
      let typesOfCapital = ''
      if(transaction.LookupTypesOfCapital){
        typesOfCapital = {selectedOption: {value: transaction.LookupTypesOfCapital.id, label: transaction.LookupTypesOfCapital.name}}
      }
      return {
        id: i,
        date: {value: transaction.date},
        company: {value:transaction.company},
        Industries: industries,
        Scenarios: scenarios,
        TypesOfCapital: typesOfCapital,
        transaction_size: {selectedOption: {value: transaction.size, label: transaction.size}},
      }
    })
  } else {
    formData.borrower_transactions.transactionArray = ProfileData.transactions.map((transaction, i) => {
      let industries = ''
      if(transaction.LookupIndustry){
        industries = {selectedOption: {value: transaction.LookupIndustry.id, label: transaction.LookupIndustry.name}}
      }
      let scenarios = ''
      if(transaction.LookupScenario){
        scenarios = {selectedOption: {value: transaction.LookupScenario.id, label: transaction.LookupScenario.name}}
      }
      return {
        id: i,
        date: {value: transaction.date},
        company: {value:transaction.company},
        Industries: industries,
        Scenarios: scenarios,
        description: {value:transaction.description},
        transaction_size: {selectedOption: {value: transaction.size, label: transaction.size}},
      }
    })
  }

  return State
}
