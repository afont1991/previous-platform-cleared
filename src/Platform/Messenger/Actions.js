import superagent from 'superagent'
// import io from 'socket.io'

export function changeSection(newSection){
  return {
    type: 'DEAL_MANAGER_CHANGE_SECTION',
    section: newSection,
  }
}

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

export function getDealMessages(DealId, UserInfo){
  console.log('??');
  return function (dispatch) {
    dispatch(apiDispatch('DEAL_MANAGER_GET_MESSAGES', "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/match/messages')
      .set('Accept', 'application/json').withCredentials()
      .query({ DealId: DealId, UserInfo: UserInfo})
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch('DEAL_MANAGER_GET_MESSAGES', "error", res));
        } else {
          // const socket = io(apiUrl);
          // socket.on('news', function (data) {
          //   console.log(data);
          //   socket.emit('my other event', { my: 'data' });
          // });
          dispatch(apiDispatch('DEAL_MANAGER_GET_MESSAGES', "success", res));
        }
      });
  }
}
