import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  initialized: false,
  currentSection: 'summary',
  CurrentMessageId: null,
  message_toggle: false,
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
    case "DEAL_MANAGER_CHANGE_SECTION":
      return fromJS(state)
        .set('currentSection', action.section)
        .toJS();
    case 'BORROWER_MANAGER_INIT':
      switch (action.status) {
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('error', action.error)
            .toJS()
        default:
          return fromJS(state).set('status', action.status).toJS()
      }
    case 'BORROWER_MANAGER_GET_MESSAGE_TOGGLE':
      return fromJS(state)
        .set('message_toggle', action.toggle)
        .setIn(['newMessage', 'value'], '')
        .toJS()
    case 'BORROWER_MANAGER_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .toJS();
    case 'BORROWER_MANAGER_SET_CURRENT_MESSAGE':
      return fromJS(state)
        .set('CurrentMessageId', action.id)
        .toJS()
    case 'BORROWER_MANAGER_GET_MESSAGES':
      return fromJS(state)
        .set('messages', action.messages)
        .set('CurrentMessageId', action.CompanyId)
        .toJS()
    case 'BORROWER_MANAGER_MATCH_LIST':
      return fromJS(state).set('matches', action.matches).toJS()
    default:
      return state;
  }
};
