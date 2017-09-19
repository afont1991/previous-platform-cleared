import { fromJS } from 'immutable';

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

const intialState = {
  status: 'pending',
  init: false,
  lookups: {},
  filterData: {
    Industries: {
      name: 'Industries',
      databaseName: 'DealIndustry',
      lookupName: 'LookupIndustry',
      selected: false,
      type: 'multi-select',
      options: [],
      chosenOptions: [],
    },
    Scenarios: {
      name: 'Scenarios',
      databaseName: 'DealScenario',
      lookupName: 'LookupScenario',
      selected: false,
      type: 'multi-select',
      options: [],
      chosenOptions: [],
    },
    TypesOfCapital: {
      name: 'Types of capital',
      databaseName: 'DealTypeOfCapital',
      lookupName: 'LookupTypesOfCapital',
      selected: false,
      type: 'multi-select',
      options: [],
      chosenOptions: [],
    },
    TransactionSize: {
      name: 'Seeking debt amount',
      databaseName: 'DealTypeOfCapitals',
      queryType: 'transaction-amount',
      special: true,
      selected: false,
      type: 'range',
      min: 0,
      max: 0,
    },
    Location: {
      name: 'Region',
      selected: false,
      type: 'multi-select',
      options: regions,
      chosenOptions: [],
    },
    Revenue: {
      databaseName: 'Financials',
      colName: 'revenue',
      queryType: 'between',
      name: 'Revenue',
      selected: false,
      type: 'range',
      min: 0,
      max: 0,
    },
    Ebitda: {
      databaseName: 'Financials',
      colName: 'ebitda',
      queryType: 'between',
      name: 'EBITDA',
      selected: false,
      type: 'range',
      min: 0,
      max: 0,
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
    sorting: [['title', 'ASC']],
  },
  resubmit: false,
  dealResults: [],
  error: {},
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'DEAL_SEARCH_UNMOUNT':
      return fromJS(state)
        .set('init', false)
        .set('initFilters', false)
        .set('resubmit', false)
        .set('checkPageResults', false)
        .set('filterData', intialState.filterData)
        .set('status', 'pending')
        .set('dealResults', [])
        .set('lookups', {})
        .toJS()
    case 'COMPANY_SEARCH_UNSET_PENDING_PAGE':
      return fromJS(state)
        .set('checkPageResults', false)
        .setIn(['filterData', 'page'], action.newPageNumber)
        .toJS()
    case 'DEAL_SEARCH_NEXT_PAGE':
      return fromJS(state)
        .setIn(['filterData', 'page'], state.filterData.page + 1)
        .set('checkPageResults', true)
        .set('resubmit', true)
        .toJS()
    case 'DEAL_SEARCH_PREVIOUS_PAGE':
      return fromJS(state)
        .setIn(['filterData', 'page'], state.filterData.page - 1)
        .set('resubmit', true)
        .toJS()
    case 'DEAL_SEARCH_SHOW_HIDE_FILTER':
      return fromJS(state)
        .setIn(action.filterPath, !action.selected)
        .toJS();
    case 'DEAL_SEARCH_ONCHANGE':
      return fromJS(state)
        .setIn(action.inputPath, action.input.target.value)
        .toJS();
    case 'DEAL_SEARCH_SELECT':
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
    case 'DEAL_SEARCH_FILTER_SUBMIT':
      switch (action.status) {
        case 'pending':
          return fromJS(state)
            .set('status', action.status)
            .set('resubmit', false)
            .set('dealResults', [])
            .toJS();
        case 'error':
          return fromJS(state)
            .set('status', action.status)
            .set('resubmit', false)
            .set('dealResults', [])
            .set('error', action.response)
            .toJS();
        default:
          return fromJS(state)
            .set('status', action.status)
            .set('dealResults', action.response.body.payload)
            .set('resubmit', false)
            .toJS();

      }
    case "FETCH_DEAL_SEARCH_LOOKUPS":
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
          const initDealResults = action.response.body.payload.results

          const types = lookups['TypesOfCapital'];
          const scenarios = lookups['Scenarios'];
          const industries = lookups['Industries'];

          let scenariosOptions = [];
          let typesOptions = [];
          let industriesOptions = [];

          scenarios.forEach((scenario, i) => {
            scenariosOptions.push({value: scenario.id, label: scenario.name});
          });
          types.forEach((type, i) => {
            typesOptions.push({value: type.id, label: type.name});
          });
          industries.forEach((industry, i) => {
            industriesOptions.push({value: industry.id, label: industry.name});
          });
          if(action.response.body.payload.savedFilters){
            return fromJS(state)
              .set('status', action.status)
              .set('init', true)
              .set('initFilters', false)
              .set('resubmit', true)
              .set('checkPageResults', false)
              .set('filterData', action.response.body.payload.savedFilters)
              .setIn(['lookups', 'typesOptions'], typesOptions)
              .setIn(['lookups', 'scenariosOptions'], scenariosOptions)
              .setIn(['lookups', 'industriesOptions'], industriesOptions)
              .toJS();
          } else {
            return fromJS(state)
              .set('status', action.status)
              .set('init', true)
              .set('initFilters', false)
              .set('resubmit', true)
              .set('checkPageResults', false)
              .set('dealResults', initDealResults)
              .setIn(['lookups', 'typesOptions'], typesOptions)
              .setIn(['lookups', 'scenariosOptions'], scenariosOptions)
              .setIn(['lookups', 'industriesOptions'], industriesOptions)
              .setIn(['filterData', 'Scenarios', 'options'], scenariosOptions)
              .setIn(['filterData', 'Industries', 'options'], industriesOptions)
              .setIn(['filterData', 'TypesOfCapital', 'options'], typesOptions)
              .toJS();
          }
      }
    default:
      return state;
  }
};
