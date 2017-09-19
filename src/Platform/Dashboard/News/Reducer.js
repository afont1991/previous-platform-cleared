import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
  newsItems: [],
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "GET_NEWS_ITEMS":
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('error', {})
            .set('newsItems', [])
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('error', action.response)
            .set('newsItems', [])
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('error', {})
            .set('newsItems', action.response.body.details)
            .toJS();
      }
    default:
      return state;
  }
};
