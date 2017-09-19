import superagent from 'superagent'

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function getActiveDeals() {
  return function (dispatch) {
    dispatch(apiDispatch("DEAL_LIST_GET_ACTIVE", "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/deal/list/active')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch("DEAL_LIST_GET_ACTIVE", "error", res));
        } else {
          dispatch(apiDispatch("DEAL_LIST_GET_ACTIVE", "success", res));
        }
      });
  }
}

export function submitMatchUpdate(matchInfo){
  return function (dispatch) {
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/match/update')
      .set('Accept', 'application/json').withCredentials()
      .send(matchInfo)
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          console.log(err);
        }
        window.location.reload()
      });
  }
}
