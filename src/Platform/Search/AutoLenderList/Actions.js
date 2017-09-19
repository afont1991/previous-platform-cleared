import superagent from 'superagent'

export function init(DealId){
  return function (dispatch) {
    dispatch({type: 'AUTO_LENDER_LIST_INIT', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/search/autolenderlist')
      .query({DealId: DealId})
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'AUTO_LENDER_LIST_INIT', status: 'error', error: res});
        } else {
          dispatch({type: 'AUTO_LENDER_LIST_INIT', status: 'success', payload: res.body.payload});
        }
      });
  }
}

export function submitMatchRequest(matchInfo){
  return function (dispatch) {
    dispatch({type: 'AUTO_LENDER_LIST_MATCH_REQUEST', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/match/create')
      .set('Accept', 'application/json').withCredentials()
      .send(matchInfo)
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'AUTO_LENDER_LIST_MATCH_REQUEST', status: "error", error: res});
        } else {
          dispatch({type: 'AUTO_LENDER_LIST_MATCH_REQUEST', status: "success", response: res});
          window.location.reload()
        }
      });
  }
}
