import superagent from 'superagent'

export function init() {
  return function (dispatch) {
    dispatch({type: 'DEAL_MANAGER_INIT', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/userinfo')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'DEAL_MANAGER_INIT', status: "error", response: res});
        } else {
          dispatch({type: 'DEAL_MANAGER_INIT', status: "success", response: res});
        }
      });
  }
}
