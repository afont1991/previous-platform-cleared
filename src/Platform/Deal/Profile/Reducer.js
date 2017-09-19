import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
  DealId: 1,
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "REQUEST_DEAL_PROFILE":
      if(action.status === 'pending'){
        delete state.profileData;
        return fromJS(state).set('status', action.status).toJS();
      } else if(action.status === 'error') {
        delete state.profileData;
        return fromJS(state).set('status', action.status).set('error', action.response.error).toJS();
      } else {
        return fromJS(state).set('status', action.status).set('profileData', action.response.body.payload).toJS();
      }
    case 'DEAL_PROFILE_MATCH_REQUEST':
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
    case "PROFILE_DEAL_MODE":
      return fromJS(state).set('profileMode', action.mode).toJS();
    default:
      return state;
  }
};
