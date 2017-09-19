import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  loggedIn: false,
  UserInfo: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'HOMEPAGE_INIT':
      return fromJS(state)
        .set('status', action.status)
        .set('loggedIn', action.loggedIn)
        .toJS();
    default:
      return state;
  }
};
