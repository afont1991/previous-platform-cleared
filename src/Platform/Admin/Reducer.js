import { fromJS } from 'immutable';
import InputValidator from '../../Helpers/InputValidator'

const intialState = {
  status: 'pending',
  reset: false,
  companyResults: [],
  lookups: [],
  CompanyForm: {
    CompanyName: {
      display_name: false,
      customClass: 'admin-company-search-input',
      name: 'CompanyName',
      placeholder: 'Search by name',
      value: '',
      type: 'text',
      rules: [],
      validation: '',
    },
    LimitInput: {
      name: 'limit',
      display_name: false,
      type: 'select',
      options: [
        {label: '5', value: 5},
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
      ],
      selectedOption: {label: '5', value: 5},
      rules: [],
      validation: '',
      customClass: 'search-limit-input'
    },
    page: 1,
    limit: 5,
    sorting: [['name', 'ASC']],
  },
  IndustryNews: {
    headline: {
      name: 'headline',
      display_name: 'Headline',
      placeholder: 'news headline',
      value: '',
      type: 'text',
      rules: [],
      validation: '',
    },
    content: {
      name: 'content',
      display_name: 'Content',
      placeholder: 'new content',
      value: '',
      type: 'text',
      rules: [],
      validation: '',
    },
    date: {
      display_name: 'Date',
      name: 'date',
      value: '',
      type: 'date',
      rules: ['date'],
      validation: '',
    },
    url: {
      name: 'url',
      display_name: 'News Url',
      placeholder: 'eg: www.example.com',
      value: '',
      type: 'text',
      rules: ['url'],
      validation: '',
    },
    LimitInput: {
      name: 'limit',
      display_name: false,
      type: 'select',
      options: [
        {label: '5', value: 5},
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
      ],
      selectedOption: {label: '5', value: 5},
      rules: [],
      validation: '',
      customClass: 'search-limit-input'
    },
    page: 1,
    limit: 5,
    sorting: [['release_date', 'ASC']],
    deleteButtonState: false,
  },
  deleteButtonState: {
    Industries: false,
    Characteristics: false,
    Financials: false,
    Scenarios: false,
    Size: false,
    TypesOfCapital: false,
  },
  newLookupForm: {
    Industries: {
      display_name: false,
      customClass: 'new-lookup-input',
      name: 'Industries',
      placeholder: 'New Industry Name',
      value: '',
      type: 'text',
      rules: ['required'],
      buttonText: 'Add New Industry',
      tableHeaderText: 'Industry Lookups',
      validation: '',
    },
    Characteristics: {
      display_name: false,
      customClass: 'new-lookup-input',
      name: 'Characteristics',
      placeholder: 'New Characteristic',
      value: '',
      type: 'text',
      rules: ['required'],
      buttonText: 'Add New Characteristic',
      tableHeaderText: 'Characteristic Lookups',
      validation: '',
    },
    Financials: {
      display_name: false,
      customClass: 'new-lookup-input',
      name: 'Financials',
      placeholder: 'New Financial Name',
      value: '',
      type: 'text',
      rules: ['required'],
      buttonText: 'Add New Financial',
      tableHeaderText: 'Financial Lookups',
      validation: '',
    },
    Scenarios: {
      display_name: false,
      customClass: 'new-lookup-input',
      name: 'Scenarios',
      placeholder: 'New Scenario Name',
      value: '',
      type: 'text',
      rules: ['required'],
      buttonText: 'Add New Scenario',
      tableHeaderText: 'Scenario Lookups',
      validation: '',
    },
    Size: {
      display_name: false,
      customClass: 'new-lookup-input',
      name: 'Size',
      placeholder: 'New Size Name',
      value: '',
      type: 'text',
      rules: ['required'],
      buttonText: 'Add New Size',
      tableHeaderText: 'Size Lookups',
      validation: '',
    },
    TypesOfCapital: {
      display_name: false,
      customClass: 'new-lookup-input',
      name: 'TypesOfCapital',
      placeholder: 'New Type Of Capital Name',
      value: '',
      type: 'text',
      rules: ['required'],
      buttonText: 'Add New Type',
      tableHeaderText: 'Types of Capital',
      validation: '',
    },
  },
  userInfo: null,
  error: null,
}

function setDeleteButtons(currentState){
  Object.keys(currentState.deleteButtonState).forEach((lookupKey, i) => {
    if(i === 0){currentState.deleteButtonState[lookupKey] = false}
    currentState.lookups[lookupKey].forEach((lookup) => {
      if(lookup.deleted === true && currentState.deleteButtonState[lookupKey] === false){
        currentState.deleteButtonState[lookupKey] = true
      }
    })
  })
  return currentState.deleteButtonState
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "ADMIN_CENTER_INIT":
      switch (action.status) {
        case 'pending':
          return fromJS(state).set('status', action.status).set('reset', false).toJS();
        case 'error':
          return fromJS(state).set('status', action.status).set('error', action.response).set('reset', false).toJS();
        default:
          return fromJS(state).set('status', action.status).set('reset', action.reset).toJS();
      }
    case 'ADMIN_CENTER_RESET_FORM':
      let resetForm = fromJS(intialState).getIn(action.path)
      return fromJS(state).setIn(action.path, resetForm).toJS();
    case 'ADMIN_CENTER_SELECT_LOOKUP':
      let setDelete = true
      if(state.lookups[action.lookup_type][action.lookup_id].deleted){
        setDelete = false
      }
      state.lookups[action.lookup_type][action.lookup_id].deleted = setDelete
      return fromJS(state)
        .setIn(['lookups', action.lookup_type, action.lookup_id, 'deleted'], setDelete)
        .set('deleteButtonState', setDeleteButtons(state))
        .toJS()
    case 'ADMIN_CENTER_NEXT_PAGE':
      return fromJS(state)
        .setIn(['CompanyForm', 'page'], state.CompanyForm.page + 1)
        .set('reset', true)
        .toJS()
    case 'ADMIN_CENTER_PREVIOUS_PAGE':
      return fromJS(state)
        .setIn(['CompanyForm', 'page'], state.CompanyForm.page - 1)
        .set('reset', true)
        .toJS()
    case 'ADMIN_CENTER_LIMIT_SELECT':
      return fromJS(state)
        .setIn(action.selectedPath.concat(['selectedOption']), action.selected)
        .setIn(['CompanyForm', 'limit'], action.selected.value)
        .setIn(['CompanyForm', 'page'], 1)
        .set('reset', true)
        .toJS();
    case 'ADMIN_CENTER_ON_SELECT':
      return fromJS(state)
        .setIn(action.selectedPath.concat(['selectedOption']), action.selected)
        .toJS();
    case 'ADMIN_CENTER_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    case 'ADMIN_CENTER_VALIDATE_INPUT':
      return fromJS(state).setIn(action.path, action.validationState).toJS()
    case 'ADMIN_CENTER_CLEAR_INPUT':
      return fromJS(state)
        .setIn(action.path.concat(['value']), '')
        .setIn(action.path.concat(['validation']), '')
        .toJS()
    case 'ADMIN_CENTER_CLEAR_DELETE_BUTTON':
      return fromJS(state)
        .setIn(action.path, false)
        .toJS()
    case 'ADMIN_CENTER_SET_COMPANY_RESULTS':
      return fromJS(state)
        .set('companyResults', action.results)
        .toJS()
    case 'ADMIN_CENTER_LOOKUPS':
      return fromJS(state).set('lookups', action.lookups).toJS()
    case 'ADMIN_CENTER_SEARCH_COMPANY_NAME':
      return fromJS(state).set('reset', true).toJS()
    case 'ADMIN_CENTER_UNMOUNT':
      return intialState;
    default:
      return state;
  }
};
