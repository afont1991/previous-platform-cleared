import superagent from 'superagent'

export function unMount() {
  return {
    type: 'COMPANY_CREATE_UNMOUNT',
  }
}

export function init(type = 'all') {
  return function (dispatch) {
    dispatch({type: 'COMPANY_CREATE_SET_STATUS', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/epilogue/lookups/' + type)
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'COMPANY_CREATE_SET_STATUS', status: 'error', response: res});
        } else {
          dispatch({type: 'COMPANY_CREATE_INIT_FORM', response: res});
          dispatch({type: 'COMPANY_CREATE_SET_STATUS', status: 'success'});
        }
      });
  }
}
