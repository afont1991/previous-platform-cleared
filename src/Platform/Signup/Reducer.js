import { fromJS } from 'immutable';
import InputValidator from '../../Helpers/InputValidator'

const intialState = {
  status: 'success',
  signup_request: null,
  formData: {
    first_name: {
      display_name: 'First Name',
      name: 'first_name',
      value: '',
      type: 'text',
      rules: ['required'],
      validation: '',
    },
    last_name: {
      display_name: 'Last Name',
      name: 'last_name',
      value: '',
      type: 'text',
      rules: ['required'],
      validation: '',
    },
    email: {
      display_name: 'Email',
      name: 'email',
      value: '',
      type: 'email',
      rules: ['required', 'email'],
      validation: '',
    },
    password: {
      display_name: 'Password',
      name: 'password',
      value: '',
      type: 'password',
      rules: ['required', 'password'],
      validation: '',
    },
    user_type: {
      display_name: 'Select Type',
      name: 'user_type',
      value: '',
      type: 'select',
      options: [
        {label: 'Lender', value: 'lender'},
        {label: 'Borrower', value: 'borrower'}
      ],
      selectedOption: {},
      rules: ['required'],
      validation: '',
    },
  },
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'SIGNUP_SUBMIT':
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('signup_request', null)
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('signup_request', false)
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('signup_request', true)
            .toJS();

      }
    case 'SIGNUP_INPUT_VALIDATION':
      return fromJS(state)
        .setIn(action.path, action.validation)
        .toJS()
    case 'SIGNUP_ON_SELECT':
      return fromJS(state)
        .setIn(action.path.concat(['selectedOption']), action.option)
        .setIn(action.path.concat(['validation']), InputValidator(action.option, fromJS(state).getIn(action.path).toJS().rules, 'select'))
        .toJS();
    case 'SIGNUP_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    default:
      return state;
  }
};
