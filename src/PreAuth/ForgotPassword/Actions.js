import superagent from 'superagent'
import InputValidator from '../../Helpers/InputValidator'

export function init(token){
  return {
    type: 'FORGOT_PASSWORD_INIT',
    token: token,
  }
}

export function unmount(){
  return {
    type: 'FORGOT_PASSWORD_UNMOUNT',
  }
}

export function submitNewPassword(form) {
  return function (dispatch) {
    // Refactor following code
    let allowedToProceed = true
    let validationState1 = InputValidator(form.rePassword_1.value, form.rePassword_1.rules)
    let validationState2 = InputValidator(form.rePassword_2.value, form.rePassword_2.rules)
    if(validationState1.class === 'has-error' || validationState2.class === 'has-error'){allowedToProceed = false}
    dispatch({
      type: 'FORM_INPUT_VALIDATION',
      path: ['formData', 'rePassword_1'],
      validationState: validationState1
    })
    dispatch({
      type: 'FORM_INPUT_VALIDATION',
      path: ['formData', 'rePassword_2'],
      validationState: validationState2
    })
    if(allowedToProceed === true){
      let matching = (form.rePassword_1.value === form.rePassword_2.value)
      dispatch({type: 'FORGOT_PASSWORD_MATCHED', match: matching});
      if(matching && form.token){
        let apiUrl = 'http://localhost:9000';
        if(process.env.NODE_ENV === 'production') {
          apiUrl = 'https://platform.debtmaven.com';
        }
        superagent
        .post(apiUrl + form.submit_url)
        .send(form)
        .end(function(err, res) {
          if(err || res.body.status === 'Error') {
            dispatch({type: 'FORGOT_PASSWORD_STATUS', status: 'error'})
          } else {
            dispatch({type: 'FORGOT_PASSWORD_STATUS', status: 'success'})
          }
        });
      }
    }
  }
}
