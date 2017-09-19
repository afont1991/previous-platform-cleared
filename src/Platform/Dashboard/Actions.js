import superagent from 'superagent'

export function unMount() {
  return {
    type: 'DASHBOARD_UNMOUNT',
  }
}

// export function handleClick() {
//   return {
//     type: 'SUCCESS',
//   }
// }

export function init() {
  return function (dispatch) {
    dispatch({type: 'DASHBOARD_INIT', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/dashboard/init')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'DASHBOARD_INIT', status: "error", response: res});
        } else {
          dispatch({type: 'DASHBOARD_INIT', status: "success", response: res});
        }
      });
  }
}
