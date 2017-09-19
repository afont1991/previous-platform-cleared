
import * as NotificationHelper from './notificationHelper'
import isEmpty from 'is-empty'

export function findActiveLenderDeals(UserId, CompanyId){
  const DealMatchQuery = {
    where: {
      CompanyId: CompanyId,
      $and: [
        {borrower_status: {$ne: 'listed'}},
        {borrower_status: {$ne: 'do_not_contact'}},
      ]
    },
    include: {
      model: global.database.Deal
    }
  };
  return global.database.DealMatch.findAll(DealMatchQuery).then((DealMatchResponse)=>{
    const Matches = DealMatchResponse.map((DealMatch)=>{
      return {
        title: DealMatch.get().Deal.get().title,
        borrower_status: DealMatch.get().borrower_status,
        lender_status: DealMatch.get().lender_status,
        matchedOn: DealMatch.get().createdAt,
        dealId: DealMatch.get().DealId,
        companyId: DealMatch.get().CompanyId,
      }
    });
    return Matches;
  }).catch((err)=>{
    return {Error: err}
  })
}

export function findActiveBorrowerDeals(UserId, CompanyId){
  const DealQuery = {
    where: {
      ParentCompanyId: CompanyId,
    },
    include: {
      model: global.database.Company,
      as: 'Match',
    },
  };
  return global.database.Deal.findAll(DealQuery).then((DealResponse)=>{
    const DealMatches = DealResponse.map((Deal) => {
      return {
        DealId: Deal.id,
        matches: Deal.get().Match.length,
        title: Deal.title,
        status: Deal.status,
        created: Deal.createdAt,
        updated: Deal.updatedAt,
      }
    });
    return DealMatches;
  }).catch((err)=>{
    return {Error: err}
  })
}

export function DealEditNotifyMatches(DealId){
  let DealDetails;

  // Check Deal is active
  const DealQuery = {
    where: {
      platform_status: 'active',
      id: DealId,
    }
  }
  global.database.Deal.findOne(DealQuery).then((DealInstance)=>{
    if(!DealInstance) { throw 'Not active Deal'}
    DealDetails = DealInstance.toJSON()
    // If deal is active find all accepted matches and notify each user associated
    const DealMatchQuery = {
      where: {
        DealId: DealId,
        lender_status: 'accepted',
        borrower_status: 'accepted',
      },
      include: {
        model: global.database.Company
      }
    }
    return global.database.DealMatch.findAll(DealMatchQuery)
  }).then((MatchInstances)=>{
    MatchInstances.forEach((MatchInstance) => {
      let match = MatchInstance.toJSON()
      let newNotification = {
        type: 'deal',
        message: DealDetails.title,
        url: `/platform/deal/${DealId}`,
        UserId: match.Company.UserId
      }
      NotificationHelper.CreateNotification(newNotification)
    })
  }).catch((err)=>{
    const NewError = {
      type: 'Deal',
      reason: `Error creating Edit notifications for DealID: ${DealId}`,
      details: (typeof(err) === "object" ? JSON.stringify(err) : err),
    }
    return ErrorHandler.LogError(NewError)
  })
  // NotificationHelper.CreateNotification
}

// Handles type Deal Aggregates
export function HandleAggregates(formData, DealId){
  let mostRecentEbitda = null
  if(formData.financial_information_form.ebitda_year_3.value){
    mostRecentEbitda = parseFloat(formData.financial_information_form.ebitda_year_3.value)
  } else if(formData.financial_information_form.ebitda_ltm.value){
    mostRecentEbitda = parseFloat(formData.financial_information_form.ebitda_ltm.value)
  } else if(formData.financial_information_form.ebitda_year_2.value){
    mostRecentEbitda = parseFloat(formData.financial_information_form.ebitda_year_2.value)
  } else if(formData.financial_information_form.ebitda_year_1.value){
    mostRecentEbitda = parseFloat(formData.financial_information_form.ebitda_year_1.value)
  }
  let mostRecentRevenue = null
  if(formData.financial_information_form.revenue_year_3.value){
    mostRecentRevenue = parseFloat(formData.financial_information_form.revenue_year_3.value)
  } else if(formData.financial_information_form.revenue_ltm.value){
    mostRecentRevenue = parseFloat(formData.financial_information_form.revenue_ltm.value)
  } else if(formData.financial_information_form.revenue_year_2.value){
    mostRecentRevenue = parseFloat(formData.financial_information_form.revenue_year_2.value)
  } else if(formData.financial_information_form.revenue_year_1.value){
    mostRecentRevenue = parseFloat(formData.financial_information_form.revenue_year_1.value)
  }
  let DealTransactionTotal = 0;
  const newDealTypesOfCapital = formData.debt_type_amount_form.debtTypeAmountArray.filter((debtType) => { return (!debtType.deleted && !isEmpty(debtType.amount)) }).forEach((debtType) => {
    DealTransactionTotal += parseFloat(debtType.amount)
  })

  const aggregates = [
    {
      name: 'most recent ebitda',
      value: mostRecentEbitda,
      DealId: DealId
    },
    {
      name: 'most recent revenue',
      value: mostRecentRevenue,
      DealId: DealId
    },
    {
      name: 'Deal Transaction Total',
      value: DealTransactionTotal,
      DealId: DealId
    },
  ]

  global.database.Aggregate.bulkCreate(aggregates)
  .then((savedAggregate)=>{
    return savedAggregate
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Deal',
      reason: `Error aggregating deal info for id: ${DealId}`,
      details: (typeof(err) === "object" ? JSON.stringify(err) : err),
    }
    return ErrorHandler.LogError(NewError)
  })
}
