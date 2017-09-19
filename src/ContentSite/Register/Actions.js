import superagent from 'superagent'
import InputValidator from '../../Helpers/InputValidator'

export function onChange(input, path){
  return {
    type: 'HOMEPAGE_REGISTER_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function onSelect(option, path){
  return {
    type: 'HOMEPAGE_REGISTER_ON_SELECT',
    option: option,
    path: path,
  }
}

export function validateInput(validation, path){
  return {
    type: 'HOMEPAGE_REGISTER_INPUT_VALIDATION',
    validation: validation,
    path: path
  }
}

export function onDrop(acceptedFiles, rejectedFiles){
  return {
    type: 'HOMEPAGE_REGISTER_FILE_DROP',
    acceptedFiles: acceptedFiles,
    rejectedFiles: rejectedFiles,
  }
}

export function toggleModal(toggle){
  return function (dispatch) {
    dispatch({type: 'HOMEPAGE_REGISTER_CHECK_EMAIL', status: false})
    dispatch({type: 'HOMEPAGE_REGISTER_TOGGLE_MODAL', toggle: toggle,})
  }
}

export function checkEmail(input){
  return function (dispatch) {
    dispatch({type: 'HOMEPAGE_REGISTER_CHECK_EMAIL', status: false})
    let validationState = InputValidator(input.target.value, ['required', 'email'])
    if(validationState.class !== 'has-error'){
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .get(apiUrl + '/api/user/checkemail')
        .query({email: input.target.value})
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({type: 'HOMEPAGE_REGISTER_SUBMIT', status: 'error'})
          } else {
            dispatch({type: 'HOMEPAGE_REGISTER_CHECK_EMAIL', status: res.body.payload})
          }
        });
    }
  }
}

export function submitForm(formData){
  return function (dispatch) {
    let validationErrors = false;
    Object.keys(formData).forEach((sectionName) => {
      let currentSection = formData[sectionName]
      Object.keys(currentSection).forEach((inputKey) => {
        let ignoreKeys = ['formRules', 'debt_type_amount_form', 'type', 'financial_information_form', 'faq_form', 'faqArray']
        if(!ignoreKeys.includes(inputKey)){
          let input = currentSection[inputKey]
          let validationState;
          switch (input.type) {
            case 'multi_select':
            case 'select':
              validationState = InputValidator(input.selectedOption, input.rules, input.type)
              break;
            default:
              validationState = InputValidator(input.value, input.rules)
          }
          dispatch(validateInput(validationState, ['formData', sectionName, inputKey, 'validation']));
          if(validationState.class === 'has-error'){
            validationErrors = true;
          }
        }
      });
    });
    if(!validationErrors && formData.newUser.password.value === formData.newUser.password_test.value){
      dispatch({type: 'HOMEPAGE_REGISTER_SUBMIT', status: 'pending'})
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      const logoFile = formData.company_overview.company_logo.file;
      delete formData.company_overview.company_logo.file;
      superagent
        .post(apiUrl + '/api/user/register')
        .field("formData",  JSON.stringify(formData))
        .attach('logo', logoFile )
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({type: 'HOMEPAGE_REGISTER_SUBMIT', status: 'error'})
          } else {
            if(res.body.payload === 'duplicate'){
              dispatch({type: 'HOMEPAGE_REGISTER_SUBMIT', status: 'ready'})
              dispatch({type: 'HOMEPAGE_REGISTER_CHECK_EMAIL', status: true})
            } else {
              dispatch({type: 'HOMEPAGE_REGISTER_SUBMIT', status: 'registered'})
            }
          }
        });
    } else {
      dispatch({type: 'HOMEPAGE_REGISTER_CHECK_EMAIL', status: false})
      let validationState = InputValidator(formData.newUser.email.value, ['required', 'email'])
      if(validationState.class !== 'has-error'){
        let apiUrl = 'http://localhost:9000';
        if(process.env.NODE_ENV === 'production'){
          apiUrl = 'https://platform.debtmaven.com';
        }
        superagent
          .get(apiUrl + '/api/user/checkemail')
          .query({email: formData.newUser.email.value})
          .set('Accept', 'application/json').withCredentials()
          .end(function(err, res){
            if(err || res.body.status === 'Error'){
              dispatch({type: 'HOMEPAGE_REGISTER_SUBMIT', status: 'error'})
            } else {
              if(formData.newUser.password.value !== formData.newUser.password_test.value){
                dispatch({type: 'HOMEPAGE_REGISTER_PASSWORD_MATCH', status: false})
              } else {
                dispatch({type: 'HOMEPAGE_REGISTER_PASSWORD_MATCH', status: true})
              }
              dispatch({type: 'HOMEPAGE_REGISTER_CHECK_EMAIL', status: res.body.payload})
            }
          });
      }
    }
  }
}
