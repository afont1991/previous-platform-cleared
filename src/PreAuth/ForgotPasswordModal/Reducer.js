import { fromJS } from 'immutable';
import InputValidator from '../../Helpers/InputValidator'


const intialState = {
  status: 'ready',
  formData: {
    email: {
      display_name: 'Email',
      name: 'email',
      value: '',
      type: 'email',
      rules: ['required', 'email'],
      validation: '',
      placeholder: 'email@email.com',
    },
    submit_url: '/auth/forgot',
  },
}


export default (state = intialState, action) => {
  switch(action.type) {
    case 'FORGOT_PASSWORD_MODAL_STATUS':
      return fromJS(state).set('status', action.status).toJS()
    case 'FORGOT_PASSWORD_MODAL_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    case 'FORGOT_PASSWORD_MODAL_INPUT_VALIDATION':
    return fromJS(state)
      .setIn(action.path.concat(['validation']), action.validation)
      .toJS();
    default:
      return state;
  }
};
