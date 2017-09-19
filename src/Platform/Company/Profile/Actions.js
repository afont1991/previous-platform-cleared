import superagent from 'superagent'

export function unMount() {
  return {
    type: 'COMPANY_PROFILE_UNMOUNT',
  }
}

export function requestCompanyAction(status, response) {
  return {
    type: 'COMPANY_REQUEST_PROFILE',
    status: status,
    response: response
  }
}

export function fetchCompanyAction(CompanyId) {
  return function (dispatch) {
    dispatch(requestCompanyAction("pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/company')
      .query({ CompanyId: CompanyId })
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(requestCompanyAction("error", res));
        } else {
          dispatch(requestCompanyAction("success", res));
        }
      });
  }
}

export function onActiveDealSelect(selected){
  return {
    type: 'COMPANY_PROFILE_ACTIVE_DEAL_SELECT',
    selected: selected,
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
    dispatch(apiDispatch('COMPANY_PROFILE_MATCH_REQUEST', "pending"));
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
          dispatch(apiDispatch('COMPANY_PROFILE_MATCH_REQUEST', "error", res));
        } else {
          dispatch(apiDispatch('COMPANY_PROFILE_MATCH_REQUEST', "success", res));
          window.location.reload()
        }
      });
  }
}

export function fetchActiveDeals(CompanyId){
  return function (dispatch) {
    dispatch(apiDispatch('COMPANY_PROFILE_ACTIVE_DEAL_DROPDOWN', "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/deal/matchdropdown')
      .set('Accept', 'application/json').withCredentials()
      .query({CompanyId: CompanyId})
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch('COMPANY_PROFILE_ACTIVE_DEAL_DROPDOWN', "error", res));
        } else {
          dispatch(apiDispatch('COMPANY_PROFILE_ACTIVE_DEAL_DROPDOWN', "success", res));
        }
      });
  }
}

