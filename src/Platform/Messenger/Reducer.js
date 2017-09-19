import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  initialized: false,
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "DEAL_MANAGER_ACCEPT_REJECT_MATCH":
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .toJS();

      }
    default:
      return state;
  }
};
