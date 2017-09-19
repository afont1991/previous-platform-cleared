import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "COMPANY_CREATION_SECTION_CHANGE":
      return state;
    default:
      return state;
  }
};
