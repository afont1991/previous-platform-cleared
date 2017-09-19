import { fromJS } from 'immutable';
import InputValidator from '../../Helpers/InputValidator'

const intialState = {
  status: 'ready',
  submitStatus: false,
  formData: {
    email: {
      display_name: 'Contact Email',
      name: 'email',
      value: '',
      type: 'email',
      rules: ['required', 'email'],
      validation: '',
      placeholder: 'eg: example@example.com',
    },
    message: {
      display_name: 'Message',
      name: 'message',
      value: '',
      type: 'textarea',
      rows: '8',
      rules: ['required'],
      validation: '',
      placeholder: 'Please let us know if any issues or question you may and we will get back to you as soon as possible via your login email',
    },
  },
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "HELP_FORM_STATUS":
      return fromJS(state)
        .set('status', action.status)
        .toJS();
    case "HELP_FORM_INPUT_VALIDATION":
      return fromJS(state)
        .setIn(action.path.concat('validation'), action.validationState)
        .toJS();
    case 'HELP_FORM_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    case 'HELP_FORM_TOGGLE_MODAL':
      return fromJS(state).set('showModal', action.showModal).toJS()
    case 'HELP_FORM_READY_TO_SUBMIT':
      return fromJS(state).set('submitStatus', action.status).toJS()
    default:
      return state;
  }
};
