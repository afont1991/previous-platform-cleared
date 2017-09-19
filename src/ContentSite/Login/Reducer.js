import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  login_status: null,
  login: {
    email: '',
    password: '',
  },
  userInfo: {},
  loginSuccess: false,
  error: undefined,
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'LOGIN_REQUEST':
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
            .set('loginSuccess', true)
            .set('userInfo', action.response.body.user)
            .toJS();
      }
    case 'LOGIN_INPUT':
      return fromJS(state)
      .setIn(action.inputPath, action.input.target.value)
      .toJS()
    default:
      return state;
  }
};
