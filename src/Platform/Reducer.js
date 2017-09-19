import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  termsModal: false,
  authStatus: true,
  refreshAuthAttempt: null,
  SearchInput: {
    display_name: false,
    placeholder: 'Company Name',
    name: 'name',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  }
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'LOGIN_REQUEST':
      if(action.status === 'success'){
        return fromJS(state)
          .set('authStatus', true)
          .set('status', 'ready')
          .toJS();
      } else {
        return state;
      }
    case 'PLATFORM_ONCHANGE':
      return fromJS(state)
        .setIn(action.path.concat('value'), action.input.target.value)
        .toJS();
    case 'PLATFORM_TOGGLE_TERMS_MODAL':
      return fromJS(state)
        .set('termsModal', action.toggle)
        .toJS();
    case 'AUTH_CHECK':
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('authStatus', true)
            .set('status', action.status)
            .toJS();
        default:
          return fromJS(state)
            .set('authStatus', action.authStatus)
            .set('status', 'ready')
            .toJS();

      }
    case "PLATFORM_SET_ALERT_MESSAGE":
      return fromJS(state)
        .setIn(['alert', 'message'], action.message)
        .toJS()
    case "PLATFORM_UNSET_ALERT_MESSAGE":
      delete state.alert
      return fromJS(state).toJS()
    case 'REDIRECT_TO_DASHBOARD':
      return fromJS(state)
        .set('redirect', {to: '/platform', message: action.message})
        .toJS()
    case 'LOGOUT':
      if(action.status === 'success'){
        return fromJS(intialState).set('authStatus', false).toJS();
      } else {
        return state;
      }
    default:
      if(action.status === 'error') {
        if(action.response){
          if(action.authStatus){
            if(action.authStatus.auth){
              return fromJS(state).set('authStatus', false).toJS();
            }
          } else if(action.response.status === 403){
            return fromJS(state).set('authStatus', false).toJS();
          }
        }
        return state;
      } else {
        return state;
      }
  }
};
