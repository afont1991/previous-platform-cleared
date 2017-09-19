import superagent from 'superagent'

export function open(){
  return {
    type: 'SAVED_SEARCH_TOGGLE_MODAL',
    showModal: true,
  }
}

export function close(){
  return {
    type: 'SAVED_SEARCH_TOGGLE_MODAL',
    showModal: false,
  }
}

export function saveFilters(name, type, filters){
  return function (dispatch) {
    if(name.validation.class === 'has-success'){
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .post(apiUrl + '/api/search/save')
        .set('Accept', 'application/json').withCredentials()
        .send({filters: filters, type: type, name: name.value })
        .end(function(err, res){
          dispatch(close())
          // if(err || res.body.status === 'Error'){
          //   // dispatch({type: 'COMPANY_SEARCH_UPDATE_STATUS', status: 'error', response: res});
          // } else {
          //   // dispatch({type: 'COMPANY_SEARCH_SUCCESS'});
          // }
        });
    }
  }
}
