import superagent from 'superagent';

export function onChange(input, inputPath){
  return {
    type: 'LOGIN_INPUT',
    inputPath: inputPath,
    input: input,
  }
}


export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response,
  }
}

export function submitLogin(login){
  return function (dispatch) {
    dispatch(apiDispatch('LOGIN_REQUEST', "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/auth/login')
      .set('Accept', 'application/json').withCredentials()
      .send({username: login.email, password: login.password})
      .withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'LOGIN_FAILURE'});
        } else {
          dispatch({type: 'LOGIN_SUCCESS'});
        }
      });
  }
}
