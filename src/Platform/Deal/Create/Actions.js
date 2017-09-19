import superagent from 'superagent'
import InputValidator from '../../../Helpers/InputValidator'
import { browserHistory } from 'react-router'

export function onChange(input, path){
  return {
    type: 'DEAL_CREATE_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function unMount() {
  return {
    type: 'DEAL_CREATE_UNMOUNT',
  }
}

export function onSelect(option, path){
  return {
    type: 'DEAL_CREATE_ON_SELECT',
    option: option,
    path: path,
  }
}

export function handleDate(date, path){
  return {
    type: 'DEAL_CREATE_DATE_UPDATE',
    date: date,
    path: path,
  }
}

export function validateInput(validation, path){
  return {
    type: 'DEAL_CREATE_INPUT_VALIDATION',
    validation: validation,
    path: path
  }
}

export function removeTypeAmount(id){
  return {
    type: 'DEAL_CREATE_DELETE_TYPE_AMOUNT',
    id: id,
  }
}

export function onDrop(acceptedFiles, rejectedFiles, path){
  if(rejectedFiles.length === 0){
    return {
      type: 'DEAL_CREATE_ON_FILE_DROP',
      acceptedFiles: acceptedFiles,
      path: path,
    }
  }
}

export function removeFile(path){
  return {
    type: 'DEAL_CREATE_REMOVE_FILE',
    path: path
  }
}

// export function upload() {
//   return {
//     type: 'UPLOAD'
//   }
// }

export function addFaq(formData){
  return function(dispatch) {
    let validationErrors = false;
    Object.keys(formData).forEach((inputKey) => {
      let ignoreKeys = ['formRules', 'debtTypeAmountArray', 'type', 'transactionArray', 'faq_form', 'faqArray']
      if(!ignoreKeys.includes(inputKey)){
        let input = formData[inputKey]
        let validationState;
        switch (input.type) {
          case 'select':
            validationState = InputValidator(input.selectedOption, input.rules, input.type)
            break;
          default:
            validationState = InputValidator(input.value, input.rules)
        }
        dispatch(validateInput(validationState, ['formData', 'faq_form', inputKey, 'validation']));
        if(validationState.class === 'has-error'){
          validationErrors = true;
        }
      }
    });
    if(!validationErrors){
      dispatch({type: 'DEAL_CREATE_ADD_FAQ'})
    }
  }
}

export function removeFaq(id){
  return {
    type: 'DEAL_CREATE_DELETE_FAQ',
    id: id,
  }
}

export function addTypeAmount(formData){
  return function(dispatch) {
    let validationErrors = false;
    Object.keys(formData).forEach((inputKey) => {
      let ignoreKeys = ['formRules', 'debtTypeAmountArray', 'type', 'transactionArray', 'faq_form', 'faqArray']
      if(!ignoreKeys.includes(inputKey)){
        let input = formData[inputKey]
        let validationState;
        switch (input.type) {
          case 'select':
            validationState = InputValidator(input.selectedOption, input.rules, input.type)
            break;
          default:
            validationState = InputValidator(input.value, input.rules)
        }
        dispatch(validateInput(validationState, ['formData', 'debt_type_amount_form', inputKey, 'validation']));
        if(validationState.class === 'has-error'){
          validationErrors = true;
        }
      }
    });
    if(!validationErrors){
      dispatch({type: 'DEAL_CREATE_ADD_TYPE_AMOUNT'})
    }
  }
}

export function removeFinancials(id){
  return {
    type: 'DEAL_CREATE_DELETE_FINANCIAL',
    id: id,
  }
}

export function addFinancials(formData){
  return function(dispatch) {
    let validationErrors = false;
    Object.keys(formData).forEach((inputKey) => {
      let ignoreKeys = ['formRules', 'debtTypeAmountArray', 'type', 'transactionArray', 'financialsArray', 'faq_form', 'faqArray']
      if(!ignoreKeys.includes(inputKey)){
        let input = formData[inputKey]
        let validationState;
        switch (input.type) {
          case 'select':
            validationState = InputValidator(input.selectedOption, input.rules, input.type)
            break;
          default:
            validationState = InputValidator(input.value, input.rules)
        }
        dispatch(validateInput(validationState, ['formData', 'financial_information_form', inputKey, 'validation']));
        if(validationState.class === 'has-error'){
          validationErrors = true;
        }
      }
    });
    if(!validationErrors){
      dispatch({type: 'DEAL_CREATE_ADD_FINANCIAL'})
    }
  }
}

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function initialize(){
  return function (dispatch) {
    dispatch({type: 'DEAL_CREATE_STATUS', status: 'pending'})
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/epilogue/lookups/all')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'DEAL_CREATE_STATUS', status: 'error', error: res});
        } else {
          dispatch({type: 'DEAL_CREATE_LOOKUPS', response: res});
          superagent
            .get(apiUrl + '/api/team')
            .set('Accept', 'application/json').withCredentials()
            .end(function(err, res){
              if(err || res.body.status === 'Error'){
                dispatch({type: 'DEAL_CREATE_STATUS', status: 'error', error: res});
              } else {
                dispatch({type: 'DEAL_CREATE_REQUEST_TEAM', response: res});
                dispatch({type: 'DEAL_CREATE_STATUS', status: 'success'})
              }
            });
        }
      });
  }
}

export function submitDealCreate(formData){
  return function (dispatch) {
    dispatch({type: 'DEAL_CREATE_SET_STATUS', status: 'pending'})
    let validationErrors = false;
    Object.keys(formData).forEach((inputKey) => {
      let ignoreKeys = ['formRules', 'debt_type_amount_form', 'type', 'financial_information_form', 'faq_form', 'faqArray', 'documentSection']
      if(!ignoreKeys.includes(inputKey)){
        let input = formData[inputKey]
        let validationState;
        switch (input.type) {
          case 'multi_select':
          case 'select':
            validationState = InputValidator(input.selectedOption, input.rules, input.type)
            break;
          default:
            validationState = InputValidator(input.value, input.rules)
        }
        dispatch(validateInput(validationState, ['formData', inputKey, 'validation']));
        if(validationState.class === 'has-error'){
          validationErrors = true;
        }
      }
    });
    if(!validationErrors){
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }

      const teaser = formData.documentSection.teaser.file;
      const nda = formData.documentSection.nda.file;
      const cim = formData.documentSection.cim.file;

      delete formData.documentSection.teaser.file;
      delete formData.documentSection.nda.file;
      delete formData.documentSection.cim.file;

      superagent
        .post(apiUrl + '/api/deal/create')
        .field("formData",  JSON.stringify(formData))
        .attach('teaser', teaser )
        .attach('nda', nda )
        .attach('cim', cim )
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({type: 'DEAL_CREATE_STATUS', status: 'error', error: res});
          } else {
            browserHistory.push(`/platform/deal/${res.body.payload.DealId}`);
          }
        });
    } else {
      dispatch({type: 'DEAL_CREATE_SET_STATUS', status: 'ready'})
    }
  }
}
