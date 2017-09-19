import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  results: [],
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'DASHBOARD_SAVED_SEARCH_INIT':
      return fromJS(state).set('results', action.results).set('status', action.status).toJS()
    default:
      return state;
  }
};
