import { fromJS } from 'immutable';
import InputValidator from '../Helpers/InputValidator'

const intialState = {
  status: 'pending',
  error: {},
  formData: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "FORM_UNMOUNT":
      return intialState;
    case "FORM_INIT":
      return fromJS(state)
        .set('status', 'ready')
        .set('formData', action.formData)
        .toJS();
    case "FORM_STATUS":
      return fromJS(state)
        .set('status', action.status)
        .toJS();
    case "FORM_SUBMITTED":
      return fromJS(state)
        .setIn(['formData', 'success'], action.response)
        .toJS();
    case "FORM_CHANGE_SECTION":
      return fromJS(state)
        .setIn(['formData', 'currentSection'], action.nextSection)
        .toJS();
    case "FORM_INPUT_VALIDATION":
      return fromJS(state)
        .setIn(action.path.concat('validation'), action.validationState)
        .toJS();
    case 'FORM_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    case 'FORM_ON_SELECT':
      return fromJS(state)
        .setIn(action.path.concat(['selectedOption']), action.option)
        .setIn(action.path.concat(['validation']), InputValidator(action.option, fromJS(state).getIn(action.path).toJS().rules, 'select'))
        .toJS();
    case 'FORM_ON_FILE_DROP':
      return fromJS(state)
        .setIn(action.path.concat('url'), action.acceptedFiles[0].preview)
        .setIn(action.path.concat('file'), action.acceptedFiles[0])
        .toJS();
    case 'FORM_ADD_ITEM':
      let newItemArray = fromJS(state).getIn(action.path).toJS()
      newItemArray.push(action.item)
      return fromJS(state)
        .setIn(action.path, newItemArray)
        .toJS();
    case 'FORM_REMOVE_ITEM':
      return fromJS(state)
        .setIn(action.path, action.newItemArray)
        .toJS()
    case 'FORM_DATE_UPDATE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.date)
        .toJS()
    case 'FORM_UPDATE_CHECKBOX':
      return fromJS(state)
        .setIn(action.path, action.checked.target.checked)
        .toJS()
    case 'FORM_RANGE_CHANGE':
    return fromJS(state)
      .setIn(action.path, action.value)
      .toJS()
    default:
      return state;
  }
};
