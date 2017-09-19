import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
  profileData: {},
  profileMode: "view",
  dealMatchDropdownList: false,
  dealMatchDropdownListSelected: null,
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'COMPANY_PROFILE_UNMOUNT':
      return fromJS(state)
        .set('dealMatchDropdownList', false)
        .set('dealMatchDropdownListSelected', null)
        .toJS();
    case "COMPANY_REQUEST_PROFILE":
      if(action.status === 'pending'){
        return fromJS(state).set('status', action.status).toJS();
      } else if(action.status === 'error') {
        return fromJS(state).set('status', action.status).set('error', action.response.error).toJS();
      } else {
        return fromJS(state).set('status', action.status).set('profileData', action.response.body.payload).toJS();
      }
    case 'COMPANY_PROFILE_ACTIVE_DEAL_SELECT':
      return fromJS(state)
        .set('dealMatchDropdownListSelected', action.selected)
        .toJS();
    case 'COMPANY_PROFILE_ACTIVE_DEAL_DROPDOWN':
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('dealMatchDropdownList', false)
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('dealMatchDropdownList', 'error')
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('dealMatchDropdownListSelected', action.response.body.payload[0])
            .set('dealMatchDropdownList', action.response.body.payload)
            .toJS();

      }
    default:
      return state;
  }
};
