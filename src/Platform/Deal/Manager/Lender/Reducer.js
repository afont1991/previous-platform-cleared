import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  initialized: false,
  currentSection: 'summary',
  MatchData: null,
  message_toggle: true,
  messages: [],
  newMessage: {
    display_name: false,
    name: 'newMessage',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  },
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'LENDER_MANAGER_INIT':
      switch (action.status) {
        case 'pending':
          return fromJS(state).set('status', action.status).toJS()
        case 'error':
          return fromJS(state).set('status', action.status).set('error', action.error).set('MatchData', null).toJS()
        default:
          return fromJS(state).set('status', action.status).toJS()
      }
    case 'LENDER_MANAGER_SET_MATCH_DATA':
      return fromJS(state).set('MatchData', action.MatchData).toJS()
    case "LENDER_MANAGER_CHANGE_SECTION":
      return fromJS(state)
        .set('currentSection', action.section)
        .toJS();
    case 'LENDER_MANAGER_GET_MESSAGE_TOGGLE':
      return fromJS(state)
        .set('message_toggle', action.toggle)
        .setIn(['newMessage', 'value'], '')
        .toJS()
    case 'LENDER_MANAGER_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .toJS();
    case 'LENDER_MANAGER_GET_MESSAGES':
      return fromJS(state)
        .set('messages', action.messages)
        .toJS()
    default:
      return state;
  }
};
