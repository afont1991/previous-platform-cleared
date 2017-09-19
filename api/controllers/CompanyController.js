'use strict'

import crypto from 'crypto';
import responseHandler from '../helpers/responseHelper';
import criteriaSaveHelper from '../helpers/criteriaSaveHelper';
import jsesc from 'jsesc'
import {criteriaFormater, formatNumber} from '../helpers/valueFormatHelper.js';
import * as utils from '../helpers/utilHelpers.js';
import * as SearchHelper from '../helpers/searchHelper.js'
import * as ErrorHandler from '../helpers/errorHandler.js'
import * as DataFormatter from '../helpers/DataFormatter.js'
import * as CompanyHelper from '../helpers/Company.js'

export function getCompany(req, res){
  let companyProfile = {};
  let companyQuery;
  if(req.query.CompanyId){
    companyQuery = {
      where: {
        id: req.query.CompanyId,
        $or: [
          {platform_status: {$ne: 'inactive'}},
          {platform_status: null}
        ]
      }
    };
  }
  global.database.Company.findOne(companyQuery).then((CompanyBasicDetails)=>{
    if(!CompanyBasicDetails){
      throw `No Company with that ID ${req.query.CompanyId} Found`;
    }
    companyProfile.basicDetails = CompanyBasicDetails.get();
    return global.database.Team.findAll({where: {CompanyId: companyProfile.basicDetails.id}})
  }).then((companyTeam)=>{
    companyProfile.team = [];
    companyTeam.forEach((person, i) => {
      companyProfile.team.push(person.get());
    });
    let transactionModelName = 'LenderTransaction';
    let includeQuery = [
      {model: global.database.LookupScenarios},
      {model: global.database.LookupIndustries},
      {model: global.database.LookupTypesOfCapital},
    ];
    if(companyProfile.basicDetails.platform_type === 'borrower'){
      transactionModelName = 'BorrowerTransaction';
      includeQuery = [
        {model: global.database.LookupScenarios},
        {model: global.database.LookupIndustries},
      ];
    }
    const transactionQuery = {
      where: {CompanyId: companyProfile.basicDetails.id},
      include: includeQuery,
    }
    return global.database[transactionModelName].findAll(transactionQuery)
  }).then((companyTransactions)=>{
    companyProfile.transactions = [];
    companyTransactions.forEach((transaction) => {
      companyProfile.transactions.push(transaction.get());
    });
    companyProfile.criteria = {};
    return global.database.CriteriaGeographies.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaGeographies)=>{
    companyProfile.criteria.Geographies = CriteriaGeographies.map((region)=>{
      return region.get().region
    })
    return global.database.CriteriaCharacteristics.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaCharacteristics)=>{
    const CriteriaCharacteristicsPromises = CriteriaCharacteristics.map((Characteristics, i) => {
      let criteria = Characteristics.get();
      return global.database.LookupCharacteristics.findOne({where: {id: criteria.LookupCharacteristicId}}).then((LookupCharacteristic)=>{
        criteria.name = LookupCharacteristic.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaCharacteristicsPromises);
  }).then((CharacteristicsPromise)=>{
    companyProfile.criteria.Characteristics = CharacteristicsPromise;
    return global.database.CriteriaFinancials.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaFinancials)=>{
    const CriteriaFinancialsPromises = CriteriaFinancials.map((Financials, i) => {
      let criteria = Financials.get();
      return global.database.LookupFinancials.findOne({where: {id: criteria.LookupFinancialId}}).then((LookupFinancial)=>{
        criteria.name = LookupFinancial.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaFinancialsPromises);
  }).then((CriteriaFinancialsPromise)=>{
    companyProfile.criteria.Financials = CriteriaFinancialsPromise;
    return global.database.CriteriaScenarios.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaScenarios)=>{
    const CriteriaScenariosPromises = CriteriaScenarios.map((Scenarios, i) => {
      let criteria = Scenarios.get();
      return global.database.LookupScenarios.findOne({where: {id: criteria.LookupScenarioId}}).then((LookupScenario)=>{
        criteria.name = LookupScenario.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaScenariosPromises);
  }).then((CriteriaScenariosPromise)=>{
    companyProfile.criteria.Scenarios = CriteriaScenariosPromise;
    return global.database.CriteriaSize.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaSizes)=>{
    const CriteriaSizesPromises = CriteriaSizes.map((Sizes, i) => {
      let criteria = Sizes.get();
      return global.database.LookupSize.findOne({where: {id: criteria.LookupSizeId}}).then((LookupSize)=>{
        criteria.name = LookupSize.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaSizesPromises);
  }).then((CriteriaSizesPromise)=>{
    companyProfile.criteria.Sizes = CriteriaSizesPromise;
    return global.database.CriteriaTypesOfCapital.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaTypesOfCapital)=>{
    const CriteriaTypesOfCapitalPromises = CriteriaTypesOfCapital.map((typesOfCapital, i) => {
      let criteria = typesOfCapital.get();
      return global.database.LookupTypesOfCapital.findOne({where: {id: criteria.LookupTypesOfCapitalId}}).then((LookupTypesOfCapital)=>{
        criteria.name = LookupTypesOfCapital.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaTypesOfCapitalPromises);
  }).then((CriteriaTypesOfCapitalPromise)=>{
    companyProfile.criteria.TypesOfCapital = CriteriaTypesOfCapitalPromise;
    return global.database.CriteriaExcludedIndustries.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaExcludedIndustries)=>{
    const CriteriaExcludedIndustriesPromises = CriteriaExcludedIndustries.map((industries, i) => {
      let criteria = industries.get();
      return global.database.LookupIndustries.findOne({where: {id: criteria.LookupIndustryId}}).then((LookupIndustries)=>{
        criteria.name = LookupIndustries.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaExcludedIndustriesPromises);
  }).then((CriteriaExcludedIndustriesPromise)=>{
    companyProfile.criteria.ExcludedIndustries = CriteriaExcludedIndustriesPromise;
    return global.database.CriteriaIndustries.findAll({where: {CompanyId: companyProfile.basicDetails.id}});
  }).then((CriteriaIndustries)=>{
    const CriteriaIndustriesPromises = CriteriaIndustries.map((industries, i) => {
      let criteria = industries.get();
      return global.database.LookupIndustries.findOne({where: {id: criteria.LookupIndustryId}}).then((LookupIndustries)=>{
        criteria.name = LookupIndustries.get().name;
        return criteria;
      });
    });
    return Promise.all(CriteriaIndustriesPromises);
  }).then((CriteriaIndustriesPromise)=>{
    companyProfile.criteria.Industries = CriteriaIndustriesPromise;
    if(companyProfile.basicDetails.UserId === req.user.get().id){
      companyProfile.isOwner = true;
    }
    companyProfile.user = req.user.get()
    delete companyProfile.user.password;
    return responseHandler(res, 'Success', companyProfile);
  }).catch((err)=>{
    console.log(err)
    const NewError = {
      type: 'Company',
      reason: 'Error getting Company',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting Company', err);
  });

}

export function createCompany(req, res){
  let companyData = JSON.parse(req.body.formData);
  let formattedData = DataFormatter.formatCompany(companyData)
  let CompanyId;
  CompanyHelper.saveCompany(req, formattedData).then((savedCompanyId)=>{
    return responseHandler(res, 'Success', savedCompanyId)
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Company',
      reason: 'Error Saving Company',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error Saving Company', err);
  })
}

export function searchCompany(req, res){
  const filterData = req.body;
  let searchPromisesArray = [];
  let foundCompanyIds = [];
  let filtersEmpty = true;
  Object.keys(filterData).forEach((filterSectionKey) => {
    let filterSection = filterData[filterSectionKey];
    if(filterSection.selected){
      if(filtersEmpty === true && filterSection.type !== 'multi-range'){
        filtersEmpty = false;
      }
      switch (filterSection.type) {
        case 'multi-select':
          filterSection.chosenOptions.forEach((option) => {
            let optionQuery = {where: {}};
            optionQuery.where[`${filterSection.lookupName}Id`] = option.value;
            searchPromisesArray.push(
              global.database[filterSection.databaseName].findAll(optionQuery).then((optionInstances)=>{
                let options = [];
                if(optionInstances.length !== 0){
                  options = optionInstances.map((option) => {
                    return option.get().CompanyId;
                  });
                }
                return foundCompanyIds.push(options);
              })
            );
          });
          break;
        case 'range':
          let range = filterSection;
          if(filterSection.selected){
            if(filterSection.max === 0){
              filterSection.max = 9999999999999;
            }
            const rangeQuery = {
              where: {
                $and: [
                  {min: {$gte: range.min}},
                  {max: {$lte: range.max}}
                ],
              },
            }
            rangeQuery.where[`${range.lookupName}Id`] = filterSection.id;
            searchPromisesArray.push(
              global.database[filterSection.databaseName].findAll(rangeQuery).then((rangeInstances)=>{
                let ranges = [];
                if(rangeInstances.length !== 0){
                  ranges = rangeInstances.map((range) => {
                    return range.get().CompanyId;
                  });
                }
                return foundCompanyIds.push(ranges);
              })
            );
          }
          break;
        case 'multi-range':
          Object.keys(filterSection.rangeSections).forEach((rangeKey) => {
            let range = filterSection.rangeSections[rangeKey];
            if(range.selected){
              if(filtersEmpty === true){
                filtersEmpty = false;
              }
              if(range.max === 0){
                range.max = 9999999999999;
              }
              const rangeQuery = {
                where: {
                  $and: [
                    {min: {$gte: range.min}},
                    {max: {$lte: range.max}}
                  ],
                },
              }
              rangeQuery.where[`${range.lookupName}Id`] = range.id;
              searchPromisesArray.push(
                global.database[range.databaseName].findAll(rangeQuery).then((rangeInstances)=>{
                  let ranges = [];
                  if(rangeInstances.length !== 0){
                    ranges = rangeInstances.map((range) => {
                      return range.get().CompanyId;
                    });
                  }
                  return foundCompanyIds.push(ranges);
                })
              );
            }
          });
          break;
      }
    }
  });
  Promise.all(searchPromisesArray).then((searchPromisesDone)=>{
    if(foundCompanyIds.length === 0 && !filtersEmpty){
      throw 'No results'
    }
    if(filtersEmpty){
      return global.database.Company.findAll()
    } else {
      return Promise.resolve('skip')
    }
  }).then((CompanyInstances)=>{
    let uniqueIds = [];
    if(CompanyInstances === 'skip'){
      uniqueIds = utils.getFilteredIds(foundCompanyIds);
    } else {
      uniqueIds = CompanyInstances.map((Company) => {
        return Company.get().id
      })
    }
    return SearchHelper.getCompanySearchDetails(uniqueIds)
  }).then((filteredCompanies)=>{
    return responseHandler(res, 'Success', filteredCompanies)
  }).catch((err)=>{
    if(err === 'No Results'){
      return responseHandler(res, 'Success', []);
    } else {
      const NewError = {
        type: 'Company',
        reason: 'Error during company search',
        details: JSON.stringify(err),
        UserId: req.user.get().id
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Error during company search', err)
    }
  });
}

export function editCompany(req, res){
  let companyData = JSON.parse(req.body.formData);
  let formattedData = DataFormatter.formatCompany(companyData)
  let CompanyId = companyData.submit_data.CompanyId;
  CompanyHelper.editCompany(req, formattedData, CompanyId).then((savedCompanyId)=>{
    return responseHandler(res, 'Success', savedCompanyId)
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Company',
      reason: `Error Editing Company with id ${CompanyId}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error Saving Company', err);
  })
}
