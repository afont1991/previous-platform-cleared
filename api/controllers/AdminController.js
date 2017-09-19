'use strict'
import responseHandler from '../helpers/responseHelper';
import * as ErrorHandler from '../helpers/errorHandler.js'
import * as EmailHelper from '../helpers/emailHelper.js'
import * as DatabaseHelper from '../helpers/DatabaseHelper.js'

import crypto from 'crypto'
import isEmpty from 'is-empty'
import csv from 'csv'
import us from 'us'
import jsesc from 'jsesc'

export function getCompanies(req, res){
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
  let platformStatus = 'inactive'
  if(!isEmpty(req.body.status)){
    platformStatus = req.body.status
  }
  let whereStatus = 'inactive'
  if(req.body.platformStatus && req.body.platformStatus.selected !== 'inactive'){
    whereStatus = {$ne: 'inactive'}
  }
  let CompaniesQuery = {
    where: {
      platform_status: whereStatus,
    },
    order: sortRules,
    limit: limitAmount,
    offset: offsetAmount,
    include: [{model: global.database.User}]
  }
  if(req.body.CompanyName && !isEmpty(req.body.CompanyName.value)){
    CompaniesQuery.where.name = {$iLike: `%${req.body.CompanyName.value}%`}
  }
  global.database.Company.findAll(CompaniesQuery).then((CompanyResults)=>{
    return responseHandler(res, 'Success', CompanyResults)
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Admin',
      reason: 'Error getting admin companies',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting admin companies', err);
  })
}

export function activateCompany(req, res){
  const updateCompany = {
    platform_status: 'active'
  }
  let updateFindCompany = {
    where: {
      id: req.body.id
    }
  }
  global.database.Company.update(updateCompany, updateFindCompany).then((CompanyResults)=>{
    const CompanyUserQuery = {
      where: {
        id: req.body.id
      },
      include: {
        model: global.database.User,
      }
    }
    return global.database.Company.findOne(CompanyUserQuery)
  }).then((CompanyUserInstance)=>{
    let recipients = {
      to: {
        email: CompanyUserInstance.toJSON().User.email,
        name: `${CompanyUserInstance.toJSON().User.first_name} ${CompanyUserInstance.toJSON().User.last_name}`,
      },
      from: {
        name: 'DebtMaven',
        email: 'admin@debtmaven.com',
      },
    }
    let message = {
      subject: "DebtMaven Access",
      text: `You account has been activated! Visit https://platform.debtmaven.com to sign in and get started.`
    }
    return EmailHelper.SendEmail(recipients, message)
  }).then((EmailResponse)=>{
    return responseHandler(res, 'Success', [])
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Admin',
      reason: `Error activating company with id: ${req.body.id}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', `Error activating company with id: ${req.body.id}`, err);
  })
}

export function updateDashboardContent(req, res){

}

export function updateIndustryNews(req, res){

}

function saveCompany(data){
  let newUser = {
    first_name: data.RawUser.first_name,
    last_name: data.RawUser.last_name,
    email: data.RawUser.email,
    password: data.RawUser.password,
  }
  global.database.User.findOne({where: {email: data.RawUser.email}}).then((ReplaceUserInstance) => {
    if(ReplaceUserInstance){
      return DatabaseHelper.removeUser(null, data.RawUser.email)
    } else {
      return Promise.resolve(null)
    }
  }).then((deletedUser) => {
    return global.database.Company.findOne({where: {name: data.RawCompany.name}})
  }).then((ReplaceCompanyInstance) => {
    if(ReplaceCompanyInstance){
      return DatabaseHelper.removeCompany(null, data.RawCompany.name)
    } else {
      return Promise.resolve(null)
    }
  }).then((deletedCompany) => {
    return global.database.User.create(newUser)
  }).then((createdUser) => {
    newUser.id = createdUser.get().id
    data.RawCompany.UserId = newUser.id
    return global.database.Company.create(data.RawCompany)
  }).then((createdCompany) => {
    data.RawCompany.id = createdCompany.get().id
    let newTeamMemember = {
      first_name: data.RawUser.first_name,
      last_name: data.RawUser.last_name,
      email: data.RawUser.email,
      title: data.RawUser.title,
      linkedin_url: data.RawUser.linkedin_url,
      CompanyId: data.RawCompany.id,
    }
    return global.database.Team.create(newTeamMemember)
  }).then((createdTeam) =>{
    return 'yay';
  }).catch((err)=>{
    return 'error'
  })
}

export function uploadCompanyProfiles(req, res){
  let financials, sizes, formattedCompanyInfo, CompanyId;
  global.database.LookupFinancials.findAll().then((financialInstances)=>{
    financials = financialInstances.map((fin)=>{
      return fin.get()
    })
    return global.database.LookupSize.findAll()
  }).then((sizeInstances)=>{
    sizes = sizeInstances.map((size)=>{
      return size.get()
    })
    let strData = req.files.list.data.toString()
    let strDelimiter = ",";
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    let arrData = [[]];
    let arrMatches = null;
    let strMatchedValue;
    while (arrMatches = objPattern.exec( strData )){
        let strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){
            arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    formattedCompanyInfo = arrData
    .filter((row, i)=>{
      if(i === 0){
        return false
      } else if(row[2] && row[2].toLowerCase().replace(/\s/g,'') === 'y'){
        return true
      } else {
        return false
      }
    }).map((row, i)=> {
      row = row.map((rowItem) => {
        return rowItem.trim()
      })
      function isSet(key){
        return key.toLowerCase().replace(/\s/g,'') === 'y'
      }

      function getValue(currentRow, col, wrapper){
        if(currentRow[col] !== ''  && !isEmpty(currentRow[col])){
          if(!wrapper){
            return currentRow[col]
          } else {
            return wrapper(currentRow[col])
          }
        } else {
          return null
        }
      }

      function getOperatingType(currentRow){
        let operatingTypes = []
        if(isSet(currentRow[11])){
          operatingTypes.push('ABL Lender')
        }
        if(isSet(currentRow[12])){
          operatingTypes.push('BDC')
        }
        if(isSet(currentRow[13])){
          operatingTypes.push('Cash-flow Lender')
        }
        if(isSet(currentRow[14])){
          operatingTypes.push('Commercial Bank')
        }
        if(isSet(currentRow[15])){
          operatingTypes.push('Family Office')
        }
        if(isSet(currentRow[16])){
          operatingTypes.push('Independent Sponsor')
        }
        if(isSet(currentRow[17])){
          operatingTypes.push('Junior Lender')
        }
        if(isSet(currentRow[18])){
          operatingTypes.push('Mezzanine')
        }
        if(isSet(currentRow[19])){
          operatingTypes.push('Private Company')
        }
        if(isSet(currentRow[20])){
          operatingTypes.push('Private Equity')
        }
        if(isSet(currentRow[21])){
          operatingTypes.push('SBIC')
        }
        if(isSet(currentRow[22])){
          operatingTypes.push('Search Fund')
        }
        if(isSet(currentRow[23])){
          operatingTypes.push('Senior Lender')
        }
        if(isSet(currentRow[24])){
          operatingTypes.push('Senior Lender')
        }
        if(isSet(currentRow[25])){
          operatingTypes.push('Venture Debt')
        }
        return operatingTypes.join(', ')
      }

      function getState(rowStateKey){
        if(rowStateKey !== ''  && !isEmpty(rowStateKey)){
          let companyState = null
          Object.keys(us.states).forEach((stateKey)=>{
            if(stateKey === rowStateKey){
              companyState = us.states[stateKey].name
            }
          })
          return companyState
        } else {
          return null
        }
      }

      function generatePassword(currentRow){
        return crypto.createHash('sha256').update(`123${currentRow[3].toLowerCase().replace(/\s/g,'')}`).digest('hex')
      }
      let RawCompany = {
        name: getValue(row, 4),
        operating_type: getOperatingType(row),
        platform_type: getValue(row, 10).toLowerCase(),
        description: getValue(row, 31),
        url: getValue(row, 26),
        logo_url: null,
        founding_year: getValue(row, 30, parseInt),
        state: getState(row[28]),
        city: getValue(row, 27),
        country: 'United States',
        platform_status: 'active',
        open_fund: getValue(row, 89),
        aum: getValue(row, 33, parseFloat),
        active_investments: getValue(row, 35, parseInt),
      }

      //Make both user and team memeber out of this
      let RawUser = {
        first_name: getValue(row, 5),
        last_name: getValue(row, 6),
        email: getValue(row, 8),
        password: generatePassword(row),
        title: getValue(row, 7),
        linkedin_url: getValue(row, 9),
      }
      return {RawCompany: RawCompany, RawUser: RawUser}
    })
    formattedCompanyInfo.forEach((company)=>{
      saveCompany(company)
    })
    return responseHandler(res, 'Success', formattedCompanyInfo);
  }).catch((err)=>{
    console.log(err)
    return responseHandler(res, 'Error', 'Error Saving Company via CSV', err);
  })
}

export function updatePlatformTypes(req, res){
  let userQuery = {
    where: {
      type: null,
    },
    include: [{ model: global.database.Company }],
  }
  global.database.User.findAll(userQuery).then((userInstances)=>{
    let UserUpdatePromises = []
    userInstances.forEach((user)=>{
      UserUpdatePromises.push(global.database.User.update({type: user.get().Company.get().platform_type}, {where: {id: user.get().id}}))
    })
    return Promise.all(UserUpdatePromises)
  }).then(()=>{
    return responseHandler(res, 'Success', []);
  }).catch((err)=>{
    console.log(err)
    return responseHandler(res, 'Error', 'Error updating users', err);
  })
}

export function deleteCompany(req, res){
  if(!req.body.id){
    const NewError = {
      type: 'Admin',
      reason: `Error deleting company with id: ${req.body.id}`,
      details: 'No id set',
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', `Error deleting company with id: ${req.body.id}`, 'No id set');
  }
  DatabaseHelper.removeCompany(req.body.id).then((DeletedCompany)=>{
    return responseHandler(res, 'Success', DeletedCompany)
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Admin',
      reason: `Error deleting company with id: ${req.body.id}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', `Error deleting company with id: ${req.body.id}`, err);
  })
}

export function deleteDeal(req, res){
  if(!req.body.id){
    const NewError = {
      type: 'Admin',
      reason: `Error deleting deal with id: ${req.body.id}`,
      details: 'No id set',
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', `Error deleting deal with id: ${req.body.id}`, 'No id set');
  }
  DatabaseHelper.removeDeal(req.body.id).then((DeletedDeal)=>{
    return responseHandler(res, 'Success', DeletedDeal)
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Admin',
      reason: `Error deleting deal with id: ${req.body.id}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', `Error deleting deal with id: ${req.body.id}`, err);
  })
}
