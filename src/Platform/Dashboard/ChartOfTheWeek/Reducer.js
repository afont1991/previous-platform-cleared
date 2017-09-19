import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "GET_SAVED_SEARCHES":
      return state;
    default:
      return state;
  }
};
