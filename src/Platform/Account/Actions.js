import superagent from 'superagent'
import InputValidator from '../../Helpers/InputValidator'

export function unMount() {
  return {
    type: 'ACCOUNT_UNMOUNT'
  }
}

export function onChange(input, path) {
  return {
    type: 'ACCOUNT_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function validateInput(validation, path) {
  return {
    type: 'ACCOUNT_INPUT_VALIDATION',
    validation: validation,
    path: path
  }
}


export function apiDispatch(type, status, response) {
  return {
    type: type,
    status: status,
    response: response
  }
}

export function submitEmail(formData) {
  return function (dispatch) {
    let validationErrors = false;
    let input = formData.email
    const validationState = InputValidator(input.value, input.rules)
    dispatch(validateInput(validationState, ['formData', 'email', 'validation']));
    if(validationState.class === 'has-error'){
      validationErrors = true;
    }
    if(!validationErrors) {
      dispatch({ type: 'ACCOUNT_EMAIL_SUBMIT', status: "pending"});
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .post(apiUrl + '/api/account/edit')
        .send({email: formData.email.value})
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({ type: 'ACCOUNT_EMAIL_SUBMIT', status: "error", response: res});
          } else {
            dispatch({ type: 'ACCOUNT_EMAIL_SUBMIT', status:  "success", response: res});
            window.location.reload()
          }
        });
    }
  }
}

export function submitPassword(formData) {
  return function (dispatch) {
    let validationErrors = false;
    Object.keys(formData).forEach((inputKey) => {
      if(inputKey === 'password' || inputKey === 'password_test') {
        let input = formData[inputKey]
        let validationState = InputValidator(input.value, input.rules)
        dispatch(validateInput(validationState, ['formData', inputKey, 'validation']));
        if(validationState.class === 'has-error') {
          validationErrors = true;
        }
      }
    });
    if(!validationErrors && formData.password.value === formData.password_test.value) {
      dispatch({ type: 'ACCOUNT_PASSWORD_SUBMIT', status: "pending"});
      dispatch({type: 'PASSWORD_MATCH', status: 'true'})
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .post(apiUrl + '/api/account/edit')
        .send({password: formData})
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error') {
            dispatch({ type: 'ACCOUNT_PASSWORD_SUBMIT', status: "error", response: res});
          } else {
            dispatch({ type: 'ACCOUNT_PASSWORD_SUBMIT', status:  "success", response: res});
            window.location.reload()
          }
        });
    } else if(formData.password.value !== formData.password_test.value) {
      dispatch({type: 'PASSWORD_MATCH', status: 'false'})
    }
  }
}

export function init() {
  return function (dispatch) {
    dispatch({ type: 'ACCOUNT_INIT', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production') {
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/account')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error') {
          dispatch({ type: 'ACCOUNT_INIT', status: "error", response: res});
        } else {
          dispatch({ type: 'ACCOUNT_INIT', status:  "success", response: res});
        }
      });
  }
}
