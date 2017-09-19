

export function removeCompany(id, name){
  let companyQuery, CompanyId, whereIdQuery;
  if(id){
    companyQuery = {
      where: {id: id}
    }
  } else if(name){
    companyQuery = {
      where: {name: name}
    }
  } else {
    return Promise.resolve('ID or Name must be set')
  }
  return global.database.Company.findOne(companyQuery).then((CompanyInstance)=>{
    if(!CompanyInstance){ return Promise.resolve('No company found')}
    CompanyId = CompanyInstance.get().id
    whereIdQuery = {
      where: {
        CompanyId: CompanyId,
      },
    }
    const dealQuery = {
      where: {
        $or: [
          {CompanyId: CompanyId},
          {ParentCompanyId: CompanyId},
        ]
      }
    }
    return global.database.Deal.findAll(dealQuery)
  }).then((dealInstances)=>{
    let DeleteDealPromises = []
    dealInstances.forEach((dealInstance) => {
      DeleteDealPromises.push(removeDeal(dealInstance.get().id))
    });
    return Promise.all(DeleteDealPromises)
  }).then((deleteDeals)=>{
    return global.database.CriteriaCharacteristics.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaExcludedIndustries.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaFinancials.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaGeographies.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaIndustries.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaScenarios.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaSize.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.CriteriaTypesOfCapital.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.BorrowerTransaction.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.LenderTransaction.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Team.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Aggregate.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.DealMatch.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Financials.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.FinancialsRedux.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Message.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Company.destroy({where: {id: CompanyId}})
  }).catch((err)=>{
    console.log(err)
    return Promise.reject(err)
  })
}

export function removeDeal(id, name){
  let DealQuery, DealId, whereIdQuery;
  if(id){
    DealQuery = {
      where: {id: id}
    }
  } else if(name){
    DealQuery = {
      where: {title: name}
    }
  } else {
    return Promise.resolve('ID or Name must be set')
  }
  return global.database.Deal.findOne(DealQuery).then((DealInstance)=>{
    if(!DealInstance){return Promise.resolve('No deal found')}
    DealId = DealInstance.get().id
    whereIdQuery = {
      where: {
        DealId: DealId,
      },
    }
    return global.database.Aggregate.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.DealContact.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.DealIndustry.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.DealMatch.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.DealScenario.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.DealTypeOfCapital.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.FinancialsRedux.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Financials.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Faq.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Message.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Deal.destroy({where: {id: DealId}})
  }).catch((err)=>{
    console.log(err)
    return Promise.reject(err)
  })
}

export function removeUser(id, email){
  let userQuery, UserId, whereIdQuery;
  if(id){
    userQuery = {
      where: {id: id}
    }
  } else if(email){
    userQuery = {
      where: {email: email}
    }
  } else {
    return Promise.resolve('ID or email must be set')
  }
  global.database.User.findOne(userQuery).then((UserInstance)=>{
    if(!UserInstance){ return Promise.resolve('No user found')}
    UserId = UserInstance.get().id
    whereIdQuery = {
      where: {
        UserId: UserId,
      },
    }
    const companyQuery = {
      where: {UserId: UserId},
    }
    return global.database.Company.findAll(companyQuery)
  }).then((companyInstances)=>{
    let DeleteCompanyPromises = []
    companyInstances.forEach((companyInstance) => {
      DeleteCompanyPromises.push(removeCompany(companyInstance.get().id))
    });
    return Promise.all(DeleteCompanyPromises)
  }).then((deleteCompanys) => {
    return global.database.SupportRequest.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.Notifications.destroy(whereIdQuery)
  }).then(()=>{
    return global.database.User.destroy({where: {id: UserId}})
  }).catch((err)=>{
    console.log(err)
    return Promise.reject(err)
  })

}
