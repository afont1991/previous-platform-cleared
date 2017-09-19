import { fromJS } from 'immutable';


const intialState = {
  status: 'pending',
  formData: {
    rePassword_1: {
      display_name: 'Password',
      name: 'rePassword_1',
      value: '',
      type: 'password',
      rules: ['required', 'password'],
      validation: '',
      placeholder: 'password',
    },
    rePassword_2: {
      display_name: 'Re-Enter Password',
      name: 'rePassword_2',
      value: '',
      type: 'password',
      rules: ['required', 'password'],
      validation: '',
      placeholder: 'password',
    },
    submit_url: '/auth/forgot',
    token: null,
  },
  matching: null,
  passwordUpdated: false,
  error: null,
}


export default (state = intialState, action) => {
  switch(action.type) {
    case 'FORGOT_PASSWORD_INIT':
      return fromJS(state).set('status', 'ready').setIn(['formData', 'token'], action.token).toJS();
    case 'FORGOT_PASSWORD_UNMOUNT':
      return intialState;
    case 'FORGOT_PASSWORD_MATCHED':
      return fromJS(state).set('matching', action.match).toJS();
    case "FORGOT_PASSWORD_STATUS":
      return fromJS(state).set('status', action.status).toJS();
    default:
      return state;
  }
};
