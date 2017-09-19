import { fromJS } from 'immutable';
import InputValidator from '../../../Helpers/InputValidator'
import * as Utils from './Utils'
import moment from 'moment'

function stylizedInput(type){
  return {
    value: '',
    type: `stylized-${type}`,
    rules: [],
    validation: '',
    placeholder: 'eg: 1 = 1,000,000',
  }
}

const regions = [
  {label: 'US Nationwide', value: 'US Nationwide'},
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

let documentSection = {
  formRules: [],
  teaser: {
    name: 'teaser',
    display_name: 'Teaser',
    type: 'file_upload',
    file: null,
    rules: [],
    validation: '',
  },
  nda: {
    name: 'nda',
    display_name: 'NDA',
    type: 'file_upload',
    file: null,
    rules: [],
    validation: '',
  },
  cim: {
    name: 'cim',
    display_name: 'CIM',
    type: 'file_upload',
    file: null,
    rules: [],
    validation: '',
  },
}

const intialState = {
  status: 'pending',
  // status: 'pending',
  error: {},
  currentSection: 'company_overview',
  completedSections: [],
  formData: {
    formRules: ['validation_required'],
    title: {
      display_name: 'Deal title',
      name: 'title',
      value: '',
      type: 'text',
      rules: ['required'],
      validation: '',
      placeholder: 'Deal title',
    },
    industries: {
      display_name: 'Industries',
      name: 'industries',
      type: 'multi_select',
      options: [],
      selectedOption: [],
      rules: ['required'],
      validation: '',
    },
    founded: {
      display_name: 'Founding year',
      name: 'founded',
      value: '',
      type: 'number',
      rules: ['year', 'required'],
      validation: '',
      placeholder: 'eg: 2012'
    },
    headline: {
      display_name: 'Deal headline',
      name: 'headline',
      value: '',
      type: 'text',
      rules: ['required'],
      validation: '',
      placeholder: 'Deal headline',
    },
    region: {
      display_name: 'Select region',
      name: 'region',
      type: 'select',
      options: regions,
      selectedOption: {},
      rules: ['required'],
      validation: '',
    },
    sponsored: {
      display_name: 'Sponsored or Non-sponsored',
      name: 'sponsored',
      type: 'select',
      options: [
        {value: 'sponsored', label: 'sponsored'},
        {value: 'non-sponsored', label: 'non-sponsored'},
      ],
      selectedOption: {},
      rules: ['required'],
      validation: '',
    },
    private_mode: {
      display_name: 'Select privacy mode',
      name: 'private_mode',
      type: 'select',
      options: [
        {value: 'Private', label: 'Private'},
        {value: 'Public', label: 'Public'},
      ],
      selectedOption: {value: 'Public', label: 'Public'},
      rules: ['required'],
      validation: '',
    },
    blind_sponsor: {
      display_name: 'Blind sponsor',
      name: 'blind_sponsor',
      type: 'select',
      options: [
        {value: 'Yes', label: 'Yes'},
        {value: 'No', label: 'No'},
      ],
      selectedOption: {value: 'No', label: 'No'},
      rules: ['required'],
      validation: '',
    },
    financial_review_level: {
      display_name: 'Financial Review Level',
      tool_tip: 'During the last 12 months',
      name: 'financial_review_level',
      type: 'select',
      options: [
        {value: 'Audited', label: 'Audited'},
        {value: 'Reviewed', label: 'Reviewed'},
        {value: 'Compiled', label: 'Compiled'},
        {value: 'None', label: 'None'},
      ],
      selectedOption: {},
      rules: ['required'],
      validation: '',
    },
    status: {
      display_name: 'Deal status',
      name: 'status',
      type: 'select',
      options: [
        {label: 'Marketing', value: 'Marketing'},
        {label: 'Due Diligence', value: 'Due Diligence'},
        {label: 'Closed', value: 'Closed'},
        {label: 'Removed', value: 'Removed'},
      ],
      selectedOption: {},
      rules: [],
      validation: '',
    },
    termsheet_date: {
      display_name: 'Expected term sheet date',
      name: 'termsheet_date',
      value: '',
      type: 'date',
      rules: ['required', 'date'],
      validation: '',
    },
    description: {
      display_name: 'Deal description',
      name: 'description',
      value: '',
      type: 'textarea',
      rows: '8',
      rules: ['required'],
      validation: '',
      placeholder: 'Description',
    },
    contacts: {
      display_name: 'Select contacts from your team',
      name: 'contacts',
      type: 'multi_select',
      options: [],
      selectedOption: [],
      rules: [],
      validation: '',
    },
    transaction_scenario: {
      display_name: 'Transaction Scenario',
      name: 'transaction_scenario',
      type: 'select',
      options: [],
      selectedOption: {},
      rules: ['required'],
      validation: '',
    },
    debt_type_amount_form: {
      formRules: ['validation_required'],
      debt_type: {
        display_name: 'Debt Type',
        name: 'debt_type',
        type: 'select',
        options: [],
        selectedOption: {},
        rules: ['required'],
        validation: '',
      },
      amount: {
        display_name: 'Amount',
        display_mode: 'currency',
        name: 'amount',
        value: '',
        type: 'number',
        rules: ['required'],
        validation: '',
        placeholder: 'eg: 1 = 1,000,000',
      },
      debtTypeAmountArray: [],
    },
    faq_form: {
      formRules: ['validation_required'],
      question: {
        display_name: 'Question',
        name: 'question',
        value: '',
        type: 'text',
        rules: ['required'],
        validation: '',
        placeholder: 'Question Text'
      },
      answer: {
        display_name: 'Answer',
        name: 'answer',
        value: '',
        type: 'textarea',
        rows: '4',
        rules: ['required'],
        validation: '',
        placeholder: 'Answer Text',
      },
      faqArray: [],
    },
    additional_information: {
      display_name: 'Additional Information',
      name: 'additional_information',
      value: '',
      type: 'textarea',
      rows: '8',
      rules: [],
      validation: '',
      placeholder: 'Additional Information',
    },
    financial_information_form: {
      formRules: [],
      year_1: {value: moment().subtract(2, 'years').format('YYYY')},
      year_2: {value: moment().subtract(1, 'years').format('YYYY')},
      year_3: {value: moment().format('YYYY')},
      revenue_year_1: stylizedInput('money'),
      revenue_year_2: stylizedInput('money'),
      revenue_year_3: stylizedInput('money'),
      revenue_ltm: stylizedInput('money'),
      gross_profit_year_1: stylizedInput('money'),
      gross_profit_year_2: stylizedInput('money'),
      gross_profit_year_3: stylizedInput('money'),
      gross_profit_ltm: stylizedInput('money'),
      gross_profit_percentage_year_1: stylizedInput('percentage'),
      gross_profit_percentage_year_2: stylizedInput('percentage'),
      gross_profit_percentage_year_3: stylizedInput('percentage'),
      gross_profit_percentage_ltm: stylizedInput('percentage'),
      ebitda_year_1: stylizedInput('money'),
      ebitda_year_2: stylizedInput('money'),
      ebitda_year_3: stylizedInput('money'),
      ebitda_ltm: stylizedInput('money'),
      ebitda_percentage_year_1: stylizedInput('percentage'),
      ebitda_percentage_year_2: stylizedInput('percentage'),
      ebitda_percentage_year_3: stylizedInput('percentage'),
      ebitda_percentage_ltm: stylizedInput('percentage'),
      yoy_growth_year_1: stylizedInput('percentage'),
      yoy_growth_year_2: stylizedInput('percentage'),
      yoy_growth_year_3: stylizedInput('percentage'),
      yoy_growth_ltm: stylizedInput('percentage'),
    },
    documentSection: documentSection,
  },
}

export default (state = intialState, action) => {
  switch(action.type) {
    case 'DEAL_EDIT_UNMOUNT':
      return intialState;
    case 'DEAL_EDIT_SET_STATUS':
      return fromJS(state).set('status', action.status).toJS()
    case 'DEAL_EDIT_REQUEST_PROFILE':
      return Utils.MapProfileToState(action.response.body.payload, state)
    case 'DEAL_EDIT_ON_SELECT':
      return fromJS(state)
        .setIn(action.path.concat(['selectedOption']), action.option)
        .setIn(action.path.concat(['validation']), InputValidator(action.option, fromJS(state).getIn(action.path).toJS().rules, 'select'))
        .toJS();
    case 'DEAL_EDIT_INPUT_VALIDATION':
      return fromJS(state)
        .setIn(action.path, action.validation)
        .toJS()
    case 'DEAL_EDIT_DATE_UPDATE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.date)
        .toJS()
    case 'DEAL_EDIT_ON_CHANGE':
      return fromJS(state)
        .setIn(action.path.concat(['value']), action.input.target.value)
        .setIn(action.path.concat(['validation']), InputValidator(action.input.target.value, fromJS(state).getIn(action.path).toJS().rules))
        .toJS();
    case 'DEAL_EDIT_ADD_FAQ':
      const questionValue = state.formData.faq_form.question.value
      const answerValue = state.formData.faq_form.answer.value
      const FaqId = state.formData.faq_form.faqArray.length
        state.formData.faq_form.faqArray.push({id: FaqId, question: questionValue, answer: answerValue})
      return fromJS(state)
      .setIn(['formData', 'faq_form', 'faqArray'], state.formData.faq_form.faqArray)
      .setIn(['formData', 'faq_form', 'question', 'value'], '')
      .setIn(['formData', 'faq_form', 'answer', 'value'], '')
      .toJS()
    case 'DEAL_EDIT_DELETE_FAQ':
      state.formData.faq_form.faqArray[action.id].deleted = true;
      return fromJS(state)
      .toJS()
    case 'DEAL_EDIT_ADD_TYPE_AMOUNT':
      const amountValue = state.formData.debt_type_amount_form.amount.value
      const selectedType = state.formData.debt_type_amount_form.debt_type.selectedOption
      const newId = state.formData.debt_type_amount_form.debtTypeAmountArray.length
      state.formData.debt_type_amount_form.debtTypeAmountArray.push({id: newId, amount: amountValue, debt_type: selectedType})
      return fromJS(state)
      .setIn(['formData', 'debt_type_amount_form', 'debtTypeAmountArray'], state.formData.debt_type_amount_form.debtTypeAmountArray)
      .setIn(['formData', 'debt_type_amount_form', 'amount', 'value'], '')
      .setIn(['formData', 'debt_type_amount_form', 'debt_type', 'selectedOption'], {})
      .toJS()
    case 'DEAL_EDIT_DELETE_TYPE_AMOUNT':
      state.formData.debt_type_amount_form.debtTypeAmountArray[action.id].deleted = true;
      return fromJS(state)
      .toJS()
    case 'DEAL_EDIT_ADD_FINANCIAL':
      const financialId = state.formData.financial_information_form.financialsArray.length
      const newFinancial = {
        id: financialId,
        revenue: state.formData.financial_information_form.revenue.value,
        gross_profit: state.formData.financial_information_form.gross_profit.value,
        ebitda: state.formData.financial_information_form.ebitda.value,
        yoy_growth: state.formData.financial_information_form.yoy_growth.value,
        gross_profit_percentage: state.formData.financial_information_form.gross_profit_percentage.value,
        ebitda_percentage: state.formData.financial_information_form.ebitda_percentage.value,
        fiscal_year: state.formData.financial_information_form.fiscal_year.value,
      }
      state.formData.financial_information_form.financialsArray.push(newFinancial)
      return fromJS(state)
        .setIn(['formData', 'financial_information_form', 'financialsArray'], state.formData.financial_information_form.financialsArray)
        .setIn(['formData', 'financial_information_form', 'revenue', 'value'], '')
        .setIn(['formData', 'financial_information_form', 'gross_profit', 'value'], '')
        .setIn(['formData', 'financial_information_form', 'ebitda', 'value'], '')
        .setIn(['formData', 'financial_information_form', 'yoy_growth', 'value'], '')
        .setIn(['formData', 'financial_information_form', 'gross_profit_percentage', 'value'], '')
        .setIn(['formData', 'financial_information_form', 'ebitda_percentage', 'value'], '')
        .setIn(['formData', 'financial_information_form', 'fiscal_year', 'value'], '')
        .toJS()
    case 'DEAL_EDIT_DELETE_FINANCIAL':
      state.formData.financial_information_form.financialsArray[action.id].deleted = true;
      return fromJS(state)
      .toJS()
    case 'DEAL_EDIT_ON_FILE_DROP':
      return fromJS(state)
        .setIn(action.path.concat('file'), action.acceptedFiles[0])
        .toJS();
    case 'DEAL_EDIT_REMOVE_FILE':
      return fromJS(state)
        .setIn(action.path.concat('file'), null)
        .toJS();
    case 'DEAL_EDIT_STATUS':
      return fromJS(state)
      .set('status', action.status)
      .set('error', action.error)
      .toJS();
    case 'DEAL_EDIT_REQUEST_TEAM':
      const teamData = action.response.body.payload
      state.formData.contacts.options = teamData.map((teamMember) => {
        return {
          label: `${teamMember.title} - ${teamMember.first_name} ${teamMember.last_name}`,
          value: teamMember.id,
        }
      });
      return fromJS(state).toJS()
    case 'DEAL_EDIT_LOOKUPS':
      const lookups = action.response.body.payload.lookups;
      state.formData.industries.options = lookups.Industries.map((industry) => {
        return {
          label: industry.name,
          value: industry.id
        }
      });
      state.formData.transaction_scenario.options = lookups.Scenarios.map((scenario) => {
        return {
          label: scenario.name,
          value: scenario.id,
        }
      });
      state.formData.debt_type_amount_form.debt_type.options = lookups.TypesOfCapital.map((typeOfCapital) => {
        return {
          label: typeOfCapital.name,
          value: typeOfCapital.id,
        }
      });
      return fromJS(state).toJS()
    default:
      return state;
  }
};
