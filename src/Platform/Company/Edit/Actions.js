import superagent from 'superagent'

export function unMount(){
  return {
    type: 'COMPANY_EDIT_UNMOUNT',
  }
}

export function init(CompanyId) {
  return function (dispatch) {
    dispatch({type: 'COMPANY_EDIT_SET_STATUS', status: 'pending'});
    dispatch({type: 'COMPANY_EDIT_SET_ID', id: CompanyId});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/epilogue/lookups/all')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'COMPANY_EDIT_SET_STATUS', status: 'error', response: res});
        } else {
          dispatch({type: 'COMPANY_EDIT_INIT_FORM', response: res});
          superagent
            .get(apiUrl + '/api/company')
            .query({ CompanyId: CompanyId })
            .set('Accept', 'application/json').withCredentials()
            .end(function(err, res){
              if(err || res.body.status === 'Error'){
                dispatch({type: 'COMPANY_EDIT_SET_STATUS', status: 'error', response: res})
              } else {
                dispatch({type: 'COMPANY_EDIT_REQUEST_PROFILE', response: res})
                dispatch({type: 'COMPANY_EDIT_SET_STATUS', status: 'ready'})
              }
            });
        }
      });
  }
}
