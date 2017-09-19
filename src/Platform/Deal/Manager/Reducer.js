import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  userInfo: null,
  error: null,
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "DEAL_MANAGER_INIT":
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('userInfo', null)
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('userInfo', null)
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('userInfo', action.response.body.payload)
            .toJS();

      }
    default:
      return state;
  }
};
