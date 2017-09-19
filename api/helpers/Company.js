import crypto from 'crypto';
import isEmpty from 'is-empty'
import * as utils from './utilHelpers'

export function saveCompany(req, formattedData) {
  let CompanyId;
  return global.database.Company.findOne({where: {UserId: req.user.get().id}}).then((companyInstance) =>{
    if(companyInstance){
      if(req.user.get().admin !== true){
        throw 'NON admin trying to create company'
      } else {
        if(!formattedData.user){
          throw 'trying to create company without user'
        } else {
          formattedData.user.password = crypto.createHash('sha256').update(formattedData.user.password).digest('hex')
          formattedData.user.type = formattedData.overview.platform_type
          return global.database.User.create(formattedData.user)
        }
      }
    } else {
      return Promise.resolve('skip');
    }
  }).then((newUserInstance) => {
    let operatingTypes = formattedData.overview.operating_type.map((type)=>{
      return type.value
    })
    const formattedtoperatingTypes = operatingTypes.join(', ')
    let newCompany = {
      name: formattedData.overview.company_name,
      platform_status: 'active',
      operating_type: formattedtoperatingTypes,
      platform_type: formattedData.overview.platform_type,
      description: formattedData.overview.company_description,
      url: formattedData.overview.company_url,
      founding_year: formattedData.overview.founding_year,
      state: formattedData.overview.state,
      city: formattedData.overview.city,
      country: formattedData.overview.country,
      open_fund: formattedData.overview.open_fund,
      aum: formattedData.overview.aum,
      active_investments: formattedData.overview.active_investments,
      lockbox: formattedData.overview.lockbox !== 'no' ? true : false,
      cash_coupon: formattedData.overview.cash_coupon,
      yield_minimum: formattedData.overview.yield_minimum,
    }
    if(newUserInstance !== 'skip'){
      let UserId = newUserInstance.get().id;
      newCompany.UserId = UserId
    }
    return global.database.Company.create(newCompany)
  }).then((newCompanyInstance) => {
    CompanyId = newCompanyInstance.get().id;
    if(!req.files || !req.files.logo){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-public',
      Key: `company-logo-id-${CompanyId}`,
      Body: req.files.logo.data,
      ContentType: req.files.logo.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((s3Response)=>{
    if(!req.files || !req.files.logo || s3Response === 'skip'){
      return Promise.resolve('skip');
    }
    const logo_url = `https://s3.amazonaws.com/debt-maven-public/company-logo-id-${CompanyId}`
    const updateCompany = {
      logo_url: logo_url
    }
    let updateFindCompany = {
      where: {
        id: CompanyId
      }
    }
    return global.database.Company.update(updateCompany, updateFindCompany)
  }).then((UpdatedCompany)=>{
    if(formattedData.team.length > 0){
      formattedData.team.forEach((team)=>{
        team.CompanyId = CompanyId
        delete team.id
      })
      return global.database.Team.bulkCreate(formattedData.team)
    } else {
      return Promise.resolve('skip');
    }
  }).then((newTeamInstance) => {
    if(formattedData.borrower_transactions.length > 0){
      let formattedTransactions = formattedData.borrower_transactions.map((transaction)=>{
        return {
          CompanyId: CompanyId,
          date: utils.findNestedValue(transaction, 'date.value'),
          company: utils.findNestedValue(transaction, 'company.value'),
          description: utils.findNestedValue(transaction, 'description.value'),
          size: utils.findNestedValue(transaction, 'transaction_size.selectedOption.value'),
          LookupScenarioId: utils.findNestedValue(transaction, 'Scenarios.selectedOption.value'),
          LookupIndustryId: utils.findNestedValue(transaction, 'Industries.selectedOption.value'),
        }
      })
      return global.database.BorrowerTransaction.bulkCreate(formattedTransactions)
    } else {
      return Promise.resolve('skip');
    }
  }).then((newBorrowerTransactions) => {
    if(formattedData.lender_transactions.length > 0){
      let formattedTransactions = formattedData.lender_transactions.map((transaction)=>{
        return {
          CompanyId: CompanyId,
          date: utils.findNestedValue(transaction, 'date.value'),
          company: utils.findNestedValue(transaction, 'company.value'),
          size: utils.findNestedValue(transaction, 'transaction_size.selectedOption.value'),
          LookupScenarioId: utils.findNestedValue(transaction, 'Scenarios.selectedOption.value'),
          LookupIndustryId: utils.findNestedValue(transaction, 'Industries.selectedOption.value'),
          LookupTypesOfCapitalId: utils.findNestedValue(transaction, 'TypesOfCapital.selectedOption.value'),
        }
      })
      return global.database.LenderTransaction.bulkCreate(formattedTransactions)
    } else {
      return Promise.resolve('skip');
    }
  }).then((newLenderTransactions) => {
    if(formattedData.criteria.Geography === null){
      return Promise.resolve('skip')
    } else {
      let Geographies = formattedData.criteria.Geography.map((region)=>{
        return {
          region: region.value
        }
      })
      return global.database.CriteriaGeographies.bulkCreate(Geographies)
    }
  }).then((savedGeographies)=>{
    if(formattedData.criteria.Characteristics === null){
      return Promise.resolve('skip')
    } else {
      let Characteristics = formattedData.criteria.Characteristics.map((characteristic)=>{
        return {
          CompanyId: CompanyId,
          LookupCharacteristicId: characteristic.value
        }
      })
      return global.database.CriteriaCharacteristics.bulkCreate(Characteristics)
    }
  }).then((savedCharacteristics)=>{
    if(formattedData.criteria.ExcludedIndustries === null){
      return Promise.resolve('skip')
    } else {
      let ExcludedIndustries = formattedData.criteria.ExcludedIndustries.map((industry)=>{
        return {
          CompanyId: CompanyId,
          LookupIndustryId: industry.value
        }
      })
      return global.database.CriteriaExcludedIndustries.bulkCreate(ExcludedIndustries)
    }
  }).then((savedExcludedIndustries)=>{
    if(formattedData.criteria.Industries === null){
      return Promise.resolve('skip')
    } else {
      let Industries = formattedData.criteria.Industries.map((industry)=>{
        return {
          CompanyId: CompanyId,
          LookupIndustryId: industry.value
        }
      })
      return global.database.CriteriaIndustries.bulkCreate(Industries)
    }
  }).then((savedIndustries)=>{
    if(formattedData.criteria.Scenarios === null){
      return Promise.resolve('skip')
    } else {
       let Scenarios = formattedData.criteria.Scenarios.map((scenario)=>{
        return {
          CompanyId: CompanyId,
          LookupScenarioId: scenario.value
        }
      })
      return global.database.CriteriaScenarios.bulkCreate(Scenarios)
    }
  }).then((savedScenarios)=>{
    if(formattedData.criteria.TypesOfCapital === null){
      return Promise.resolve('skip')
    } else {
      let TypesOfCapital = formattedData.criteria.TypesOfCapital.map((typeocap)=>{
        return {
          CompanyId: CompanyId,
          LookupTypesOfCapitalId: typeocap.value
        }
      })
      return global.database.CriteriaTypesOfCapital.bulkCreate(TypesOfCapital)
    }
  }).then((savedTypesOfCapital)=>{
    if(formattedData.criteria.Financials === null){
      return Promise.resolve('skip')
    } else {
      let Financials = formattedData.criteria.Financials.map((financial)=>{
        return {
          CompanyId: CompanyId,
          LookupFinancialId: financial.id,
          min: (financial.min ? financial.min : null),
          max: (financial.max ? financial.max : null),
          no_min: (financial.no_min ? financial.no_min : false),
          no_max: (financial.no_max ? financial.no_max : false),
        }
      })
      return global.database.CriteriaFinancials.bulkCreate(Financials)
    }
  }).then((savedFinancials)=>{
    if(formattedData.criteria.Size === null){
      return Promise.resolve('skip')
    } else {
      let Size = formattedData.criteria.Size.map((size)=>{
        return {
          CompanyId: CompanyId,
          LookupSizeId: size.id,
          min: (size.min ? size.min : null),
          max: (size.max ? size.max : null),
          no_min: (size.no_min ? size.no_min : false),
          no_max: (size.no_max ? size.no_max : false),
        }
      })
      return global.database.CriteriaSize.bulkCreate(Size)
    }
  }).then((savedSize)=>{
    return CompanyId
  })
}

export function editCompany(req, formattedData, CompanyId) {
  let operatingTypes = formattedData.overview.operating_type.map((type)=>{
    return type.value
  })
  const formattedtoperatingTypes = operatingTypes.join(', ')

  let updatedCompany = {
    name: formattedData.overview.company_name,
    operating_type: formattedtoperatingTypes,
    platform_type: formattedData.overview.platform_type,
    description: formattedData.overview.company_description,
    url: formattedData.overview.company_url,
    founding_year: formattedData.overview.founding_year,
    state: formattedData.overview.state,
    city: formattedData.overview.city,
    country: formattedData.overview.country,
    open_fund: formattedData.overview.open_fund,
    aum: formattedData.overview.aum,
    active_investments: formattedData.overview.active_investments,
    lockbox: formattedData.overview.lockbox,
    yield_minimum: formattedData.overview.yield_minimum,
    cash_coupon: formattedData.overview.cash_coupon,
  }
  let CompanyUpdateWhere = {
    id: CompanyId
  }
  if(req.user.get().admin !== true){
    CompanyUpdateWhere.UserId = req.user.get().id
  }
  return global.database.Company.update(updatedCompany, {where: CompanyUpdateWhere}).then((updatedCompany)=>{
    if(!req.user.get().initial_setup_complete){
      let updateUser = {
        initial_setup_complete: true,
      }
      let userQuery = {
        where: {
          id: req.user.get().id,
        },
      }
      return global.database.User.update(updateUser, userQuery)
    } else {
      return Promise.resolve('skip');
    }
  }).then((initUser)=>{
    if(!req.files || !req.files.logo){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-public',
      Key: `company-logo-id-${CompanyId}`,
      Body: req.files.logo.data,
      ContentType: req.files.logo.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((s3Response)=>{
    if(!req.files || !req.files.logo || s3Response === 'skip'){
      return Promise.resolve('skip');
    }
    const logo_url = `https://s3.amazonaws.com/debt-maven-public/company-logo-id-${CompanyId}`
    const updateCompany = {
      logo_url: logo_url
    }
    let updateFindCompany = {
      where: {
        id: CompanyId
      }
    }
    return global.database.Company.update(updateCompany, updateFindCompany)
  }).then((UpdatedCompany)=>{
    return global.database.Team.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaGeographies.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaCharacteristics.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaFinancials.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaExcludedIndustries.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaIndustries.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaScenarios.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaSize.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.CriteriaTypesOfCapital.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.BorrowerTransaction.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    return global.database.LenderTransaction.destroy({where: {CompanyId: CompanyId}})
  }).then((deletedInstances)=>{
    if(formattedData.team.length > 0){
      formattedData.team.forEach((team)=>{
        team.CompanyId = CompanyId
        delete team.id
      })
      return global.database.Team.bulkCreate(formattedData.team)
    } else {
      return Promise.resolve('skip');
    }
  }).then((newTeamInstance) => {
    if(formattedData.borrower_transactions.length > 0){
      let formattedTransactions = formattedData.borrower_transactions.map((transaction)=>{
        return {
          CompanyId: CompanyId,
          date: utils.findNestedValue(transaction, 'date.value'),
          company: utils.findNestedValue(transaction, 'company.value'),
          description: utils.findNestedValue(transaction, 'description.value'),
          size: utils.findNestedValue(transaction, 'transaction_size.selectedOption.value'),
          LookupScenarioId: utils.findNestedValue(transaction, 'Scenarios.selectedOption.value'),
          LookupIndustryId: utils.findNestedValue(transaction, 'Industries.selectedOption.value'),
        }
      })
      return global.database.BorrowerTransaction.bulkCreate(formattedTransactions)
    } else {
      return Promise.resolve('skip');
    }
  }).then((newBorrowerTransactions) => {
    if(formattedData.lender_transactions.length > 0){
      let formattedTransactions = formattedData.lender_transactions.map((transaction)=>{
        return {
          CompanyId: CompanyId,
          date: utils.findNestedValue(transaction, 'date.value'),
          company: utils.findNestedValue(transaction, 'company.value'),
          size: utils.findNestedValue(transaction, 'transaction_size.selectedOption.value'),
          LookupScenarioId: utils.findNestedValue(transaction, 'Scenarios.selectedOption.value'),
          LookupIndustryId: utils.findNestedValue(transaction, 'Industries.selectedOption.value'),
          LookupTypesOfCapitalId: utils.findNestedValue(transaction, 'TypesOfCapital.selectedOption.value'),
        }
      })
      return global.database.LenderTransaction.bulkCreate(formattedTransactions)
    } else {
      return Promise.resolve('skip');
    }
  }).then((newLenderTransactions) => {
    if(formattedData.criteria.Geography === null){
      return Promise.resolve('skip')
    } else {
      let Geographies = formattedData.criteria.Geography.map((region)=>{
        return {
          CompanyId: CompanyId,
          region: region.value,
        }
      })
      return global.database.CriteriaGeographies.bulkCreate(Geographies)
    }
  }).then((savedGeographies)=>{
    if(formattedData.criteria.Characteristics === null){
      return Promise.resolve('skip')
    } else {
      let Characteristics = formattedData.criteria.Characteristics.map((characteristic)=>{
        return {
          CompanyId: CompanyId,
          LookupCharacteristicId: characteristic.value
        }
      })
      return global.database.CriteriaCharacteristics.bulkCreate(Characteristics)
    }
  }).then((savedCharacteristics)=>{
    if(formattedData.criteria.ExcludedIndustries === null){
      return Promise.resolve('skip')
    } else {
      let ExcludedIndustries = formattedData.criteria.ExcludedIndustries.map((industry)=>{
        return {
          CompanyId: CompanyId,
          LookupIndustryId: industry.value
        }
      })
      return global.database.CriteriaExcludedIndustries.bulkCreate(ExcludedIndustries)
    }
  }).then((savedIndustries)=>{
    if(formattedData.criteria.Industries === null){
      return Promise.resolve('skip')
    } else {
      let Industries = formattedData.criteria.Industries.map((industry)=>{
        return {
          CompanyId: CompanyId,
          LookupIndustryId: industry.value
        }
      })
      return global.database.CriteriaIndustries.bulkCreate(Industries)
    }
  }).then((savedIndustries)=>{
    if(formattedData.criteria.Scenarios === null){
      return Promise.resolve('skip')
    } else {
       let Scenarios = formattedData.criteria.Scenarios.map((scenario)=>{
        return {
          CompanyId: CompanyId,
          LookupScenarioId: scenario.value
        }
      })
      return global.database.CriteriaScenarios.bulkCreate(Scenarios)
    }
  }).then((savedScenarios)=>{
    if(formattedData.criteria.TypesOfCapital === null){
      return Promise.resolve('skip')
    } else {
      let TypesOfCapital = formattedData.criteria.TypesOfCapital.map((typeocap)=>{
        return {
          CompanyId: CompanyId,
          LookupTypesOfCapitalId: typeocap.value
        }
      })
      return global.database.CriteriaTypesOfCapital.bulkCreate(TypesOfCapital)
    }
  }).then((savedTypesOfCapital)=>{
    if(formattedData.criteria.Financials === null){
      return Promise.resolve('skip')
    } else {
      let Financials = formattedData.criteria.Financials.map((financial)=>{
        return {
          CompanyId: CompanyId,
          LookupFinancialId: financial.id,
          min: (financial.min ? financial.min : null),
          max: (financial.max ? financial.max : null),
          no_min: (financial.no_min ? financial.no_min : false),
          no_max: (financial.no_max ? financial.no_max : false),
        }
      })
      return global.database.CriteriaFinancials.bulkCreate(Financials)
    }
  }).then((savedFinancials)=>{
    if(formattedData.criteria.Size === null){
      return Promise.resolve('skip')
    } else {
      let Size = formattedData.criteria.Size.map((size)=>{
        return {
          CompanyId: CompanyId,
          LookupSizeId: size.id,
          min: (size.min ? size.min : null),
          max: (size.max ? size.max : null),
          no_min: (size.no_min ? size.no_min : false),
          no_max: (size.no_max ? size.no_max : false),
        }
      })
      return global.database.CriteriaSize.bulkCreate(Size)
    }
  }).then((savedSize)=>{
    return CompanyId
  })
}
