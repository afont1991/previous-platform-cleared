'use strict'
import * as SearchHelper from '../helpers/searchHelper.js'

import responseHandler from '../helpers/responseHelper';
import * as ErrorHandler from '../helpers/errorHandler.js'

export function getAllLookups(req, res){
    let lookups = {
      Characteristics: {},
      Financials: {},
      Industries: {},
      Scenarios: {},
      Size: {},
      TypesOfCapital: {},
    }
    const minMax = ['Financials', 'Size']
    let promiseArr = []
    global.database.LookupCharacteristics.findAll({order: [['name', 'ASC']]})
    .then((Characteristics)=>{
      lookups.Characteristics = Characteristics;
      return global.database.LookupFinancials.findAll({order: [['name', 'ASC']]})
    }).then((Financials)=>{
      lookups.Financials = Financials;
      return global.database.LookupIndustries.findAll({order: [['name', 'ASC']]})
    }).then((Industries)=>{
      lookups.Industries = Industries;
      return global.database.LookupScenarios.findAll({order: [['name', 'ASC']]})
    }).then((Scenarios)=>{
      lookups.Scenarios = Scenarios;
      return global.database.LookupSize.findAll({order: [['name', 'ASC']]})
    }).then((Sizes)=>{
      lookups.Size = Sizes;
      return global.database.LookupTypesOfCapital.findAll({order: [['name', 'ASC']]})
    }).then((TypesOfCapital)=> {
      lookups.TypesOfCapital = TypesOfCapital;
      if(req.query.search_name){
        let findSavedSearch = {
          where: {
            id: parseInt(req.query.search_name),
            UserId: req.user.get().id,
            type: req.query.type,
          }
        }
        return global.database.SavedSearch.findOne(findSavedSearch)
      } else {
        Promise.resolve('skip')
      }
    }).then((savedFilter) => {
      let payload = {
        lookups: lookups,
        results: [],
      }
      if(savedFilter !== 'skip' && savedFilter){
        payload.savedFilters = JSON.parse(savedFilter.get().filters)
      }
      if(req.user.get().admin === true){
        payload.isAdmin = true
      }
      return responseHandler(res, 'Success', payload, '');
    }).catch((err)=>{
      const NewError = {
        type: 'Lookups',
        reason: 'Error Getting Lookups',
        details: JSON.stringify(err),
        UserId: req.user.get().id
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Error Getting Lookups', err);
    });
}

export function newLookup(req, res){
  let lookupsTypes = {
    Characteristics: {table: 'LookupCharacteristics'},
    Financials: {table: 'LookupFinancials'},
    Industries: {table: 'LookupIndustries'},
    Scenarios: {table: 'LookupScenarios'},
    Size: {table: 'LookupSize'},
    TypesOfCapital: {table: 'LookupTypesOfCapital'},
  }
  global.database[lookupsTypes[req.body.name].table].create({name: req.body.value}).then((NewLookupInstance)=>{
    return responseHandler(res, 'Success', []);
  }).catch((err)=>{
    const NewError = {
      type: 'Lookups',
      reason: 'Error Creating Lookup Value: ${req.body.value}',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error Saving lookup', err);
  })
}

export function deleteLookups(req, res){
  let lookupsTypes = {
    Characteristics: {table: 'LookupCharacteristics'},
    Financials: {table: 'LookupFinancials'},
    Industries: {table: 'LookupIndustries'},
    Scenarios: {table: 'LookupScenarios'},
    Size: {table: 'LookupSize'},
    TypesOfCapital: {table: 'LookupTypesOfCapital'},
  }
  const LookupTable = lookupsTypes[req.body.type].table
  let DeleteLookupQuery = {
    where: {$or: []}
  }
  req.body.lookups.forEach((lookup) => {
    if(lookup.deleted === true){
      DeleteLookupQuery.where.$or.push({id: lookup.id})
    }
  })
  if(DeleteLookupQuery.where.$or === 0){
    return responseHandler(res, 'Success', []);
  } else {
    global.database[LookupTable].destroy(DeleteLookupQuery).then((deletedLookups)=>{
      return responseHandler(res, 'Success', []);
    }).catch((err)=>{
      const NewError = {
        type: 'Lookups',
        reason: 'Error Deleting Lookups',
        details: JSON.stringify(err),
        UserId: req.user.get().id
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Error Deleting lookups', err);
    })
  }
}
