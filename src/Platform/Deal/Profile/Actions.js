import superagent from 'superagent'


export function changeProfileModeAction(mode){
  return {
    type: 'DEAL_PROFILE_MODE',
    mode: mode
  }
}

export function requestDealAction(status, response){
  return {
    type: 'REQUEST_DEAL_PROFILE',
    status: status,
    response: response
  }
}

export function fetchDealAction(DealId) {
  return function (dispatch) {
    dispatch(requestDealAction("pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/deal')
      .query({ DealId: DealId })
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(requestDealAction("error", res));
        } else {
          dispatch(requestDealAction("success", res));
        }
      });
  }
}

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function submitMatchRequest(matchInfo){
  return function (dispatch) {
    dispatch(apiDispatch('DEAL_PROFILE_MATCH_REQUEST', "pending"));
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
          dispatch(apiDispatch('DEAL_PROFILE_MATCH_REQUEST', "error", res));
        } else {
          dispatch(apiDispatch('DEAL_PROFILE_MATCH_REQUEST', "success", res));
          window.location.reload()
        }
      });
  }
}

export function submitUpdateMatchRequest(matchInfo){
  return function (dispatch) {
    dispatch(apiDispatch('DEAL_PROFILE_MATCH_REQUEST', "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    if(!matchInfo.newStatuses){
      matchInfo.newStatuses = [
        {name: "borrower_status", value: "pending"},
        {name: "lender_status", value: "requested"},
      ]
    }
    superagent
      .post(apiUrl + '/api/match/update')
      .set('Accept', 'application/json').withCredentials()
      .send(matchInfo)
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch('DEAL_PROFILE_MATCH_REQUEST', "error", res));
        } else {
          dispatch(apiDispatch('DEAL_PROFILE_MATCH_REQUEST', "success", res));
        }
        window.location.reload()
      });
  }
}
