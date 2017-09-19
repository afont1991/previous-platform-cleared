import superagent from 'superagent'

export function init(reset){
  return function (dispatch) {
    if(reset){
      dispatch({type: 'HOMEPAGE_INIT', status:  "pending", loggedIn: false})
    } else {
      dispatch({ type: 'HOMEPAGE_INIT', status: "pending"});
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .get(apiUrl + '/api/authcheck')
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({ type: 'HOMEPAGE_INIT', status: "ready"});
          } else {
            dispatch({ type: 'HOMEPAGE_INIT', status:  "success", loggedIn: res.body.auth});
          }
        });
    }
  }
}

export function logout(){
  return function (dispatch) {
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/auth/logout')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        window.location.reload()
      });
  }
}
