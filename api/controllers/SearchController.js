'use strict'
import isEmpty from 'is-empty'
import responseHandler from '../helpers/responseHelper';
import {fakePlaceHolderFilterData, fakeCompanySearchResults} from '../fakeData/fakeFilterData'
import {dealFilters, dealResults} from '../fakeData/FakeDealSearchData'
import Sequelize from 'sequelize';
import * as MatchHelper from '../helpers/matchHelper'
import * as ErrorHandler from '../helpers/errorHandler.js'

export function autoDealList(req, res){
  let ebitda, revenue, investmentSize, CompanyId, CompanyJson;
  let matches = []
  let CompanyQuery = {
    where: {
      UserId: req.user.get().id,
      platform_status: {$ne: 'inactive'},
      platform_type: 'lender'
    },
    include: [
      { model: global.database.LookupCharacteristics },
      { model: global.database.LookupTypesOfCapital },
      { model: global.database.LookupFinancials },
      { model: global.database.LookupIndustries },
      { model: global.database.LookupIndustries, as: 'ExcludedIndustries' },
      { model: global.database.LookupScenarios },
      { model: global.database.CriteriaGeographies },
      { model: global.database.LookupSize },
    ],
  }
  global.database.Company.findOne(CompanyQuery).then((CompanyInstance) => {
    if(!CompanyInstance){ throw 'No Active Company found' }
    CompanyJson = CompanyInstance.toJSON()
    CompanyId = CompanyJson.id
    const MathQuery = {
      where: {
        CompanyId: CompanyId,
        borrower_status: {$ne: 'listed'}
      },
    };
    return global.database.DealMatch.findAll(MathQuery)
  }).then((MatchInstances)=>{
    const MatchResults = MatchInstances.map((MatchInstance) => {
      return {
        DealId: MatchInstance.get().DealId,
        CompanyId: MatchInstance.get().CompanyId,
      }
    });
    CompanyJson.LookupFinancials.forEach((financial) => {
      if(financial.name === 'Revenue'){
        revenue = {min: financial.CriteriaFinancials.min, max: financial.CriteriaFinancials.max}
      }
      if(financial.name === 'EBITDA'){
        ebitda = {min: financial.CriteriaFinancials.min, max: financial.CriteriaFinancials.max}
      }
    })
    CompanyJson.LookupSizes.forEach((size) => {
      if(size.name === 'Investment size'){
        investmentSize = {min: size.CriteriaSize.min, max: size.CriteriaSize.max}
      }
    })

    // Industries Search
    let IndustriesQuery = {
      $or: [],
    }
    IndustriesQuery.$or = CompanyJson.LookupIndustries.map((industry) => {
      return {name: industry.name}
    })

    // Scenarios search
    let ScenariosQuery = {
      $or: [],
    }
    ScenariosQuery.$or = CompanyJson.LookupScenarios.map((scenario) => {
      return {name: scenario.name}
    })

    // Types of Capital search
    let TypesOfCapitalQuery = {
      $or: [],
    }
    TypesOfCapitalQuery.$or = CompanyJson.LookupTypesOfCapitals.map((type) => {
      return {name: type.name}
    })


    let DealQuery = {
      where: {
        platform_status: 'active',
        private: false
      },
      include: [
        {model: global.database.LookupIndustries, where: IndustriesQuery},
        {model: global.database.LookupScenarios, where: ScenariosQuery},
        {model: global.database.LookupTypesOfCapital, where: TypesOfCapitalQuery},
        {model: global.database.DealTypeOfCapital},
        {model: global.database.Financials},
      ],
    }

    DealQuery.where.$and = MatchResults.map((match) => {
      return {id: {$ne: match.DealId}}
    })
    // console.log(DealQuery.include[0].where)
    // console.log(DealQuery.include[1].where)
    // console.log(DealQuery.include[2].where)
    return global.database.Deal.findAll(DealQuery)
  }).then((DealInstances) => {
    let DealResults = DealInstances.filter((DealInstance) => {
      // filtering out financials
      let Financials = DealInstance.toJSON().Financials
      let mostRecentFinancial = {}
      Financials.forEach((financial) => {
        if(!mostRecentFinancial.fiscal_year || financial.fiscal_year > mostRecentFinancial.fiscal_year){
          mostRecentFinancial = financial;
        }
      })
      // ebitda, revenue;
      let revenueStatus = false
      let ebitdaStatus = false
      if(mostRecentFinancial.revenue >= revenue.min && mostRecentFinancial.revenue <= revenue.max){
        revenueStatus = true;
      }
      if(mostRecentFinancial.ebitda >= ebitda.min && mostRecentFinancial.ebitda <= ebitda.max){
        ebitdaStatus = true
      }
      if(ebitdaStatus && revenueStatus){
        return true
      } else {
        return false
      }
    }).filter((DealInstance) => {
      // Filtering out Deals with investment sizes outside lender desired range
      let TypesOfCapital = DealInstance.toJSON().DealTypeOfCapitals;
      let totalInvestmentAmount = TypesOfCapital.reduce((total, capitalType) => {
        return total + capitalType.amount
      }, 0)
      if(totalInvestmentAmount >= investmentSize.min && totalInvestmentAmount <= investmentSize.max){
        return true
      } else {
        return false
      }
    }).map((DealInstance) => {
      return DealInstance.toJSON()
    })
    return responseHandler(res, 'Success', DealResults);
  }).catch((err)=>{
    console.log(err)
    const NewError = {
      type: 'Search',
      reason: 'Error getting auto deal list',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting auto deal list', err);
  })
}

export function autoLenderList(req, res){
  let DealId = req.query.DealId;
  let LenderResults = []
  let UserCompanyId, DealInvestmentSize, mostRecentFinancial, DealProfile, revenueId, ebitdaId;
  let mostRecentRevenue = null
  let mostRecentEbitda = null
  req.user.getCompany().then((UserCompanyInstance)=>{
    if(!UserCompanyInstance){ throw 'User has no company' }
    UserCompanyId = UserCompanyInstance.get().id
    let OwnDealQuery = {
      where: {
        id: DealId,
        ParentCompanyId: UserCompanyId,
        platform_status: 'active',
      },
      include: [
        {model: global.database.LookupIndustries},
        {model: global.database.LookupScenarios},
        {model: global.database.LookupTypesOfCapital},
        {model: global.database.Aggregate},
      ],
    }
    return global.database.Deal.findOne(OwnDealQuery)
  }).then((OwnDealInstance)=>{
    if(!OwnDealInstance){ throw 'Invalid Deal Id' }
    DealProfile = OwnDealInstance.toJSON()
    const MathQuery = {
      where: {
        DealId: DealId
      },
    };
    return global.database.DealMatch.findAll(MathQuery)
  }).then((MatchInstances)=>{
    const MatchResults = MatchInstances.map((MatchInstance) => {
      return {
        DealId: MatchInstance.get().DealId,
        CompanyId: MatchInstance.get().CompanyId,
      }
    });
    // Find Most recent Financial and then apply them to query
    DealProfile.Aggregates.forEach((agg) => {
      if(agg.name === 'most recent revenue'){
        mostRecentRevenue = agg.value
      }
      if(agg.name === 'most recent ebitda'){
        mostRecentEbitda = agg.value
      }
    })
    DealInvestmentSize = DealProfile.LookupTypesOfCapitals.reduce((total, TypeOfCapital) => {
      return total + TypeOfCapital.DealTypeOfCapital.amount
    }, 0)
    // Industries Search
    let IndustriesQuery = {
      $or: [],
    }
    IndustriesQuery.$or = DealProfile.LookupIndustries.map((industry) => {
      return {name: industry.name}
    })

    // Scenarios search
    let ScenariosQuery = {
      $or: [],
    }
    ScenariosQuery.$or = DealProfile.LookupScenarios.map((scenario) => {
      return {name: scenario.name}
    })

    // Types of Capital search
    let TypesOfCapitalQuery = {
      $or: [],
    }
    TypesOfCapitalQuery.$or = DealProfile.LookupTypesOfCapitals.map((type) => {
      return {name: type.name}
    })

    let LendersQuery = {
      where: {
        platform_status: {$ne: 'inactive'},
        platform_type: 'lender',
        name: {$and: [{$ne: 'Demo Lender'}, {$ne: 'Demo Borrower'}]},
      },
      order: [['name', 'ASC']],
      include: [
        { model: global.database.LookupTypesOfCapital, TypesOfCapitalQuery },
        { model: global.database.LookupIndustries, IndustriesQuery },
        { model: global.database.LookupScenarios, ScenariosQuery },
        { model: global.database.LookupFinancials },
        { model: global.database.LookupSize },
      ],
    }
    LendersQuery.where.$and = MatchResults.map((match) => {
      return {id: {$ne: match.CompanyId}}
    })
    return global.database.Company.findAll(LendersQuery)
  }).then((LenderInstances)=>{
    LenderResults = LenderInstances.filter((LenderInstance) => {
      // Checking investment size meets deal investment Criteria
      let investmentSize = false;
      LenderInstance.toJSON().LookupSizes.forEach((size) => {
        if(size.name === 'Investment size'){
          investmentSize = {min: size.CriteriaSize.min, max: size.CriteriaSize.max}
        }
      })
      if(investmentSize === false){
        return false
      }
      if(investmentSize.max !== null && DealInvestmentSize > investmentSize.max){
        return false
      }
      if(investmentSize.min !== null && DealInvestmentSize < investmentSize.min){
        return false
      }

      // Checking financial requirements
      let revenueMinMax = false
      let ebitdaMinMax = false
      LenderInstance.toJSON().LookupFinancials.forEach((financial) => {
        if(financial.name === 'Revenue'){
          revenueMinMax = {min: financial.CriteriaFinancials.min, max: financial.CriteriaFinancials.max}
        }
        if(financial.name === 'EBITDA'){
          ebitdaMinMax = {min: financial.CriteriaFinancials.min, max: financial.CriteriaFinancials.max}
        }
      })
      if(revenueMinMax === false || ebitdaMinMax === false){
        return false
      }
      if(
      (revenueMinMax.max !== null && mostRecentRevenue > revenueMinMax.max) ||
      (revenueMinMax.min !== null && mostRecentRevenue < revenueMinMax.min)) {
        return false
      }
      if(
      (ebitdaMinMax.max !== null && mostRecentEbitda > ebitdaMinMax.max) ||
      (ebitdaMinMax.min !== null && mostRecentEbitda < ebitdaMinMax.min)) {
        return false
      }
      return true
    }).map((LenderInstance) => {
      return LenderInstance.toJSON()
    })
    // filter investment size manually post query
    // filter financials manually
    return responseHandler(res, 'Success', LenderResults);
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Search',
      reason: 'Error getting auto lender list',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting auto lender list', err);
  })
}

export function CompanySearch(req, res){
  let sortRules = [['name', 'ASC']]
  if(req.body.sorting && !isEmpty(req.body.sorting)){
    sortRules = req.body.sorting;
  }
  let limitAmount = 10;
  if(req.body.limit && !isEmpty(req.body.limit)){
    limitAmount = req.body.limit
  }
  let offsetAmount = 0;
  if(req.body.page && req.body.page > 1){
    offsetAmount = (req.body.page - 1) * limitAmount;
  }
  let CompaniesQuery = {
    where: {
      platform_status: {$ne: 'inactive'},
    },
    order: sortRules,
    limit: limitAmount,
    offset: offsetAmount,
    include: [
      { model: global.database.LookupFinancials},
      { model: global.database.LookupSize},
    ],
  }
  if(process.env.NODE_ENV === 'production'){
    CompaniesQuery.where.$and = [
      {UserId: {$ne: 1}},
      {UserId: {$ne: 2}},
      {UserId: {$ne: 206}},
      {UserId: {$ne: 207}},
    ]
  }
  if(!isEmpty(req.body.CompanyName.value)){
    CompaniesQuery.where.name = {$iLike: `%${req.body.CompanyName.value}%`}
  }
  if(req.body.Location.selected && !isEmpty(req.body.Location.selectedOption)){
    CompaniesQuery.where.$or = req.body.Location.selectedOption.map((option) => {
      return {state: option.value}
    });
  }
  if(req.body.CompanyTypes && req.body.CompanyTypes.selected && !isEmpty(req.body.CompanyTypes.selectedOption)){
    CompaniesQuery.where.operating_type = {
      $and: []
    }
    CompaniesQuery.where.operating_type.$and = req.body.CompanyTypes.selectedOption.map((option) => {
      return {$iLike: `%${option.value}%`}
    })
  }

  if(req.body.Geographies && req.body.Geographies.selected && !isEmpty(req.body.Geographies.selectedOption)){
    let GeographiesQuery = {$or: []}
    GeographiesQuery.$or = req.body.Geographies.selectedOption.map((region) => {return {region: region.value}})
    CompaniesQuery.include.push({model: global.database.CriteriaGeographies, where: GeographiesQuery})
  }

  if(req.body.Characteristics.selected && !isEmpty(req.body.Characteristics.selectedOption)){
    let CharacteristicsQuery = {$or: []}
    CharacteristicsQuery.$or = req.body.Characteristics.selectedOption.map((characteristic) => {return {id: characteristic.value}})
    CompaniesQuery.include.push({model: global.database.LookupCharacteristics, where: CharacteristicsQuery})
  }

  if(req.body.TypesOfCapital.selected && !isEmpty(req.body.TypesOfCapital.selectedOption)){
    let TypesQuery = {$or: []}
    TypesQuery.$or = req.body.TypesOfCapital.selectedOption.map((type) => {return {id: type.value}})
    CompaniesQuery.include.push({model: global.database.LookupTypesOfCapital, where: TypesQuery})
  }

  if(req.body.Scenarios.selected && !isEmpty(req.body.Scenarios.selectedOption)){
    let ScenariosQuery = {$or: []}
    ScenariosQuery.$or = req.body.Scenarios.selectedOption.map((scenario) => {return {id: scenario.value}})
    CompaniesQuery.include.push({model: global.database.LookupScenarios, where: ScenariosQuery})
  }

  if(req.body.Industries.selected && !isEmpty(req.body.Industries.selectedOption)){
    let IndustriesQuery = {$or: []}
    IndustriesQuery.$or = req.body.Industries.selectedOption.map((industry) => {return {id: industry.value}})
    CompaniesQuery.include.push({model: global.database.LookupIndustries, where: IndustriesQuery})
  }

  let sizeQuery = false;
  if(req.body.Sizes.selected){
    Object.keys(req.body.Sizes.rangeSections).forEach((sectionKey) => {
      let section = req.body.Sizes.rangeSections[sectionKey]
      if(section.selected && !isEmpty(section.value)){
        if(!sizeQuery) { sizeQuery = {$or: []} }
        sizeQuery.$or.push({LookupSizeId: section.id, min: {lte: section.value}, max: {gte: section.value}})
      }
    })
  }
  if(sizeQuery){
    CompaniesQuery.include.push({model: global.database.CriteriaSize, where: sizeQuery})
  }

  let financialQuery = false;
  if(req.body.Financials.selected){
    Object.keys(req.body.Financials.rangeSections).forEach((sectionKey) => {
      let section = req.body.Financials.rangeSections[sectionKey]
      if(section.selected && !isEmpty(section.value)){
        if(!financialQuery) { financialQuery = {$or: []} }
        financialQuery.$or.push({LookupFinancialId: section.id, min: {lte: section.value}, max: {gte: section.value}})
      }
    })
  }
  if(financialQuery){
    CompaniesQuery.include.push({model: global.database.CriteriaFinancials, where: financialQuery})
  }
  global.database.Company.findAll(CompaniesQuery).then((CompanyResults)=>{
    const results = CompanyResults.map((companyInstance) => {
      let companyLocation = '';
      if(!isEmpty(companyInstance.get().state) && !isEmpty(companyInstance.get().city)){
        companyLocation =  `${companyInstance.get().city}, ${companyInstance.get().state}`
      } else if(!isEmpty(companyInstance.get().state)){
        companyLocation = companyInstance.get().state
      }
      let companyRow = {
        id: companyInstance.get().id,
        name: companyInstance.get().name,
        aum: companyInstance.get().aum,
        active_investments: companyInstance.get().active_investments,
        location: companyLocation,
        investmentSize: null,
        ebitda: null,
        revenue: null,
      }
      companyInstance.get().LookupFinancials.forEach((financial) => {
        if(financial.get().name === 'EBITDA'){
          const min = financial.get().CriteriaFinancials.get().min
          const max = financial.get().CriteriaFinancials.get().max
          companyRow.ebitda = {min: min, max: max}
        }
        if(financial.get().name === 'Revenue'){
          const min = financial.get().CriteriaFinancials.get().min
          const max = financial.get().CriteriaFinancials.get().max
          companyRow.revenue = {min: min, max: max}
        }
      })
      companyInstance.get().LookupSizes.forEach((size) => {
        if(size.get().name === 'Investment size'){
          const min = size.get().CriteriaSize.get().min
          const max = size.get().CriteriaSize.get().max
          companyRow.investmentSize = {min: min, max: max}
        }
      })
      return companyRow;
    })
    return responseHandler(res, 'Success', results);
  }).catch((err)=>{
    const NewError = {
      type: 'Search',
      reason: 'Error during company search',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error during company search', err);
  })
}

export function DealSearch(req, res){
  let results = []
  let matches = []
  let sortRules = [['title', 'ASC']]
  if(req.body.sorting && !isEmpty(req.body.sorting)){
    sortRules = req.body.sorting;
  }
  let limitAmount = 10;
  if(req.body.limit && !isEmpty(req.body.limit)){
    limitAmount = req.body.limit
  }
  let offsetAmount = 0;
  if(req.body.page && req.body.page > 1){
    offsetAmount = (req.body.page - 1) * limitAmount;
  }
  let DealsQuery = {
    where: {
      platform_status: {$ne: 'inactive'},
      private: false,
    },
    order: sortRules,
    limit: limitAmount,
    offset: offsetAmount,
    include: [
      {model: global.database.LookupIndustries},
      {model: global.database.LookupScenarios},
      {model: global.database.LookupTypesOfCapital},
      {model: global.database.Aggregate},
    ],
  }
  if(req.body.Industries.selected && !isEmpty(req.body.Industries.selectedOption)){
    let IndustriesQuery = {$or: []}
    IndustriesQuery.$or = req.body.Industries.selectedOption.map((industry) => {return {id: industry.value}})
    DealsQuery.include[0].where = IndustriesQuery
  }
  if(req.body.Scenarios.selected && !isEmpty(req.body.Scenarios.selectedOption)){
    let ScenariosQuery = {$or: []}
    ScenariosQuery.$or = req.body.Scenarios.selectedOption.map((scenario) => {return {id: scenario.value}})
    DealsQuery.include[1].where = ScenariosQuery
  }
  if(req.body.TypesOfCapital.selected && !isEmpty(req.body.TypesOfCapital.selectedOption)){
    let TypesOfCapitalQuery = {$or: []}
    TypesOfCapitalQuery.$or = req.body.TypesOfCapital.selectedOption.map((type) => {return {id: type.value}})
    DealsQuery.include[2].where = TypesOfCapitalQuery
  }
  if(req.body.Location.selected && !isEmpty(req.body.Location.selectedOption)){
    DealsQuery.where.$or = req.body.Location.selectedOption.map((option) => {
      return {region: option.value}
    });
  }
  if(req.body.Ebitda.selected){
    if(!DealsQuery.include[3].where){
      DealsQuery.include[3].where = {
        $and: []
      }
    }
    let ebitdaQuery = {
      name: 'most recent ebitda',
      value: {
        $and: []
      }
    }
    if(!isEmpty(req.body.Ebitda.max) && req.body.Ebitda.max != 0){
      ebitdaQuery.value.$and.push({$lte: req.body.Ebitda.max})
    }
    if(!isEmpty(req.body.Ebitda.min) && req.body.Ebitda.min != 0){
      ebitdaQuery.value.$and.push({$gte: req.body.Ebitda.min})
    }
    DealsQuery.include[3].where.$and.push(ebitdaQuery)
  }
  if(req.body.Revenue.selected){
    if(!DealsQuery.include[3].where){
      DealsQuery.include[3].where = {
        $and: []
      }
    }
    let revenueQuery = {
      name: 'most recent revenue',
      value: {
        $and: []
      }
    }
    if(!isEmpty(req.body.Revenue.max) && req.body.Revenue.max != 0){
      revenueQuery.value.$and.push({$lte: req.body.Revenue.max})
    }
    if(!isEmpty(req.body.Revenue.min) && req.body.Revenue.min != 0){
      revenueQuery.value.$and.push({$gte: req.body.Revenue.min})
    }
    DealsQuery.include[3].where.$and.push(revenueQuery)
  }

  if(req.body.TransactionSize.selected){
    if(!DealsQuery.include[3].where){
      DealsQuery.include[3].where = {
        $and: []
      }
    }
    let AggMin = 0;
    let AggMax = 999999999999;
    if(!isEmpty(req.body.TransactionSize.max) && req.body.TransactionSize.max != 0){
      AggMax = req.body.TransactionSize.max
    }
    if(!isEmpty(req.body.TransactionSize.min) && req.body.TransactionSize.min != 0){
      AggMin = req.body.TransactionSize.min
    }
    let AggregateQuery = {
      name: 'Deal Transaction Total',
      value: {$between: [AggMin, AggMax]}
    }
    DealsQuery.include[3].where.$and.push(AggregateQuery)
  }
  global.database.Deal.findAll(DealsQuery).then((DealInstances)=>{
    results = DealInstances.map((DealInstance) => {
      return DealInstance.toJSON()
    })
    let MatchQuery = {
      where: {CompanyId: req.user.get().Company.get().id}
    }
    return global.database.DealMatch.findAll(MatchQuery)
  }).then((MatchResults)=>{
    matches = MatchResults.map((match) => {
      return {
        id: match.get().DealId,
        lender_status: match.get().lender_status,
        borrower_status: match.get().borrower_status,
      }
    })
    results.forEach((result) => {
      matches.forEach((match) => {
        if(result.id === match.id){
          result.match = match
        }
      })
    })
    return responseHandler(res, 'Success', results);
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Search',
      reason: 'Error during Deal search',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error during Deal search', err);
  })
}

export function SaveFilters(req, res){
  let newSearch = {
    UserId: req.user.get().id,
    type: req.body.type,
    name: req.body.name,
    filters: JSON.stringify(req.body.filters),
  }
  global.database.SavedSearch.create(newSearch).then((SavedSearchInstance)=>{
    return responseHandler(res, 'Success');
  }).catch((err)=>{
    const NewError = {
      type: 'Search',
      reason: 'Error saving filters',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error saving filters', err);
  })
}

export function GetSavedFilterList(req, res){
  let whereSearch = {
    where: {
      UserId: req.user.get().id
    }
  }
  global.database.SavedSearch.findAll(whereSearch).then((SavedSearchInstances)=>{
    let results = SavedSearchInstances.map((instance)=>{
      return instance.get()
    })
    return responseHandler(res, 'Success', results);
  }).catch((err)=>{
    const NewError = {
      type: 'Search',
      reason: 'Error getting filters',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting filters', err);
  })
}

export function LoadSavedFIlter(req, res){
  let whereSearch = {
    where: {
      UserId: req.user.get().id,
      name: req.body.name,
    }
  }
  global.database.SavedSearch.findOne(whereSearch).then((SavedSearchInstance)=>{
    return responseHandler(res, 'Success', JSON.parse(SavedSearchInstance.get().filters));
  }).catch((err)=>{
    const NewError = {
      type: 'Search',
      reason: 'Error loading filter',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error loading filter', err);
  })
}

export function DeleteFilter(req, res){
  let whereDeleteSearch = {
    where: {
      UserId: req.user.get().id,
      id: req.body.id,
    }
  }
  global.database.SavedSearch.destroy(whereDeleteSearch).then((deletedInstance)=>{
    return responseHandler(res, 'Success');
  }).catch((err)=>{
    const NewError = {
      type: 'Search',
      reason: 'Error deleting filter',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error Deleteing filter', err);
  })
}
