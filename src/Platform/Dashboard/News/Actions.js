import superagent from 'superagent'

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function getNewsItems() {
  return function (dispatch) {
    dispatch(apiDispatch("GET_NEWS_ITEMS", "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/news')
      .set('Accept', 'application/json').withCredentials()
      .withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch("GET_NEWS_ITEMS", "error", res));
        } else {
          dispatch(apiDispatch("GET_NEWS_ITEMS", "success", res));
        }
      });
  }
}
