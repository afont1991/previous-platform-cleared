import { fromJS } from 'immutable';
import us from 'us'
import countriesList from 'countries-list'


const regions = [
  {label: 'United States', value: 'United States'},
  {label: 'Northeast - New England', value: 'Northeast - New England'},
  {label: 'Northeast - Mid-Atlantic', value: 'Northeast - Mid-Atlantic'},
  {label: 'Midwest - East North Central', value: 'Midwest - East North Central'},
  {label: 'Midwest - West North Central', value: 'Midwest - West North Central'},
  {label: 'South - South Atlantic', value: 'South - South Atlantic'},
  {label: 'South - East South Central', value: 'South - East South Central'},
  {label: 'South - West South Central', value: 'South - West South Central'},
  {label: 'West - Mountain', value: 'West - Mountain'},
  {label: 'West - Pacific', value: 'West - Pacific'},
  {label: 'Canada', value: 'Canada'},
  {label: 'Asia', value: 'Asia'},
  {label: 'Europe - Western', value: 'Europe - Western'},
  {label: 'Central, & South America', value: 'Western, Central, & South America'},
  {label: 'Other', value: 'Other'},
]

const newUser = {
  first_name: {
    display_name: 'First Name',
    name: 'first_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
    placeholder: 'First name',
  },
  last_name: {
    display_name: 'Last Name',
    name: 'last_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
    placeholder: 'Last name',
  },
  email: {
    display_name: 'Email',
    name: 'email',
    value: '',
    type: 'email',
    rules: ['required', 'email'],
    validation: '',
    placeholder: 'eg: example@example.com',
  },
  password: {
    display_name: 'Password',
    name: 'password',
    value: '',
    type: 'password',
    rules: ['required', 'password'],
    validation: '',
    placeholder: 'password',
  },
}

const companyOverview = {
  sectionRules: ['validation_required'],
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
      {value: 'Unitranche', label: 'Unitranche'},
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
    placeholder: 'Company Name'
  },
  company_url: {
    display_name: 'Company URL',
    name: 'company_url',
    value: '',
    type: 'text',
    rules: ['url'],
    validation: '',
    placeholder: 'eg: www.example.com',
  },
  founding_year: {
    display_name: 'Founding Year',
    name: 'founding_year',
    value: '',
    type: 'number',
    rules: ['year', 'required'],
    validation: '',
    placeholder: 'eg: 2012',
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
    placeholder: 'City Name',
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
    placeholder: 'Company Description',
  },
  open_fund: {
    display_name: 'Current fund name',
    name: 'open_fund',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
    placeholder: 'Fund Name',
  },
  aum: {
    display_name: 'AUM',
    name: 'aum',
    value: '',
    type: 'number',
    rules: [],
    validation: '',
    display_mode: 'currency',
    placeholder: 'eg: 1 = 1,000,000',
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


const team = {
  sectionRules: ['reset_inputs', 'validate_item'],
  ignoreKeys: ['teamArray', 'ignoreKeys'],
  teamArray: [],
  first_name: {
    display_name: 'First Name',
    name: 'first_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
    placeholder: 'First Name',
  },
  last_name: {
    display_name: 'Last Name',
    name: 'last_name',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
    placeholder: 'Last Name',
  },
  email: {
    display_name: 'Email Address',
    name: 'email',
    value: '',
    type: 'email',
    rules: ['required', 'email'],
    validation: '',
    placeholder: 'eg: example@example.com',
  },
  linkedin_url: {
    display_name: 'Linkedin Url',
    name: 'linkedin_url',
    value: '',
    type: 'text',
    rules: ['url'],
    validation: '',
    placeholder: 'Linkedin url',
  },
  title: {
    display_name: 'Title',
    name: 'title',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
    placeholder: 'eg: CEO / Partner'
  },
}

let criteria = {
  sectionRules: ['validation_required'],
  Geography: {
    name: 'Geography',
    display_name: 'Geography',
    rules: [],
    type: 'multi_select',
    options: regions,
    validation: '',
  },
  Characteristics: {
    rules: [],
    type: 'multi_select',
    validation: '',
  },
  Financials: {
    rules: [],
    type: 'multi_range',
    validation: '',
  },
  Industries: {
    rules: [],
    type: 'multi_select',
    validation: '',
  },
  ExcludedIndustries: {
    name: 'ExcludedIndustries',
    display_name: "Excluded Industries",
    rules: [],
    type: 'multi_select',
    validation: '',
  },
  Scenarios: {
    rules: [],
    type: 'multi_select',
    validation: '',
  },
  Size: {
    rules: [],
    type: 'multi_range',
    validation: '',
  },
  TypesOfCapital: {
    rules: [],
    type: 'multi_select',
    validation: '',
  },
}

let lenderTransactions = {
  sectionRules: ['reset_inputs', 'validate_item'],
  ignoreKeys: ['transactionArray', 'ignoreKeys'],
  transactionArray: [],
  date: {
    display_name: 'Date',
    name: 'date',
    value: '',
    type: 'date',
    rules: ['date'],
    placeholder: 'Transaction Date',
    validation: '',
  },
  transaction_size: {
    display_name: 'Transaction Size',
    name: 'transaction_size',
    type: 'select',
    options: [
      {label: 'undisclosed', value: 'undisclosed'},
      {label: '$0 - 10M', value: '$0 - 10M'},
      {label: '$10 - 25M', value: '$10 - 25M'},
      {label: '$25 - 50M', value: '$25 - 50M'},
      {label: '$50 - 100M', value: '$50 - 100M'},
      {label: '$100M+', value: '$100M+'},
    ],
    selectedOption: {label: 'undisclosed', value: 'undisclosed'},
    rules: [],
    validation: '',
  },
  company: {
    display_name: 'Company',
    name: 'company',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
    placeholder: 'Company Name',
  },
  Industries: {
    display_name: 'Industry',
    name: 'Industries',
    rules: [],
    type: 'select',
    validation: '',
  },
  TypesOfCapital: {
    display_name: 'Type Of capital',
    name: 'TypesOfCapital',
    rules: [],
    type: 'select',
    validation: '',
  },
  Scenarios: {
    display_name: 'Scenario',
    name: 'Scenarios',
    rules: [],
    type: 'select',
    validation: '',
  },
}

let borrowerTransactions = {
  sectionRules: ['reset_inputs', 'validate_item'],
  ignoreKeys: ['transactionArray', 'ignoreKeys'],
  transactionArray: [],
  date: {
    display_name: 'Date',
    name: 'date',
    value: '',
    type: 'date',
    rules: ['date'],
    validation: '',
  },
  description: {
    display_name: 'Description',
    name: 'description',
    value: '',
    type: 'text',
    rules: [],
    validation: '',
  },
  company: {
    display_name: 'Company',
    name: 'company',
    value: '',
    type: 'text',
    rules: ['required'],
    validation: '',
  },
  Industries: {
    display_name: 'Industry',
    name: 'Industries',
    rules: [],
    type: 'select',
    validation: '',
  },
  Scenarios: {
    display_name: 'Scenario',
    name: 'Scenarios',
    rules: [],
    type: 'select',
    validation: '',
  },
  transaction_size: {
    display_name: 'Transaction Size',
    name: 'transaction_size',
    type: 'select',
    options: [
      {label: 'undisclosed', value: 'undisclosed'},
      {label: '$0 - 10M', value: '$0 - 10M'},
      {label: '$10 - 25M', value: '$10 - 25M'},
      {label: '$25 - 50M', value: '$25 - 50M'},
      {label: '$50 - 100M', value: '$50 - 100M'},
      {label: '$100M+', value: '$100M+'},
    ],
    selectedOption: {label: 'undisclosed', value: 'undisclosed'},
    rules: [],
    validation: '',
  },
}

const intialState = {
  status: 'pending',
  error: {},
  formData: {
    currentSection: 'overview',
    overview: companyOverview,
    team: team,
    lender_transactions: lenderTransactions,
    borrower_transactions: borrowerTransactions,
    criteria: criteria,
    submit_url: '/api/company/create',
  },
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'COMPANY_CREATE_UNMOUNT':
      return intialState;
    case "COMPANY_CREATE_SET_STATUS":
      switch (action.status) {
        case 'pending':
          return fromJS(state).set('status', action.status).toJS();
        case 'error':
          return fromJS(state).set('status', action.status).set('error', action.response).toJS();
        default:
          return fromJS(state).set('status', 'ready').set('error', {}).toJS();
      }
    case "COMPANY_CREATE_INIT_FORM":
      const lookups = action.response.body.payload.lookups;

      Object.keys(lookups).forEach((lookupKey) => {
        let currentCriteria = state.formData.criteria[lookupKey];
        let currentLookup = lookups[lookupKey];
        currentCriteria.name = lookupKey;
        currentCriteria.display_name = lookupKey;
        if(lookupKey === 'TypesOfCapital'){
          currentCriteria.display_name = 'Types Of Capital';
          state.formData.lender_transactions.TypesOfCapital.selectedOption = null
          state.formData.lender_transactions.TypesOfCapital.options = currentLookup.map((singleLookup) => {
            return {value: singleLookup.id, label: singleLookup.name}
          })
        }
        if(lookupKey === 'Industries'){
          state.formData.borrower_transactions.Industries.selectedOption = null
          state.formData.borrower_transactions.Industries.options = currentLookup.map((singleLookup) => {
            return {value: singleLookup.id, label: singleLookup.name}
          })
          state.formData.lender_transactions.Industries.selectedOption = null
          state.formData.lender_transactions.Industries.options = currentLookup.map((singleLookup) => {
            return {value: singleLookup.id, label: singleLookup.name}
          })
        }
        if(lookupKey === 'Scenarios'){
          state.formData.borrower_transactions.Scenarios.selectedOption = null
          state.formData.borrower_transactions.Scenarios.options = currentLookup.map((singleLookup) => {
            return {value: singleLookup.id, label: singleLookup.name}
          })
          state.formData.lender_transactions.Scenarios.selectedOption = null
          state.formData.lender_transactions.Scenarios.options = currentLookup.map((singleLookup) => {
            return {value: singleLookup.id, label: singleLookup.name}
          })
        }
        switch (currentCriteria.type) {
          case 'multi_select':
            currentCriteria.selectedOption = [];
            currentCriteria.options = currentLookup.map((singleLookup) => {
              return {value: singleLookup.id, label: singleLookup.name}
            })
            if(lookupKey === 'Industries'){
              state.formData.criteria['ExcludedIndustries'].selectedOption = [];
              state.formData.criteria['ExcludedIndustries'].options = currentLookup.map((singleLookup) => {
                return {value: singleLookup.id, label: singleLookup.name}
              })
            }
            break;
          case 'multi_range':
            currentCriteria.ranges = {}
            currentLookup.forEach((lookup) => {
              currentCriteria.ranges[lookup.id] = {
                name:  lookup.id,
                display_name:  lookup.name,
                value:  '',
                type: 'range',
                step: 10,
                min_range: 0,
                min_value: 0,
                min_on: true,
                max_range: 500,
                max_value: 0,
                max_on: true,
                rules:  ['min_max'],
                validation:  '',
                path: ['formData', 'criteria', lookupKey, 'ranges', lookup.id.toString()]
              }
            });
            break;
          default:
            console.log('!');
        }
      });
      if(action.response.body.payload.isAdmin === true){
        state.formData.newUser = newUser
      }
      return fromJS(state).set('status', action.status).toJS();
    default:
      return state;
  }
};
