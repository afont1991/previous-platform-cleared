import superagent from 'superagent'
import mixpanel from 'mixpanel-browser'

export function unMount(){
  return {type: 'DEAL_SEARCH_UNMOUNT'}
}

export function nextPage(){
  return {
    type: 'DEAL_SEARCH_NEXT_PAGE',
  }
}

export function previousPage(){
  return {
    type: 'DEAL_SEARCH_PREVIOUS_PAGE',
  }
}

export function onChange(input, inputPath){
  return {
    type: 'DEAL_SEARCH_ONCHANGE',
    inputPath: inputPath,
    input: input,
  }
}

export function onSelect(selected, selectedPath, extra){
  return {
    type: 'DEAL_SEARCH_SELECT',
    selected: selected,
    selectedPath: selectedPath,
    extra: extra,
  }
}

export function removeSelect(selected, selectedPath){
  return {
    type: 'DEAL_SEARCH_REMOVE_SELECT',
    selected: selected,
    selectedPath: selectedPath,
  }
}



export function addDebtAmount(){
  return {
    type: 'DEAL_SEARCH_ADD_DEBT_AMOUNT',
  }
}

export function showFilter(filterPath, selected){
  return {
    type: 'DEAL_SEARCH_SHOW_HIDE_FILTER',
    filterPath: filterPath,
    selected: selected,
  }
}

export function removeOption(section, value){
  return {
    type: 'DEAL_SEARCH_REMOVE_OPTION',
    section: section,
    value: value,
  }
}

export function fetchLookups(status, lookupType, response){
  return {
    type: 'FETCH_DEAL_SEARCH_LOOKUPS',
    lookupType: lookupType,
    status: status,
    response: response
  }
}

export function requestLookups(params) {
  return function (dispatch) {
    dispatch(fetchLookups("pending", 'all'));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/epilogue/lookups/all')
      .query({type: 'deal', search_name: params.SearchName})
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(fetchLookups("error", 'all', res));
        } else {
          dispatch(fetchLookups("success", 'all', res));
        }
      });
  }
}

export function apiDispatch(type, status, response){
  return {
    type: type,
    status: status,
    response: response
  }
}

function CreateSearchAnalyticsReport(state){
  let selectedFilters = []
  Object.keys(state.filterData).forEach((filterKey) => {
    let filter = state.filterData[filterKey]
    if(filter.selected){
      selectedFilters.push(filter.name)
    }
  })
  let filtersSet = 'NONE'
  if(selectedFilters.length !== 0){
    filtersSet = selectedFilters.join(', ')
  }
  mixpanel.track(
    "search", {
      type: 'deal',
      filters_set: filtersSet,
  });
}

export function submitFilters(state, reversePage){
  return function (dispatch) {
    if(reversePage){
      state.filterData.page -= 1
      dispatch({type: 'DEAL_SEARCH_UNSET_PENDING_PAGE', newPageNumber: state.filterData.page});
    }
    dispatch(apiDispatch('DEAL_SEARCH_FILTER_SUBMIT', "pending"));
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/deal/search')
      .set('Accept', 'application/json').withCredentials()
      .send(state.filterData)
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch(apiDispatch('DEAL_SEARCH_FILTER_SUBMIT', "error", res));
        } else {
          CreateSearchAnalyticsReport(state)
          dispatch(apiDispatch('DEAL_SEARCH_FILTER_SUBMIT', "success", res));
        }
      });
  }
}
