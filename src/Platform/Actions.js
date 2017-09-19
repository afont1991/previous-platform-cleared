import superagent from 'superagent'


export function toggleTerms(toggle){
  return {
    type: 'PLATFORM_TOGGLE_TERMS_MODAL',
    toggle: toggle,
  }
}

export function toggleInit(toggle){
  return {
    type: 'PLATFORM_TOGGLE_INIT_MODAL',
    toggle: toggle,
  }
}

export function clearNotifications(){
  return {
    type: 'CLEAR_PLATFORM_NOTIFICATIONS',
  }
}

export function unsetRefresh(){
  return {
    type: 'UNSET_REFRESH',
  }
}

export function setAlert(alertMessage){
  return {
    type: 'PLATFORM_SET_ALERT_MESSAGE',
    message: alertMessage,
  }
}

export function unsetAlert(alertMessage){
  return {
    type: 'PLATFORM_UNSET_ALERT_MESSAGE',
  }
}

export function onChange(input, path){
  return {
    type: 'PLATFORM_ONCHANGE',
    path: path,
    input: input,
  }
}

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}


export function agree(){
  return function (dispatch) {
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/user/signed_terms')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        dispatch(authCheck());
        dispatch(toggleTerms(false));
      });
  }
}

export function logout(){
  return function (dispatch) {
    dispatch(apiDispatch('LOGOUT', "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/auth/logout')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch('LOGOUT', "error", res));
        } else {
          dispatch(apiDispatch('LOGOUT', "success", res));
        }
      });
  }
}
export function authCheck(){
  return function (dispatch) {
    dispatch({type: 'AUTH_CHECK', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/authcheck')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'AUTH_CHECK', status: "error", authStatus: false});
        } else {
          dispatch({type: 'AUTH_CHECK', status: "success", authStatus: res.body});
        }
      });
  }
}
