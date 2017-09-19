import { fromJS } from 'immutable';

const intialState = {
  showModal: false,
  formData: {
    name: {
      display_name: false,
      customClass: 'saved-search-input',
      name: 'name',
      value: '',
      type: 'text',
      rules: ['required'],
      validation: '',
      placeholder: 'name',
    },
    type: null,
  },
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'SAVED_SEARCH_TOGGLE_MODAL':
      return fromJS(state).set('showModal', action.showModal).toJS()
    default:
      return state;
  }
};
