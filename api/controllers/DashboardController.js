'use strict'
import responseHandler from '../helpers/responseHelper';
import * as ErrorHandler from '../helpers/errorHandler.js'

export function init(req, res){
  let userInfo = req.user.get()
  delete userInfo.password;
  const LenderQuery = {
    where: {
      platform_type: 'lender',
      platform_status: 'active',
    }
  }
  const BorrowerQuery = {
    where: {
      platform_type: 'borrower',
      platform_status: 'active',
    }
  }
  const DealQuery = {
    where: {
      platform_status: 'active',
    }
  }
  global.database.Company.count(LenderQuery).then((lenderCount)=>{
    userInfo.lenderCount = lenderCount;
    return global.database.Company.count(BorrowerQuery)
  }).then((borrowerCount)=>{
    userInfo.borrowerCount = borrowerCount;
    return global.database.Deal.count(DealQuery)
  }).then((dealCount)=>{
    userInfo.dealCount = dealCount;
    return responseHandler(res, 'Success', userInfo);
  }).catch((err)=>{
    const NewError = {
      type: 'Dashboard',
      reason: `Error during dashboard init for ${req.user.get().id}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', err);
  })
}

export function updateIndustryNews(req, res){

}
