import superagent from 'superagent'
import mixpanel from 'mixpanel-browser'

export function authCheck(){
  return function (dispatch) {
    dispatch({type: 'LOGIN_AUTH_CHECK', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/authcheck')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'LOGIN_AUTH_CHECK', status: "error", authStatus: false});
        } else {
          dispatch({type: 'LOGIN_AUTH_CHECK', status: "success", authStatus: res.body.auth});
        }
      });
  }
}

export function unMount(){
  return {
    type: 'LOGIN_UNMOUNT'
  }
}


export function submitForm(formData){
  return function (dispatch) {
    dispatch({type: 'LOGIN_FORM_STATUS', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    console.log(apiUrl + formData.submit_url)
    superagent
    .post(apiUrl + formData.submit_url)
    .send({username: formData.email.value, password: formData.password.value})
    .set('Accept', 'application/json').withCredentials()
    .end(function(err, res){
      if(err || res.body.status === 'Error'){
        dispatch({type: 'LOGIN_STATUS', status: 'error'})
      } else {
        mixpanel.identify(res.body.user.id);
        mixpanel.people.set({
            "$first_name": res.body.user.first_name,
            "$last_name": res.body.user.last_name,
            "company_name": res.body.user.Company.name,
            "$created": res.body.user.createtAt,
            "$email": res.body.user.email
        });
        mixpanel.track("login", {email: res.body.user.email, company_name: res.body.user.Company.name, type: res.body.user.Company.platform_type});
        dispatch({type: 'LOGIN_STATUS', status: 'success'})
      }
    });
  }
}
