import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  initialized: false,
  LenderResults: [],
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'AUTO_LENDER_LIST_INIT':
      switch (action.status) {
        case 'pending':
          return fromJS(state).set('status', action.status).toJS()
        case 'error':
          return fromJS(state).set('status', action.status).set('error', action.error).set('LenderResults', []).toJS()
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('LenderResults', action.payload)
            .toJS()
      }
    case 'AUTO_LENDER_LIST_MATCH_REQUEST':
      switch (action.status) {
        case 'pending':
          return fromJS(state).set('status', action.status).toJS()
        case 'error':
          return fromJS(state).set('status', action.status).set('error', action.error).toJS()
        default:
          return fromJS(state).set('status', action.status).toJS()
      }
    default:
      return state;
  }
};
