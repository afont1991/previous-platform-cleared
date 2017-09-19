'use strict'
import responseHandler from '../helpers/responseHelper';
import {criteriaFormater, formatNumber} from '../helpers/valueFormatHelper.js';
import {dealFincialsQuery} from '../helpers/queryHelper.js'
import isEmpty from 'is-empty'
import * as utils from '../helpers/utilHelpers.js';
import * as SearchHelper from '../helpers/searchHelper.js'
import * as DealHelper from '../helpers/DealControllerHelper.js';
import * as ErrorHandler from '../helpers/errorHandler.js'
import * as AdminHelper from '../helpers/adminHelper.js'


function saveFinancials(financialForm, DealId){
  let newFinancial = {}
  Object.keys(financialForm).forEach((key) => {
    if(key !== 'formRules'){
      let value = financialForm[key].value
      newFinancial[key] = ((value === '' || value === null || value === undefined) ? null : parseFloat(value))
    }
  })
  newFinancial.DealId = DealId
  return global.database.FinancialsRedux.create(newFinancial)
}

export function getDeal(req, res){
  let companyDeal = {};
  let UserCompanyId;
  const DealId = req.query.DealId;
  req.user.getCompany().then((CompanyInstance) => {
    UserCompanyId = CompanyInstance.get().id
    companyDeal.userInfo = req.user.get()
    companyDeal.userInfo.CompanyId = UserCompanyId
    delete companyDeal.userInfo.password
    const findDealQuery = {
      where: {id: DealId},
      include: [
        {
          model: global.database.Company,
          as: 'ParentCompany'
        },{
          model: global.database.Company,
          as: 'Match',
        },{
          model: global.database.Faq,
        },
      ],
    };
    return global.database.Deal.findOne(findDealQuery)
  }).then((DealBasicDetails)=>{
    companyDeal.faq = DealBasicDetails.toJSON().Faqs
    companyDeal.basicDetails = DealBasicDetails.get();
    if(companyDeal.basicDetails.ParentCompanyId !== UserCompanyId){
      companyDeal.basicDetails.Match.forEach((match) => {
        if(match.get().id === UserCompanyId){
          companyDeal.IsMatched = true;
          companyDeal.MatchStatus = {
            borrower: match.get().DealMatch.get().borrower_status,
            lender: match.get().DealMatch.get().lender_status
          }
        }
      })
    } else {
      companyDeal.IsOwner = true;
    }
    const DealContactsQuery = {
      where: {DealId: DealId},
      include: [
        {model: global.database.Team}
      ]
    };
    return global.database.DealContact.findAll(DealContactsQuery)
  }).then((dealContacts)=>{
    companyDeal.keyContacts = [];
    if(dealContacts.length !== 0){
      dealContacts.forEach((contact) => {
        companyDeal.keyContacts.push(contact.get());
      });
    }
    const DealIdnustriesQuery = {
      where: {DealId: DealId},
      include: [
        {model: global.database.LookupIndustries}
      ]
    };
    return global.database.DealIndustry.findAll(DealIdnustriesQuery)
  }).then((DealIndustries)=>{
    companyDeal.industries = [];
    if(DealIndustries.length !== 0){
      DealIndustries.forEach((industry) => {
        companyDeal.industries.push(industry.get());
      });
    }
    const DealScenariosQuery = {
      where: {DealId: DealId},
      include: [
        {model: global.database.LookupScenarios}
      ]
    };
    return global.database.DealScenario.findAll(DealScenariosQuery)
  }).then((DealScenarios)=>{
    companyDeal.scenarios = [];
    if(DealScenarios.length !== 0){
      DealScenarios.forEach((scenario) => {
        companyDeal.scenarios.push(scenario.get());
      });
    }
    const DealTypesOfCapitalQuery = {
      where: {DealId: DealId},
      include: [
        {model: global.database.LookupTypesOfCapital}
      ]
    };
    return global.database.DealTypeOfCapital.findAll(DealTypesOfCapitalQuery)
  }).then((DealTypesOfCapital)=>{
    companyDeal.typesOfCapital = [];
    if(DealTypesOfCapital.length !== 0){
      DealTypesOfCapital.forEach((typeOfCapital) => {
        companyDeal.typesOfCapital.push(typeOfCapital.get());
      });
    }
    const DealFinancialsQuery = {where: {DealId: DealId}};
    return global.database.FinancialsRedux.findOne(DealFinancialsQuery)
  }).then((DealFinancials)=>{
    companyDeal.financials = null;
    if(DealFinancials){
      companyDeal.financials = DealFinancials.toJSON();
    }
    if(companyDeal.basicDetails.blind_sponsor){
      delete companyDeal.basicDetails.ParentCompany
    }
    return responseHandler(res, 'Success', companyDeal);
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Deal',
      reason: 'Error getting deal',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error getting deal', err);
  });
}

export function createDeal(req, res){
  req.body.formData = JSON.parse(req.body.formData)
  let DealId, CompanyId;
  const formData = req.body.formData;
  req.user.getCompany().then((CompanyInstance)=> {
    CompanyId = CompanyInstance.get().id
    let private_mode = false
    if(formData.private_mode.selectedOption.value === 'Private'){
      private_mode = true
    }
    let blind_sponsor = false
    if(formData.blind_sponsor.selectedOption.value === 'Yes'){
      blind_sponsor = true
    }
    let sponsored = true
    if(formData.sponsored.selectedOption.value === 'non-sponsored'){
      sponsored = false
    }
    let dealBasicDetails = {
      ParentCompanyId: CompanyId,
      platform_status: 'active',
      private: private_mode,
      sponsored: sponsored,
      blind_sponsor: blind_sponsor,
      title: (formData.title.value ? formData.title.value : null),
      headline: (formData.headline.value ? formData.headline.value : null),
      founded: (formData.founded.value ? parseInt(formData.founded.value) : null),
      region: (formData.region.selectedOption ? formData.region.selectedOption.value : null),
      financial_review_level: (formData.financial_review_level.selectedOption ? formData.financial_review_level.selectedOption.value : null),
      description: (formData.description.value ? formData.description.value : null),
      status: (formData.status.selectedOption ? formData.status.selectedOption.value : null),
      additional_information: (formData.additional_information.value ? formData.additional_information.value : null),
    }
    if(formData.termsheet_date.value){
      dealBasicDetails.termsheet_date = formData.termsheet_date.value
    }
    Object.keys(dealBasicDetails).forEach((key) => {
      if(dealBasicDetails[key] === ''){
        dealBasicDetails[key] = null
      }
    });
    return global.database.Deal.create(dealBasicDetails)
  }).then((savedDeal) => {
    DealId = savedDeal.get().id;
    Aggregates.DealId = DealId
    const dealContacts = req.body.formData.contacts.selectedOption.filter((contact) => { return !contact.deleted }).map((contact) => {
      return {
        TeamId: contact.value,
        DealId: DealId,
      }
    })
    return global.database.DealContact.bulkCreate(dealContacts)
  }).then((savedContacts) => {
    const DealFaqs = req.body.formData.faq_form.faqArray.filter((faq) => { return !faq.deleted }).map((faq) => {
      return {
        question: faq.question,
        answer: faq.answer,
        DealId: DealId,
        status: 'show'
      }
    })
    return global.database.Faq.bulkCreate(DealFaqs)
  }).then((savedFaqs) => {
    const newDealScenario = {
      DealId: DealId,
      LookupScenarioId: formData.transaction_scenario.selectedOption.value
    }
    return global.database.DealScenario.create(newDealScenario)
  }).then((savedScenario)=>{
    const newDealIndustries = formData.industries.selectedOption.map((industry) => {
      return {
        DealId: DealId,
        LookupIndustryId: industry.value,
      }
    })
    return global.database.DealIndustry.bulkCreate(newDealIndustries)
  }).then((savedIndustries)=>{
    const newDealTypesOfCapital = formData.debt_type_amount_form.debtTypeAmountArray.filter((debtType) => { return (!debtType.deleted && !isEmpty(debtType.amount)) }).map((debtType) => {
      return {
        DealId: DealId,
        amount: parseFloat(debtType.amount),
        LookupTypesOfCapitalId: debtType.debt_type.value,
      }
    })
    return global.database.DealTypeOfCapital.bulkCreate(newDealTypesOfCapital)
  }).then((savedTypeOfCapital)=>{
    return saveFinancials(formData.financial_information_form, DealId)
  }).then((savedFinancials) => {
    if(!req.files || !req.files.teaser){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-deal-documents',
      Key: `teaser-${formData.title.value.replace(/\s/g,'')}-${DealId}`,
      Body: req.files.teaser.data,
      ContentType: req.files.teaser.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((teaserS3Response) => {
    if(!req.files || !req.files.nda){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-deal-documents',
      Key: `nda-${formData.title.value.replace(/\s/g,'')}-${DealId}`,
      Body: req.files.nda.data,
      ContentType: req.files.nda.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((cimS3Response) => {
    if(!req.files || !req.files.cim){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-deal-documents',
      Key: `cim-${formData.title.value.replace(/\s/g,'')}-${DealId}`,
      Body: req.files.cim.data,
      ContentType: req.files.cim.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((ndaS3Response) => {
    if(!req.files){
      return Promise.resolve('skip')
    }
    let updateDeal = {
      teaser: (req.files.teaser ? true : false),
      nda: (req.files.nda ? true : false),
      cim: (req.files.cim ? true : false),
    }
    let dealQuery = {
      where: {
        id: DealId
      }
    }
    return global.database.Deal.update(updateDeal, dealQuery)
  }).then((updatedDealFileResponse) => {
    AdminHelper.NewDeal(formData.title.value, req.user)
    DealHelper.HandleAggregates(formData, DealId)
    return responseHandler(res, 'Success', {DealId: DealId});
  }).catch((err)=>{
    console.log(err)
    const NewError = {
      type: 'Deal',
      reason: 'Error Creating Deal',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error Creating Deal', err);
  });
}

export function getActiveDealList(req, res){
  let getActiveDealPromise = [];
  let CompanyId;
  const UserId = req.user.get().id;
  const UserType = req.user.get().type;
  let userInfo = req.user.get()
  delete userInfo.password
  req.user.getCompany().then((CompanyInstance)=> {
    CompanyId = CompanyInstance.get().id
    if(UserType === 'lender'){
      getActiveDealPromise.push(DealHelper.findActiveLenderDeals(UserId, CompanyId));
    } else {
      getActiveDealPromise.push(DealHelper.findActiveBorrowerDeals(UserId, CompanyId));
    }
    return Promise.all(getActiveDealPromise)
  }).then((activeDeals)=>{
    if(activeDeals.Error){
      throw activeDeals.Error
    } else {
      return responseHandler(res, 'Success', {activeDeals: activeDeals[0], userInfo: userInfo});
    }
  }).catch((err)=>{
    if(err === 'Success'){
      return responseHandler(res, 'Success', {activeDeals: activeDeals[0], userInfo: userInfo});
    } else {
      const NewError = {
        type: 'Deal',
        reason: 'Error getting active deal list',
        details: JSON.stringify(err),
        UserId: req.user.get().id
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Error getting deal list', err);
    }
  })
}

export function getMatchDropdown(req, res){
  let UserCompanyId;
  req.user.getCompany().then((CompanyInstance) => {
    UserCompanyId = CompanyInstance.get().id
    const FindActiveDealQuery = {
      where: {
        ParentCompanyId: UserCompanyId,
        platform_status: 'active',
      },
      include: [
        {model: global.database.Company, as: 'Match'}
      ]
    }
    return global.database.Deal.findAll(FindActiveDealQuery)
  }).then((activeDealInstances)=>{
    if(!activeDealInstances){
      throw 'No Active Deals found';
    }
    const activeDealsData = activeDealInstances.map((deal) => {
      let activeDeal = {label: deal.get().title, value: deal.get().id}
      deal.get().Match.forEach((match) => {
        if(match.get().id == req.query.CompanyId){
          activeDeal.IsMatched = true;
        }
      });
      return activeDeal
    }).filter((activeDeal) => {
      if(activeDeal.IsMatched){
        return false
      } else {
        return true;
      }
    });
    return responseHandler(res, 'Success', activeDealsData);
  }).catch((err)=>{
    if(err === 'No Active Deals found'){
      return responseHandler(res, 'Success', []);
    } else {
      const NewError = {
        type: 'Deal',
        reason: 'Error getting deal match dropdown',
        details: JSON.stringify(err),
        UserId: req.user.get().id
      }
      ErrorHandler.LogError(NewError)
      return responseHandler(res, 'Error', 'Error getting deal match dropdown', err);
    }
  })
}

export function getFilters(req, res){
  return responseHandler(res, 'Success', []);
}

export function editDeal(req, res){
  req.body.formData = JSON.parse(req.body.formData)
  let CompanyId
  const formData = req.body.formData
  const DealId = formData.DealId
  let Aggregates = {
    type: 'Deal',
    DealId: DealId
  }
  req.user.getCompany().then((CompanyInstance)=> {
    CompanyId = CompanyInstance.get().id
    let private_mode = false
    if(formData.private_mode.selectedOption.value === 'Private'){
      private_mode = true
    }
    let blind_sponsor = false
    if(formData.blind_sponsor.selectedOption.value === 'Yes'){
      blind_sponsor = true
    }
    let sponsored = true
    if(formData.sponsored.selectedOption.value === 'non-sponsored'){
      sponsored = false
    }
    let dealBasicDetails = {
      platform_status: 'active',
      private: private_mode,
      blind_sponsor: blind_sponsor,
      sponsored: sponsored,
      title: (formData.title.value ? formData.title.value : null),
      headline: (formData.headline.value ? formData.headline.value : null),
      founded: (formData.founded.value ? parseInt(formData.founded.value) : null),
      region: (formData.region.selectedOption ? formData.region.selectedOption.value : null),
      financial_review_level: (formData.financial_review_level.selectedOption ? formData.financial_review_level.selectedOption.value : null),
      description: (formData.description.value ? formData.description.value : null),
      status: (formData.status.selectedOption ? formData.status.selectedOption.value : null),
      additional_information: (formData.additional_information.value ? formData.additional_information.value : null),
    }
    if(formData.termsheet_date.value){
      dealBasicDetails.termsheet_date = formData.termsheet_date.value
    }
    let DealUpdateWhere = {
      id: DealId
    }
    if(req.user.get().admin !== true){
      DealUpdateWhere.ParentCompanyId = CompanyId
    }
    Object.keys(dealBasicDetails).forEach((key) => {
      if(dealBasicDetails[key] === ''){
        dealBasicDetails[key] = null
      }
    });
    return global.database.Deal.update(dealBasicDetails, {where: DealUpdateWhere})
  }).then((updatedDeal) => {
    if(updatedDeal[0] == 0){ throw 'Not Deal owner' }
    return global.database.DealContact.destroy({where: {DealId: DealId}})
  }).then((deletedContacts) => {
    return global.database.Aggregate.destroy({where: {DealId: DealId}})
  }).then((deletedAggregates) => {
    const dealContacts = formData.contacts.selectedOption.filter((contact) => {
      return !contact.deleted
    }).map((contact) => {
      return {
        TeamId: contact.value,
        DealId: DealId,
      }
    })
    return global.database.DealContact.bulkCreate(dealContacts)
  }).then((savedContacts) => {
    return global.database.Faq.destroy({where: {DealId: DealId}})
  }).then((deletedFaqs) => {
    const DealFaqs = req.body.formData.faq_form.faqArray.filter((faq) => { return !faq.deleted }).map((faq) => {
      return {
        question: faq.question,
        answer: faq.answer,
        DealId: DealId,
        status: 'show'
      }
    })
    return global.database.Faq.bulkCreate(DealFaqs)
  }).then((savedFaqs) => {
    return global.database.DealScenario.destroy({where: {DealId: DealId}})
  }).then((deletedScenarios) => {
    const newDealScenario = {
      DealId: DealId,
      LookupScenarioId: formData.transaction_scenario.selectedOption.value
    }
    return global.database.DealScenario.create(newDealScenario)
  }).then((savedScenario)=>{
    return global.database.DealIndustry.destroy({where: {DealId: DealId}})
  }).then((deletedIndustries) => {
    const newDealIndustries = formData.industries.selectedOption.map((industry) => {
      return {
        DealId: DealId,
        LookupIndustryId: industry.value,
      }
    })
    return global.database.DealIndustry.bulkCreate(newDealIndustries)
  }).then((savedIndustries)=>{
    return global.database.DealTypeOfCapital.destroy({where: {DealId: DealId}})
  }).then((deletedTypes) => {
    const newDealTypesOfCapital = formData.debt_type_amount_form.debtTypeAmountArray.filter((debtType) => { return (!debtType.deleted && !isEmpty(debtType.amount)) }).map((debtType) => {
      return {
        DealId: DealId,
        amount: parseFloat(debtType.amount),
        LookupTypesOfCapitalId: debtType.debt_type.value,
      }
    })
    return global.database.DealTypeOfCapital.bulkCreate(newDealTypesOfCapital)
  }).then((savedTypeOfCapital)=>{
    return global.database.FinancialsRedux.destroy({where: {DealId: DealId}})
  }).then((deletedFinancials) => {
    return saveFinancials(formData.financial_information_form, DealId)
  }).then((savedFinancials) => {
    if(!req.files || !req.files.teaser || !req.files.teaser.data){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-deal-documents',
      Key: `teaser-${formData.title.value.replace(/\s/g,'')}-${DealId}`,
      Body: req.files.teaser.data,
      ContentType: req.files.teaser.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((teaserS3Response) => {
    if(!req.files || !req.files.nda || !req.files.nda.data){
      return Promise.resolve('skip');
    }
    const S3Params = {
      Bucket: 'debt-maven-deal-documents',
      Key: `nda-${formData.title.value.replace(/\s/g,'')}-${DealId}`,
      Body: req.files.nda.data,
      ContentType: req.files.nda.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((cimS3Response) => {
    if(!req.files || !req.files.cim || !req.files.cim.data){
      return Promise.resolve('skip');
    }
    console.log(req.files );
    const S3Params = {
      Bucket: 'debt-maven-deal-documents',
      Key: `cim-${formData.title.value.replace(/\s/g,'')}-${DealId}`,
      Body: req.files.cim.data,
      ContentType: req.files.cim.mimetype
    }
    return global.S3.putObject(S3Params).promise()
  }).then((ndaS3Response) => {
    let updateDeal = {
      teaser: ((req.files && req.files.teaser || formData.documentSection.teaser.uploaded) ? true : false),
      nda: ((req.files && req.files.nda || formData.documentSection.nda.uploaded) ? true : false),
      cim: ((req.files && req.files.cim || formData.documentSection.cim.uploaded) ? true : false),
    }
    let dealQuery = {
      where: {
        id: DealId
      }
    }
    return global.database.Deal.update(updateDeal, dealQuery)
  }).then((updatedDealFileResponse) => {
    DealHelper.DealEditNotifyMatches(DealId)
    DealHelper.HandleAggregates(formData, DealId)
    return responseHandler(res, 'Success', {DealId: DealId})
  }).catch((err)=>{
    console.log(err);
    const NewError = {
      type: 'Deal',
      reason: `Error editing Deal with id ${DealId}`,
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error editing Deal', err);
  });
}
