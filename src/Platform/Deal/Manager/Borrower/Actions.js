import superagent from 'superagent'

export function changeSection(newSection){
  return {
    type: 'DEAL_MANAGER_CHANGE_SECTION',
    section: newSection,
  }
}

export function onChange(input, path){
  return {
    type: 'BORROWER_MANAGER_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function init(DealId){
  return function (dispatch) {
    dispatch({type: 'BORROWER_MANAGER_INIT', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/match/list')
      .query({ DealId: DealId })
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'BORROWER_MANAGER_INIT', status: 'pending', error: res});
        } else {
          dispatch({type: 'BORROWER_MANAGER_MATCH_LIST', matches: res.body.payload.matches})
          dispatch({type: 'BORROWER_MANAGER_INIT', status: 'success'});
        }
      });
  }
}

export function submitMatchUpdate(matchInfo){
  return function (dispatch) {
    dispatch({type: 'BORROWER_MANAGER_INIT', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/match/update')
      .set('Accept', 'application/json').withCredentials()
      .send(matchInfo)
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'BORROWER_MANAGER_INIT', status: 'pending', error: res});
        } else {
          dispatch({type: 'BORROWER_MANAGER_INIT', status: 'success'});
        }
        window.location.reload()
      });
  }
}

export function getMessages(DealId, CompanyId){
  return function (dispatch) {
    dispatch({type: 'BORROWER_MANAGER_INIT', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/match/messages')
      .query({ DealId: DealId, CompanyId: CompanyId })
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'BORROWER_MANAGER_INIT', status: 'error', error: res});
        } else {
          dispatch({type: 'BORROWER_MANAGER_GET_MESSAGES', messages: res.body.payload, CompanyId: CompanyId})
          dispatch({type: 'BORROWER_MANAGER_SET_CURRENT_MESSAGE', id: CompanyId})
          dispatch({type: 'BORROWER_MANAGER_GET_MESSAGE_TOGGLE', toggle: false})
          dispatch({type: 'BORROWER_MANAGER_INIT', status: 'success'});
        }
      });
  }
}

export function sendMessage(message){
  return function (dispatch) {
    if(message.text !== ''){
      dispatch({type: 'BORROWER_MANAGER_INIT', status: 'pending'});
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .post(apiUrl + '/api/match/messages')
        .send(message)
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({type: 'BORROWER_MANAGER_INIT', status: 'error', error: res});
          } else {
            dispatch({type: 'BORROWER_MANAGER_GET_MESSAGE_TOGGLE', toggle: true})
            dispatch({type: 'BORROWER_MANAGER_INIT', status: 'success'});
          }
        });
    }
  }
}
