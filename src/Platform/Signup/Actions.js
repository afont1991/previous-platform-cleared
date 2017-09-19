import superagent from 'superagent'
import InputValidator from '../../Helpers/InputValidator'

export function onChange(input, path){
  return {
    type: 'SIGNUP_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function onSelect(option, path){
  return {
    type: 'SIGNUP_ON_SELECT',
    option: option,
    path: path,
  }
}

export function validateInput(validation, path){
  return {
    type: 'SIGNUP_INPUT_VALIDATION',
    validation: validation,
    path: path
  }
}


export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function submitSignup(formData){
  return function (dispatch) {
    let validationErrors = false;
    Object.keys(formData).forEach((inputKey) => {
      let input = formData[inputKey]
      let validationState;
      switch (input.type) {
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
    });
    if(!validationErrors){
      dispatch(apiDispatch('SIGNUP_SUBMIT', "pending"));
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .post(apiUrl + '/api/signup')
        .send({formData: formData})
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch(apiDispatch('SIGNUP_SUBMIT', "error", res));
          } else {
            dispatch(apiDispatch('SIGNUP_SUBMIT', "success", res));
          }
        });
    }
  }
}
