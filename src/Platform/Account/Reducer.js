import { fromJS } from 'immutable';
import InputValidator from '../../Helpers/InputValidator'

const initialState = {
  status: 'pending',
  UserInfo: {},
  passwords_match: true,
  formData: {
    email: {
      display_name: 'Email',
      name: 'email',
      value: '',
      type: 'email',
      rules: ['required', 'email'],
      validation: '',
    },
    password: {
      display_name: 'New Password',
      name: 'last_name',
      value: '',
      type: 'password',
      rules: ['required', 'password'],
      validation: '',
    },
    password_test: {
      display_name: 'Verify New Password',
      name: 'password_test',
      value: '',
      type: 'password',
      rules: ['required', 'password'],
      validation: '',
    },
  },
  error: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ACCOUNT_INIT':
      let UserInfo = {email: ''}
      if(action.status === 'success'){
        UserInfo = action.response.body.payload
      }
      return fromJS(state)
        .set('status', action.status)
        .set('UserInfo', UserInfo)
        .setIn(['formData', 'email', 'value'], UserInfo.email)
        .toJS();
    case 'ACCOUNT_UNMOUNT':
      return initialState;
    case 'PASSWORD_MATCH':
      return fromJS(state)
        .set('passwords_match', action.status)
        .toJS();
    case 'ACCOUNT_EMAIL_SUBMIT':
    case 'ACCOUNT_PASSWORD_SUBMIT':
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
    case 'ACCOUNT_INPUT_VALIDATION':
      return fromJS(state)
        .setIn(action.path, action.validation)
        .toJS()
    case 'ACCOUNT_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    default:
      return state;
  }
};
