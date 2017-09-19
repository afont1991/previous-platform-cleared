import superagent from 'superagent'


export function init(){
  return function (dispatch) {
    dispatch({type: 'DASHBOARD_SAVED_SEARCH_INIT', status: 'pending', results: []})
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/search/get')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'DASHBOARD_SAVED_SEARCH_INIT', status: 'pending', results: []})
        } else {
          dispatch({type: 'DASHBOARD_SAVED_SEARCH_INIT', status: 'ready', results: res.body.payload})
        }
      });
  }
}
