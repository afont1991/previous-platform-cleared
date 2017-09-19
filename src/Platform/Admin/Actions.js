import superagent from 'superagent'
import InputValidator from '../../Helpers/InputValidator'

export function unmount(){
  return {type: 'ADMIN_CENTER_UNMOUNT'}
}

export function SelectLookup(lookupType,lookupId){
  return {
    type: 'ADMIN_CENTER_SELECT_LOOKUP',
    lookup_type:lookupType,
    lookup_id: lookupId
  }
}

export function onChange(input, path){
  return {
    type: 'ADMIN_CENTER_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function nextPage(){
  return {
    type: 'ADMIN_CENTER_NEXT_PAGE',
  }
}

export function previousPage(){
  return {
    type: 'ADMIN_CENTER_PREVIOUS_PAGE',
  }
}

export function onLimitSelect(selected, selectedPath){
  return {
    type: 'ADMIN_CENTER_LIMIT_SELECT',
    selected: selected,
    selectedPath: selectedPath,
  }
}

export function SearchByName(){
  return {
    type: 'ADMIN_CENTER_SEARCH_COMPANY_NAME',
  }
}

export function onSelect(selected, selectedPath){
  return {
    type: 'ADMIN_CENTER_ON_SELECT',
    selected: selected,
    selectedPath: selectedPath,
  }
}

// export function selectNewsStory(id){
//   return {
//     type: 'ADMIN_CENTER_SELECT_NEWS_STORIES',
//     id: id,
//   }
// }

// export function deleteNewsStories(selectedStories){
//   return function (dispatch) {
//     let apiUrl = 'http://localhost:9000';
//     if(process.env.NODE_ENV === 'production'){
//       apiUrl = 'https://platform.debtmaven.com';
//     }
//     superagent
//       .post(apiUrl + '/api/admin/delete/news')
//       .send(selectedStories)
//       .set('Accept', 'application/json').withCredentials()
//       .end(function(err, response){
//         if(err || response.body.status === 'Error'){
//           dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: response});
//         } else {
//           dispatch({type: 'ADMIN_CENTER_RESET_FORM', path: ['IndustryNews']})
//           dispatch({type: 'ADMIN_CENTER_INIT', status: "success", reset: true});
//         }
//       });
//   }
// }
//
// export function submitStory(formData){
//   return function (dispatch) {
//     let apiUrl = 'http://localhost:9000';
//     if(process.env.NODE_ENV === 'production'){
//       apiUrl = 'https://platform.debtmaven.com';
//     }
//     superagent
//       .post(apiUrl + '/api/admin/create/news')
//       .send(formData)
//       .set('Accept', 'application/json').withCredentials()
//       .end(function(err, response){
//         if(err || response.body.status === 'Error'){
//           dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: response});
//         } else {
//           dispatch({type: 'ADMIN_CENTER_RESET_FORM', path: ['IndustryNews']})
//           dispatch({type: 'ADMIN_CENTER_INIT', status: "success", reset: true});
//         }
//       });
//   }
// }

export function ActivateCompany(company){
  return function (dispatch) {
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/admin/activate')
      .send(company)
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, response){
        if(err || response.body.status === 'Error'){
          dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: response});
        } else {
          dispatch({type: 'ADMIN_CENTER_INIT', status: "success", reset: true});
        }
      });
  }
}

export function SubmitLookup(input){
  return function (dispatch) {
    const validationState = InputValidator(input.value, input.rules)
    const inputPath = ['newLookupForm', input.name]
    dispatch({type: 'ADMIN_CENTER_VALIDATE_INPUT',validationState: validationState, path: inputPath.concat('validation')});
    if(validationState.class !== 'has-error'){
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      superagent
        .post(apiUrl + '/api/lookups/new')
        .send(input)
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, response){
          if(err || response.body.status === 'Error'){
            dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: response});
          } else {
            dispatch({type: 'ADMIN_CENTER_CLEAR_INPUT', path: inputPath})
            dispatch({type: 'ADMIN_CENTER_INIT', status: "success", reset: true});
          }
        });
    }
  }
}

export function DeleteLookups(lookups, type){
  return function (dispatch) {
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/lookups/delete')
      .send({lookups: lookups, type: type})
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, response){
        if(err || response.body.status === 'Error'){
          dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: response});
        } else {
          dispatch({type: 'ADMIN_CENTER_CLEAR_DELETE_BUTTON', path: ['deleteButtonState', type]})
          dispatch({type: 'ADMIN_CENTER_INIT', status: "success", reset: true});
        }
      });
  }
}

export function init(state) {
  let CompanyForm = state.CompanyForm
  return function (dispatch) {
    dispatch({type: 'ADMIN_CENTER_INIT', status: "pending"});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/epilogue/lookups/all')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, lookupRes){
        if(err || lookupRes.body.status === 'Error'){
          dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: lookupRes});
        } else {
          if(!lookupRes.body.payload.isAdmin){
            dispatch({type: 'REDIRECT_TO_DASHBOARD', message: 'Not Admin'});
          } else {
            dispatch({type: 'ADMIN_CENTER_LOOKUPS', lookups: lookupRes.body.payload.lookups});
            superagent
              .post(apiUrl + '/api/admin/companies/get')
              .send(CompanyForm)
              .set('Accept', 'application/json').withCredentials()
              .end(function(err, response){
                if(err || response.body.status === 'Error'){
                  dispatch({type: 'ADMIN_CENTER_INIT', status: "error", response: response});
                } else {
                  dispatch({type: 'ADMIN_CENTER_SET_COMPANY_RESULTS', results: response.body.payload});
                  dispatch({type: 'ADMIN_CENTER_INIT', status: "success", reset: false});
                }
              });
          }
        }
      });
  }
}
