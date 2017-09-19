import superagent from 'superagent'

export function unmount(){
  return {
    type: 'NOTIFICATIONS_UNMOUNT',
  }
}

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function dismiss(NotiId, skipUpdate) {
  return function (dispatch) {
    if(!skipUpdate){dispatch({type: 'DISMISS_NOTIFICATION', NotiId: NotiId});}
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/notifications/dismiss')
      .send({NotiId: NotiId})
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        console.log('Notification dismissed');
      });
  }
}

export function getNotifications() {
  return function (dispatch) {
    dispatch(apiDispatch("GET_NOTIFICATIONS", "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/notifications/unread')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch("GET_NOTIFICATIONS", "error", res));
        } else {
          dispatch(apiDispatch("GET_NOTIFICATIONS", "success", res));
        }
      });
  }
}
