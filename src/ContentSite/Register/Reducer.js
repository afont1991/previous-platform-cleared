import { fromJS } from 'immutable';
import InputValidator from '../../Helpers/InputValidator'
import us from 'us'
import countriesList from 'countries-list'

const newUser = {
  first_name: {
    display_name: 'First Name',
    name: 'first_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
  },
  last_name: {
    display_name: 'Last Name',
    name: 'last_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
  },
  email: {
    display_name: 'Email',
    name: 'email',
    value: '',
    type: 'email',
    rules: ['required', 'email'],
    validation: '',
  },
  password: {
    display_name: 'Password',
    name: 'password',
    value: '',
    type: 'password',
    rules: ['required', 'password'],
    validation: '',
  },
  password_test: {
    display_name: 'Verify New Password',
    name: 'password_test',
    value: '',
    type: 'password',
    rules: ['required', 'password'],
    validation: '',
  },
}

const companyOverview = {
  formRules: ['validation_required'],
  platform_type: {
    display_name: 'Platform Type',
    name: 'platform_type',
    type: 'select',
    options: [
      {label: 'Lender', value: 'lender'},
      {label: 'Borrower', value: 'borrower'}
    ],
    selectedOption: {},
    rules: ['required'],
    validation: '',
  },
  operating_type: {
    display_name: 'Company Type',
    name: 'operating_type',
    type: 'multi_select',
    options: [
      {value: 'ABL Lender', label: 'ABL Lender'},
      {value: 'BDC', label: 'BDC'},
      {value: 'Cash-flow Lender', label: 'Cash-flow Lender'},
      {value: 'Commercial Bank', label: 'Commercial Bank'},
      {value: 'Family Office', label: 'Family Office'},
      {value: 'Independent Sponsor', label: 'Independent Sponsor'},
      {value: 'Junior Lender', label: 'Junior Lender'},
      {value: 'Mezzanine', label: 'Mezzanine'},
      {value: 'Private Company', label: 'Private Company'},
      {value: 'Private Equity', label: 'Private Equity'},
      {value: 'SBIC', label: 'SBIC'},
      {value: 'Search Fund', label: 'Search Fund'},
      {value: 'Senior Lender', label: 'Senior Lender'},
      {value: 'Venture Debt', label: 'Venture Debt'},
    ],
    selectedOption: [],
    rules: ['required'],
    validation: '',
  },
  company_name: {
    display_name: 'Company Name',
    name: 'company_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
  },
  company_url: {
    display_name: 'Company URL',
    name: 'company_url',
    value: '',
    type: 'text',
    rules: ['url'],
    validation: '',
  },
  founding_year: {
    display_name: 'Founding Year',
    name: 'founding_year',
    value: '',
    type: 'number',
    rules: ['year', 'required'],
    validation: '',
  },
  country: {
    display_name: 'Select Country',
    name: 'country',
    type: 'select',
    options: [],
    selectedOption: {},
    rules: [],
    validation: '',
  },
  state: {
    display_name: 'Select State',
    name: 'state',
    type: 'select',
    options: [],
    selectedOption: {},
    rules: [],
    validation: '',
  },
  city: {
    display_name: 'City Name',
    name: 'city',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  },
  company_logo: {
    name: 'company_logo',
    display_name: 'Logo',
    type: 'image_upload',
    file: null,
    url: null,
    rules: [],
    validation: '',
  },
  company_description: {
    display_name: 'Company Description',
    name: 'company_description',
    value: '',
    type: 'textarea',
    rows: '8',
    rules: ['required'],
    validation: '',
  },
}

const keyMetrics = {
  formRules: ['validation_required'],
  open_fund: {
    display_name: 'Current fund name',
    name: 'open_fund',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  },
  aum: {
    display_name: 'AUM',
    name: 'aum',
    value: 0,
    type: 'number',
    rules: [],
    validation: '',
    display_mode: 'currency',
  },
  status: {
    display_name: 'Profile Status',
    name: 'status',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  },
  active_investments: {
    display_name: 'Active Investments',
    name: 'active_investments',
    type: 'select',
    options: [
      {value: '0-5', label: '0-5'},
      {value: '6-10', label: '6-10'},
      {value: '11-20', label: '11-20'},
      {value: '21+', label: '21+'},
    ],
    selectedOption: {},
    rules: [],
    validation: '',
  },
  closed_fund: {
    display_name: 'Most Recent Closed Fund',
    name: 'closed_fund',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  },
  dry_powder: {
    display_name: 'Dry Powder',
    name: 'dry_powder',
    value: 0,
    type: 'number',
    rules: [],
    validation: '',
    display_mode: 'currency',
  },
  new_investments: {
    display_name: 'New Investments',
    name: 'new_investments',
    value: 0,
    type: 'number',
    rules: [],
    validation: '',
  },
  realized_investments: {
    display_name: 'Realized Investments',
    name: 'realized_investments',
    value: 0,
    type: 'number',
    rules: [],
    validation: '',
  },
}

let sortCountries = Object.keys(countriesList.countries).map((countryKey) => {
  return { label: countriesList.countries[countryKey].name, value: countriesList.countries[countryKey].name }
})

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      let x = a[key]; let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

sortCountries = sortByKey(sortCountries, 'label')

let AMERICA;

sortCountries = sortCountries.filter((currentCountry, i) => {
  if(currentCountry.label === 'United States'){
    AMERICA = currentCountry
    return false
  } else {
    return true
  }
})

sortCountries.unshift(AMERICA)

companyOverview.country.options = sortCountries

companyOverview.state.options = Object.keys(us.states).filter((stateKey) => {
  return us.states[stateKey].name !== "American Samoa"
}).map((stateKey) => {
  return { label: us.states[stateKey].name, value: us.states[stateKey].name }
})

const intialState = {
  status: 'ready',
  password_match: true,
  email_status: false,
  modal_status: false,
  formData: {
    company_overview: companyOverview,
    key_metrics: keyMetrics,
    newUser: newUser,
  },
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'HOMEPAGE_REGISTER_SUBMIT':
      return fromJS(state)
        .set('status', action.status)
        .toJS();
    case 'HOMEPAGE_REGISTER_PASSWORD_MATCH':
      return fromJS(state)
        .set('password_match', action.status)
        .toJS();
    case 'HOMEPAGE_REGISTER_ON_SELECT':
      return fromJS(state)
        .setIn(action.path.concat(['selectedOption']), action.option)
        .setIn(action.path.concat(['validation']), InputValidator(action.option, fromJS(state).getIn(action.path).toJS().rules, 'select'))
        .toJS();
    case 'HOMEPAGE_REGISTER_INPUT_VALIDATION':
      return fromJS(state)
        .setIn(action.path, action.validation)
        .toJS()
    case 'HOMEPAGE_REGISTER_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    case 'HOMEPAGE_REGISTER_CHECK_EMAIL':
      return {
        ...state,
        email_status: action.status,
      }
    case 'HOMEPAGE_REGISTER_TOGGLE_MODAL':
      return {
        ...state,
        modal_status: action.toggle,
      }
    case 'HOMEPAGE_REGISTER_FILE_DROP':
      if(action.rejectedFiles.length !== 0){
        return state;
      } else{
        return fromJS(state)
          .setIn(['formData', 'company_overview', 'company_logo', 'url'], action.acceptedFiles[0].preview)
          .setIn(['formData', 'company_overview', 'company_logo', 'file'], action.acceptedFiles[0])
          .toJS();
      }
    default:
      return state;
  }
};
