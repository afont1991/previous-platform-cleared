import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  dealList: [],
  userInfo: null,
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "DEAL_LIST_GET_ACTIVE":
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('dealList', [])
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('dealList', [])
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('dealList', action.response.body.payload.activeDeals)
            .set('userInfo', action.response.body.payload.userInfo)
            .toJS();

      }
    default:
      return state;
  }
};
