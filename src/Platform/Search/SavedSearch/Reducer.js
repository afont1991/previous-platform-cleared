import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  reload: false,
  results: [],
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'SAVE_SEARCH_UPDATE_STATUS':
      return fromJS(state).set('reload', false).set('status', action.status).toJS()
    case 'SAVE_SEARCH_RESULTS':
      return fromJS(state).set('results', action.results).toJS()
    case 'SAVE_SEARCH_RELOAD':
      return fromJS(state).set('reload', true).toJS()
    default:
      return state;
  }
};
