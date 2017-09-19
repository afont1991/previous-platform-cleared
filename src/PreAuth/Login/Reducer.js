import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  authStatus: false,
  login_status: null,
  loginForm: {
    email: {
      display_name: 'Email',
      name: 'email',
      value: '',
      type: 'email',
      rules: ['required', 'email'],
      validation: '',
      placeholder: 'eg: example@example.com',
    },
    password: {
      display_name: 'Password',
      name: 'password',
      value: '',
      type: 'password',
      rules: ['required'],
      validation: '',
      placeholder: 'password',
    },
    submit_url: '/auth/login',
  },
  userInfo: {},
  loginSuccess: false,
  error: undefined,
}


export default (state = intialState, action) => {
  switch(action.type) {
    case 'LOGIN_AUTH_CHECK':
      return fromJS(state)
        .set('authStatus', action.authStatus)
        .set('status', 'ready')
        .toJS();
    case "LOGIN_STATUS":
      return fromJS(state).set('login_status', action.status).toJS()
    case 'LOGIN_UNMOUNT':
      return intialState
    default:
      return state;
  }
};
