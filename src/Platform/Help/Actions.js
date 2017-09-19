import superagent from 'superagent'

export function readyToSubmit(status){
  return {
    type: 'HELP_FORM_READY_TO_SUBMIT',
    status: status,
  }
}

export function open(){
  return {
    type: 'HELP_FORM_TOGGLE_MODAL',
    showModal: true,
  }
}

export function close(){
  return {
    type: 'HELP_FORM_TOGGLE_MODAL',
    showModal: false,
  }
}

export function onChange(input, path){
  return {
    type: 'HELP_FORM_ON_CHANGE',
    path: path,
    input: input,
  }
}


export function submitForm(formData){
  return function (dispatch) {
    dispatch({type: 'HELP_FORM_STATUS', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/user/helpmessage')
      .send(formData)
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'HELP_FORM_STATUS', status: 'error', });
        } else {
          dispatch({type: 'HELP_FORM_STATUS', status: 'success'});
        }
      });
  }
}
