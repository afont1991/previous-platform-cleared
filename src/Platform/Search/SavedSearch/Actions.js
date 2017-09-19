import superagent from 'superagent'

export function deleteSearch(id){
  return function (dispatch) {
    dispatch({type: 'SAVE_SEARCH_UPDATE_STATUS', status: 'pending', results: []})
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/search/delete')
      .send({id: id})
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'SAVE_SEARCH_UPDATE_STATUS', status: 'pending', results: []})
        } else {
          dispatch({type: 'SAVE_SEARCH_RELOAD'})
        }
    });
  }
}


export function init(){
  return function (dispatch) {
    dispatch({type: 'SAVE_SEARCH_UPDATE_STATUS', status: 'pending'})
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/search/get')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'SAVE_SEARCH_UPDATE_STATUS', status: 'ready'})
        } else {
          dispatch({type: "SAVE_SEARCH_RESULTS", results: res.body.payload})
          dispatch({type: 'SAVE_SEARCH_UPDATE_STATUS', status: 'ready', results: res.body.payload})
        }
      });
      return 2
  }
}
