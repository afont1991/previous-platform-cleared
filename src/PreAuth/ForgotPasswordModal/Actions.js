import superagent from 'superagent'
import InputValidator from '../../Helpers/InputValidator'

export function onChange(input, path){
  return {
    type: 'FORGOT_PASSWORD_MODAL_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function submitForgotRequest(email){
  return function (dispatch){
    let allowedToProceed = true
    let validation = InputValidator(email, ['required', 'email'])
    if(validation.class === 'has-error'){allowedToProceed = false}
    dispatch({
      type: 'FORGOT_PASSWORD_MODAL_INPUT_VALIDATION',
      path: ['formData', 'email'],
      validation: validation
    })
    if(allowedToProceed){
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production') {
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
      .get(apiUrl + '/auth/forgot')
      .query({email: email})
      .end(function(err, res) {
        console.log(err, res)
        if(err || res.body.status === 'Error') {
          dispatch({type: 'FORGOT_PASSWORD_MODAL_STATUS', status: 'error'})
        } else {
          dispatch({type: 'FORGOT_PASSWORD_MODAL_STATUS', status: 'success'})
        }
      });
    }
  }
}
