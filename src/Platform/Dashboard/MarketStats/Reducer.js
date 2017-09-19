import { fromJS } from 'immutable';

const intialState = {
  status: 'ready',
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "MARKET_STATS_INIT":
      return state;
    default:
      return state;
  }
};
