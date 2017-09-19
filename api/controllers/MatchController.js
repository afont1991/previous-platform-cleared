import responseHandler from '../helpers/responseHelper';
import Sequelize from 'sequelize';
import * as ErrorHandler from '../helpers/errorHandler.js'
import * as NotificationHelper from '../helpers/notificationHelper'

export function createMatch(req, res){
  let CompanyId, UserCompanyId, UserCompanyJson, DealJson;
  const DealId = req.body.DealId;
  req.user.getCompany().then((CompanyInstance)=>{
    if(CompanyInstance === null){ throw 'User has no company' }
    UserCompanyId = CompanyInstance.get().id
    UserCompanyJson = CompanyInstance.toJSON()
    if(req.user.get().type === 'lender'){
      CompanyId = UserCompanyId
    } else {
      CompanyId = req.body.CompanyId
    }
    const matchQeury = {
      where: {
        CompanyId: CompanyId,
        DealId: DealId,
      }
    };
    return global.database.DealMatch.findOne(matchQeury)
  }).then((MatchResult)=>{
    // They already have a match with this company so we ignore the request
    if(MatchResult){
      throw 'Already Matched'
    }
    // Checking if user owns deal
    let TheDealQuery = { where: { id: DealId}, include: {model: global.database.Company, as: 'ParentCompany'} }
    if(req.user.get().type === 'borrower'){
      TheDealQuery = { where: { id: DealId, ParentCompanyId: UserCompanyId }, include: {model: global.database.Company, as: 'ParentCompany'} }
    }
    return global.database.Deal.findOne(TheDealQuery)
  }).then((DealInstance)=>{
    if(DealInstance === null){ throw 'Not authorized owner of deal'}
    DealJson = DealInstance.toJSON()
    const CreateMatchQuery = {
      CompanyId: CompanyId,
      DealId: DealId,
    };
    if(req.user.get().type === 'lender'){
      CreateMatchQuery.lender_status = 'requested'
      CreateMatchQuery.borrower_status = 'pending'
    } else if(req.user.get().type === 'borrower'){
      CreateMatchQuery.borrower_status = 'listed'
      CreateMatchQuery.lender_status = 'listed'
    }
    return global.database.DealMatch.create(CreateMatchQuery);
  }).then((createMatchResult)=>{

    if(req.user.get().type === 'lender'){
      let newNotification = {
        type: 'new match',
        message: `${UserCompanyJson.name} - ${DealJson.title}`,
        url: `/platform/deal/manager/${DealJson.id}`,
        UserId: DealJson.ParentCompany.UserId
      }
      NotificationHelper.CreateNotification(newNotification)
    }
    return responseHandler(res, 'Success', []);
  }).catch((err)=>{
    console.log('ERROR', err);
    if(err === 'Already Matched'){
      return responseHandler(res, 'Success', []);
    } else {
      const NewError = {
        type: 'Match',
        reason: 'Already Matched',
        details: JSON.stringify(err),
        UserId: req.user.get().id
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Already Matched', err);
    }
  });
}

export function getDealMatchList(req, res){
  const DealId = req.query.DealId;
  const matchQuery = {
    where: {
      DealId: DealId,
      // status: {
      //   $ne: 'rejected',
      // }
    },
    include: [{model: global.database.Company}],
  }
  global.database.DealMatch.findAll(matchQuery).then((MatchResult)=>{
    const formattedMatches = MatchResult.map((matchInstance) => {
      let match = matchInstance.get();
      let company = match.Company.get();
      return {
        matchId: match.id,
        companyId: company.id,
        companyName: company.name,
        status: match.status,
        date: match.updatedAt,
      }
    });
    return responseHandler(res, 'Success', formattedMatches);
  }).catch((err)=> {
    const NewError = {
      type: 'Match',
      reason: 'Error getting deal match list',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting deal match list', err);
  })
}

export function getCounterPartyList(req, res){
  let formattedMatches = []
  let MatchMessagePromises = []
  const DealId = req.query.DealId
  const UserCompanyId = req.user.toJSON().Company.id;
  const DealQuery = {
    where: {
      ParentCompanyId: UserCompanyId,
    },
  }
  global.database.Deal.findOne(DealQuery).then((DealInstance) => {
    if(!DealInstance){
      throw 'Not Owner'
    }
    const counterPartyQuery = {
      where: {
        DealId: DealId,
      },
      include: [{model: global.database.Company}],
    }
    return global.database.DealMatch.findAll(counterPartyQuery)
  }).then((DealMatcheInstances) => {
    formattedMatches = DealMatcheInstances.map((MatchInstance) => {
      return MatchInstance.get();
    });
    return responseHandler(res, 'Success', {matches: formattedMatches});
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Match',
      reason: 'Error getting counterparty list',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting counterparty list', err);
  })
}

export function updateMatch(req, res) {
  // check if user is matched with this match id
  // check which type of update this (borrow_status,lender_status, update)
  // pass update
  let UserCompanyId, UserDealIds, UserCompanyJson, MatchDealJson, DealArrays, MatchCompanyJson;
  req.body.DealId = Number(req.body.DealId)
  req.body.CompanyId = Number(req.body.CompanyId)
  req.user.getCompany().then((CompanyInstance) => {
    UserCompanyId = CompanyInstance.get().id
    UserCompanyJson = CompanyInstance.toJSON()
    return global.database.Deal.findAll({where: {ParentCompanyId: UserCompanyId}})
  }).then((DealInstances) => {
    DealArrays = DealInstances
    return global.database.Deal.findOne({where: {id: req.body.DealId}, include: {model: global.database.Company, as: 'ParentCompany'}})
  }).then((MatchDealInstance) => {
    MatchDealJson = MatchDealInstance.toJSON()
    return global.database.Company.findOne({where: {id: req.body.CompanyId}})
  }).then((MatchCompanyInstance) => {
    MatchCompanyJson = MatchCompanyInstance.toJSON()
    UserDealIds = DealArrays.map((DealInstance) => {
      return DealInstance.get().id
    })
    if(UserDealIds.length !== 0 && req.user.type === 'borrower'){
      if(!UserDealIds.includes(req.body.DealId)){
        throw 'Not authorized to update this deal'
      }
    } else if(UserDealIds.length === 0 && req.user.type === 'borrower'){
      throw 'Not authorized to update this match'
    }
    if(req.user.type === 'lender' && UserCompanyId !== req.body.CompanyId){
      throw 'Not authorized to update this match'
    }
    let MatchQuery = {
      where: {
        DealId: req.body.DealId,
        CompanyId: req.body.CompanyId,
        lender_status: {
          $ne: 'rejected',
        },
      },
    }
    //
    let MatchUpdateQuery = {}
    req.body.newStatuses.forEach((status) => {
      MatchUpdateQuery[status.name] = status.value;
    })
    //
    if(req.user.get().type === 'lender'){
      MatchQuery.where.CompanyId = UserCompanyId;
      MatchQuery.where.$and = [
        {borrower_status: {$ne: 'rejected'}},
        {borrower_status: {$ne: 'do_not_contact'}},
      ]
    } else {
      MatchQuery.where.borrower_status = {
        $ne: 'rejected'
      }
    }
    return global.database.DealMatch.update(MatchUpdateQuery, MatchQuery)
  }).then((updatedMatchInstance) => {
    let newNotification = {}
    if(req.user.get().type === 'lender'){
      newNotification = {
        type: 'match updated',
        message: `${UserCompanyJson.name} - ${MatchDealJson.title}`,
        url: `/platform/deal/manager/${MatchDealJson.id}`,
        UserId: MatchDealJson.ParentCompany.UserId
      }
      if(req.body.newStatuses[0].value === 'accepted' || req.body.newStatuses[1].value === 'accepted'){
        newNotification.type = 'match accepted';
      }
      if(req.body.newStatuses[0].value === 'rejected' || req.body.newStatuses[1].value === 'rejected'){
        newNotification.type = 'match rejected';
      }
    }
    if(req.user.get().type === 'borrower'){
      newNotification = {
        type: 'match updated',
        message: `${MatchDealJson.title}`,
        url: `/platform/deal/manager/${MatchDealJson.id}`,
        UserId: MatchCompanyJson.UserId
      }
      if(req.body.newStatuses[0].value === 'invited' || req.body.newStatuses[1].value === 'invited'){
        newNotification.type = 'match invited'
        newNotification.url = `/platform/deal/${MatchDealJson.id}`
      } else if(req.body.newStatuses[0].value === 'rejected' || req.body.newStatuses[1].value === 'rejected'){
        newNotification.type = 'match rejected'
        newNotification.url = `/platform`
      } else if(req.body.newStatuses[0].value === 'accepted' || req.body.newStatuses[1].value === 'accepted'){
        newNotification.type = 'match accepted'
      }
    }
    NotificationHelper.CreateNotification(newNotification)
    return responseHandler(res, 'Success', updatedMatchInstance);
  }).catch((err)=>{
    const NewError = {
      type: 'Match',
      reason: `Error updating match for DealId: ${req.body.DealId} & CompanyId: ${req.body.CompanyId}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error updating match', err);
  })
}

export function initLenderManager(req, res) {
  const DealId = req.body.DealId
  let UserCompanyId;
  req.user.getCompany().then((CompanyInstance) => {
    UserCompanyId = CompanyInstance.get().id
    let matchQuery = {
      where: {
        DealId: DealId,
        CompanyId: UserCompanyId,
        borrower_status: 'accepted',
        lender_status: 'accepted',
      },
      include: [
        {
          model: global.database.Deal,
          include: [
            {model: global.database.Faq, required: false},
            {model: global.database.Company, as: 'ParentCompany'}
          ],
        }
      ],
    }
    return global.database.DealMatch.findOne(matchQuery)
  }).then((MatchInstance) => {
    if(!MatchInstance){
      throw 'Match not accepted'
    }
    return responseHandler(res, 'Success', MatchInstance);
  }).catch((err)=>{
    const NewError = {
      type: 'Match',
      reason: 'Error get match details',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error get match details', err);
  })
}

export function getMatchMessages(req, res){
  const DealId = Number(req.query.DealId);
  const CompanyId = Number(req.query.CompanyId);
  let UserCompany = req.user.toJSON().Company
  let DealJson;
  if(UserCompany.platform_type === 'lender' && UserCompany.id !== CompanyId){
    throw `Not authorized to see messages for DealId: ${DealId} && CompanyId ${CompanyId}`
  }
  let DealQuery = {
    where: {
      id: DealId,
    }
  }
  if(UserCompany.platform_type === 'borrower'){
    DealQuery.where.ParentCompanyId = UserCompany.id
  }
  global.database.Deal.findOne(DealQuery).then((DealInstance)=>{
    if(!DealInstance){ throw `Not authorized to see messages for DealId: ${DealId} && CompanyId ${CompanyId}` }
    DealJson = DealInstance.toJSON()
    let MessagesQuery = {
      where: {
        DealId: DealId,
        CompanyId: CompanyId,
      },
      order: [['createdAt', 'ASC']],
    }
    return global.database.Message.findAll(MessagesQuery)
  }).then((MessageInstances)=>{
    const messages = MessageInstances.map((message) => {
      return message.get()
    })
    return responseHandler(res, 'Success', messages);
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Match',
      reason: `Error: Getting messages for DealId: ${DealId}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error: Getting messages', err);
  });
}

export function sendMatchMessage(req, res){
  let DealTitle, recipientId;
  const UserCompanyId = req.user.toJSON().Company.id;
  const UserType = req.user.toJSON().Company.platform_type;
  let message = req.body;
  message.sender = UserType;
  let authorized = true;
  if(UserType !== 'borrower' && UserCompanyId !== message.CompanyId){
    authorized = false
  }
  let DealQuery = {
    where: {
      id: message.DealId,
      ParentCompanyId: UserCompanyId,
    },
    include: [
      {model: global.database.Company, as: 'Match'},
      {model: global.database.Company, as: 'ParentCompany'}
    ]
  }
  if(UserType !== 'borrower'){
    delete DealQuery.where.ParentCompanyId
  }
  global.database.Deal.findOne(DealQuery).then((DealInstance)=>{
    if(!DealInstance || authorized === false){ throw 'Not authorized to send message to deal'}
    DealTitle = DealInstance.get().title
    recipientId = DealInstance.get().title
    if(UserType !== 'borrower'){
      authorized = false
      recipientId = DealInstance.toJSON().ParentCompany.UserId
      DealInstance.toJSON().Match.forEach((match) => {
        if(match.id === UserCompanyId && match.DealMatch.borrower_status === 'accepted'){
          authorized = true
        }
      });
    }
    if(authorized === false){ throw 'Not authorized to send message to deal'}
    return global.database.Message.create(message)
  }).then((messageCreated)=>{
    if(UserType !== 'borrower'){
      return Promise.resolve('skip')
    } else {
      return global.database.Company.findOne({where: {id: message.CompanyId}})
    }
  }).then((recipientCompanyInstance)=>{
    if(recipientCompanyInstance !== 'skip'){
      recipientId = recipientCompanyInstance.get().UserId
    }
    let newNotification = {
      type: 'message',
      message: `from ${req.user.toJSON().Company.name} regarding ${DealTitle}`,
      url: `/platform/deal/manager/${message.DealId}`,
      UserId: recipientId,
    }
    NotificationHelper.CreateNotification(newNotification)
    return responseHandler(res, 'Success', []);
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Match',
      reason: `Error: Sending message for DealId: ${message.DealId}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error: sending message', err);
  });


}
