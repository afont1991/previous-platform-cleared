import { fromJS } from 'immutable';
import us from 'us'

const StateOptions = Object.keys(us.states).map((stateKey) => {
  return { label: us.states[stateKey].name, value: us.states[stateKey].name }
})

const regions = [
  {label: 'Northeast - New England', value: 'Northeast - New England'},
  {label: 'Northeast - Mid-Atlantic', value: 'Northeast - Mid-Atlantic'},
  {label: 'Midwest - East North Central', value: 'Midwest - East North Central'},
  {label: 'Midwest - West North Central', value: 'Midwest - West North Central'},
  {label: 'South - South Atlantic', value: 'South - South Atlantic'},
  {label: 'South - East South Central', value: 'South - East South Central'},
  {label: 'South - West South Central', value: 'South - West South Central'},
  {label: 'West - Mountain', value: 'West - Mountain'},
  {label: 'West - Pacific', value: 'West - Pacific'},
  {label: 'Other', value: 'Other'},
]

const CompanyTypes =  [
  {value: 'ABL Lender', label: 'ABL Lender'},
  {value: 'BDC', label: 'BDC'},
  {value: 'Cash-flow Lender', label: 'Cash-flow Lender'},
  {value: 'Commercial Bank', label: 'Commercial Bank'},
  {value: 'Family Office', label: 'Family Office'},
  {value: 'Independent Sponsor', label: 'Independent Sponsor'},
  {value: 'Junior Lender', label: 'Junior Lender'},
  {value: 'Mezzanine', label: 'Mezzanine'},
  {value: 'Private Equity', label: 'Private Equity'},
  {value: 'SBIC', label: 'SBIC'},
  {value: 'Search Fund', label: 'Search Fund'},
  {value: 'Senior Lender', label: 'Senior Lender'},
  {value: 'Venture Debt', label: 'Venture Debt'},
];

const intialState = {
  status: 'pending',
  init: false,
  resubmit: false,
  checkPageResults: false,
  lookups: {},
  filterData: {
    CompanyName: {
      name: 'Company Name',
      selected: true,
      type: 'range',
      sub_type: 'text',
      value: '',
      placeholder: 'Company Name'
    },
    CompanyTypes: {
      name: 'Company Type',
      selected: false,
      type: 'multi-select',
      options: CompanyTypes,
      selectedOption: [],
    },
    Geographies: {
      name: 'Regions',
      selected: false,
      type: 'multi-select',
      options: regions,
      selectedOption: [],
    },
    Location: {
      name: 'State',
      selected: false,
      type: 'multi-select',
      options: StateOptions,
      selectedOption: [],
    },
    Industries: {
      name: 'Industries',
      databaseName: 'CriteriaIndustries',
      lookupName: 'LookupIndustry',
      selected: false,
      type: 'multi-select',
      options: [],
      selectedOption: [],
    },
    Scenarios: {
      name: 'Scenarios',
      databaseName: 'CriteriaScenarios',
      lookupName: 'LookupScenario',
      selected: false,
      type: 'multi-select',
      options: [],
      selectedOption: [],
    },
    TypesOfCapital: {
      name: 'Types of Capital',
      databaseName: 'CriteriaTypesOfCapital',
      lookupName: 'LookupTypesOfCapital',
      selected: false,
      type: 'multi-select',
      options: [],
      selectedOption: [],
    },
    Characteristics: {
      name: 'Characteristics',
      databaseName: 'CriteriaCharacteristics',
      lookupName: 'LookupCharacteristic',
      selected: false,
      type: 'multi-select',
      options: [],
      selectedOption: [],
    },
    Financials: {
      name: 'Financial Criteria',
      selected: false,
      type: 'multi-range',
      rangeSections: {},
    },
    Sizes: {
      name: 'Size Criteria',
      selected: false,
      type: 'multi-range',
      rangeSections: {},
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
      selectedOption: {label: '10', value: 10},
      rules: [],
      validation: '',
      customClass: 'search-limit-input'
    },
    page: 1,
    limit: 10,
    sorting: [['name', 'ASC']],
  },
  companyResults: [],
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'COMPANY_SEARCH_UPDATE_STATUS':
      return fromJS(state)
        .set('status', action.status)
        .toJS();
    case 'COMPANY_SEARCH_UNMOUNT':
      return fromJS(state)
        .set('init', false)
        .set('filterData', intialState.filterData)
        .set('status', 'pending')
        .set('companyResults', [])
        .set('resubmit', false)
        .set('checkPageResults', false)
        .set('lookups', {})
        .toJS()
    case 'COMPANY_SEARCH_UNSET_PENDING_PAGE':
      return fromJS(state)
        .set('checkPageResults', false)
        .setIn(['filterData', 'page'], action.newPageNumber)
        .toJS()
    case 'COMPANY_SEARCH_SHOW_HIDE_FILTER':
      return fromJS(state)
        .setIn(action.filterPath, !action.selected)
        .toJS();
    case 'COMPANY_SEARCH_NEXT_PAGE':
      return fromJS(state)
        .setIn(['filterData', 'page'], state.filterData.page + 1)
        .set('resubmit', true)
        .set('checkPageResults', true)
        .toJS()
    case 'COMPANY_SEARCH_PREVIOUS_PAGE':
      return fromJS(state)
        .setIn(['filterData', 'page'], state.filterData.page - 1)
        .set('resubmit', true)
        .toJS()
    case 'COMPANY_SEARCH_ONCHANGE':
      return fromJS(state)
        .setIn(action.inputPath, action.input.target.value)
        .toJS();
    case 'COMPANY_SEARCH_SELECT':
      if(action.extra && action.extra.limit){
        return fromJS(state)
          .setIn(action.selectedPath.concat(['selectedOption']), action.selected)
          .setIn(['filterData', 'limit'], action.selected.value)
          .setIn(['filterData', 'page'], 1)
          .set('resubmit', true)
          .toJS();
      } else {
        return fromJS(state)
          .setIn(action.selectedPath.concat(['selectedOption']), action.selected)
          .toJS();
      }
    case 'COMPANY_SEARCH_FILTER_SUBMIT':
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('resubmit', false)
            .set('companyResults', [])
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('resubmit', false)
            .set('companyResults', [])
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('resubmit', false)
            .set('companyResults', action.response.body.payload)
            .toJS();

      }
    case "FETCH_COMPANY_SEARCH_LOOKUPS":
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('lookups', {})
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('lookups', {})
            .set('error', action.response)
            .toJS();
        default:
          const lookups = action.response.body.payload.lookups
          let scenariosOptions = [];
          let typesOptions = [];
          let industriesOptions = [];
          let characteristicsOptions = [];

          // Selects
          const types = lookups['TypesOfCapital'];
          const scenarios = lookups['Scenarios'];
          const industries = lookups['Industries'];
          const characteristics = lookups['Characteristics'];

          scenarios.forEach((scenario, i) => {
            scenariosOptions.push({value: scenario.id, label: scenario.name});
          });
          types.forEach((type, i) => {
            typesOptions.push({value: type.id, label: type.name});
          });
          industries.forEach((industry, i) => {
            industriesOptions.push({value: industry.id, label: industry.name});
          });
          characteristics.forEach((characteristic, i) => {
            characteristicsOptions.push({value: characteristic.id, label: characteristic.name});
          });
          if(action.response.body.payload.savedFilters){
            return fromJS(state)
              .set('status', action.status)
              .set('init', true)
              .set('resubmit', true)
              .set('checkPageResults', false)
              .set('filterData', action.response.body.payload.savedFilters)
              .setIn(['lookups', 'typesOptions'], typesOptions)
              .setIn(['lookups', 'scenariosOptions'], scenariosOptions)
              .setIn(['lookups', 'industriesOptions'], industriesOptions)
              .toJS();
          } else {
            const initCompanyResults = action.response.body.payload.results

            // Ranges
            const financials = lookups['Financials'];
            const sizes = lookups['Size'];

            let CompanyName = ''
            if(action.CompanyName){
              CompanyName = action.CompanyName
            }

            financials.forEach((financial) => {
              state.filterData.Financials.rangeSections[financial.id] = {
                databaseName: 'CriteriaFinancials',
                lookupName: 'LookupFinancial',
                name: financial.name,
                id: financial.id,
                selected: false,
                type: 'range',
                sub_type: 'number',
                value: 0,
              };
            });

            sizes.forEach((size) => {
              state.filterData.Sizes.rangeSections[size.id] = {
                databaseName: 'CriteriaSize',
                lookupName: 'LookupSize',
                name: size.name,
                id: size.id,
                selected: false,
                type: 'range',
                sub_type: 'number',
                value: 0,
              };
            });

            return fromJS(state)
              .set('status', action.status)
              .set('init', true)
              .set('resubmit', true)
              .set('checkPageResults', false)
              .set('companyResults', initCompanyResults)
              .setIn(['lookups', 'typesOptions'], typesOptions)
              .setIn(['lookups', 'scenariosOptions'], scenariosOptions)
              .setIn(['lookups', 'industriesOptions'], industriesOptions)
              .setIn(['filterData', 'CompanyName', 'value'], CompanyName)
              .setIn(['filterData', 'Characteristics', 'options'], characteristicsOptions)
              .setIn(['filterData', 'Scenarios', 'options'], scenariosOptions)
              .setIn(['filterData', 'Industries', 'options'], industriesOptions)
              .setIn(['filterData', 'TypesOfCapital', 'options'], typesOptions)
              .setIn(['filterData', 'Financials', 'rangeSections'], state.filterData.Financials.rangeSections)
              .toJS();
          }
      }
    default:
      return state;
  }
};
