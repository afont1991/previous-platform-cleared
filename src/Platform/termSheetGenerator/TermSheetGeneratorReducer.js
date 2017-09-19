
import { fromJS } from 'immutable';

const nonImmutableState = {
  terms_conditions: 'no',
  current_section: 0,
  the_parties: {
    borrower_legal_name: "",
    borrower_jurisdiction: "",
    borrower_orgniztion_type: "",
    parent_company: 'no',
    parent_company_legal_name: "",
    parent_jurisdiction: "",
    parent_orgniztion_type: "",
    parent_guarantee: 'no',
    left_lead_arranger: "",
    lead_arranger_as_admin_agent: 'yes',
    administrative_agent_legal_name: "",
    co_arrangers_on_transaction: 'no',
    co_arrangers: "",
    more_than_one_lender: 'no',
    borrower_owned_by_pe_firm: 'no',
    private_equity_sponsor_legal_name: ""
  },
  economics: {
    prinipal_loan_amount: "",
    yrs_to_maturity: "",
    opening_libor_based_interest_rate: "",
    libor_floor_higher_than_zero: 'no',
    libor_floor: 0,
    interest_rate_step_down: 'no',
    default_interest_rate: "",
    oid_or_upfront_fee: 'no',
    oid_or_upfront_fee_percentage_of_face_funded_at_closing: "",
    annual_amortize_rate: "",
    prepayment_penalty: 'no',
    yrs_prepayment_limited: "",
    non_callable_loan_period: 'no',
    yrs_non_callable: "",
    prepayment_first_year_premium: "",
    prepayment_penalty_type: "",
    penalty_for_mandatory_prepayment: "no"
  },
  use_of_proceeds: {
    purpose_of_loan_acquisition: 'no',
    structure_of_acquisition: "",
    seller_name: "",
    aggregate_purchase_consideration: "",
    minimum_equity_contribution_required: 'no',
    minimum_equity_contribution_fixed_or_percentage: "Fixed",
    minimum_required_amount: "",
    minimum_required_percentage: "",
    proceeds_purpose: "",
    existing_debt_repaid_as_secondary_use_of_proceeds: 'no',
    aggregate_transaction_expense_cap: 'no',
    aggregate_transaction_expense_cap_amount: ""
  },
  incremental_facility: {
    incremental_facility: 'no',
    incremental_facility_fixed_dollar_or_leverage: "Dollar",
    maximum_size_fixed: "",
    addtional_leverage_test: 'no',
    ratio_type_fixed_covenant: "Fixed",
    types_of_leverage_chosen: [],
    turns_of_EBITDA: "",
    freebie_basket_not_subject_to_leverage_test: 'no',
    freebie_basket_size: "",
    leverage_tighter_than_covenant: 'no',
    how_many_turns_of_EBITDA_tighter: "",
    consent_rights_list_over_new_lenders: [],
    consent_rights_list_over_terms_of_incremental_facility: [],
  },
  prepayments: {
    excess_cash_flow_sweep: 'no',
    ecf_to_be_swept: "",
    ecf_step_downs_based_on_leverage: 'no',
    equity_sweep: 'no',
    equity_proceeds_initially_swept: "",
    equity_sweep_step_downs: 'no',
    mandatory_prepayments_pro_rata_or_inverse:  "",
    voluntary_prepayments_pro_rata_or_as_directed: ""
  },
  covenants: {
    borrower_deliver_consolidating_financials: 'no',
    borrower_monthly_financials: 'no',
    credit_parties_limited_amendments: 'no',
    borrower_hedge_interest_rate_risk: 'no',
    capital_expenditures_limit: 'no',
    financial_covenants: 'no',
    maximum_leverage_ratio: 'no',
    leverage_ratio_types: [],
    maximum_initial_leverage_ratio: "",
    future_leverage_step_down: 'no',
    minimum_interest_coverage_ratio: 'no',
    minimum_interest_coverage_ratio_amount: "",
    minimum_fixed_charge_ratio: 'no',
    minimum_fixed_charge_ratio_amount: ""
  },
  credit_support_miscellaneous: {
    guarantees_required_from_immaterial_subsidiaries: 'no',
    account_control_agreements_for_deposit_and_securities: 'no',
    mortgages_for_owned_or_acquired: 'no',
    mortgages_leased_by_credit_parties: 'no',
    borrower_consent_rights_over_assignments_to_unaffiliated_new_lenders: 'no',
    parties_with_consent_rights_over_assignments: []
  }
}

const sectionIdMap = [
  'terms_conditions',
  'the_parties',
  'economics',
  'use_of_proceeds',
  'incremental_facility',
  'prepayments',
  'covenants',
  'credit_support_miscellaneous'
];

export default (state = nonImmutableState, action) => {
  switch (action.type) {
    case "NEXT_SECTION":
      const currentSectionNum = state.current_section;
      const currentSectionName = sectionIdMap[currentSectionNum];
      let NextSection = 0;
      if(currentSectionNum < 7) {
        NextSection = currentSectionNum + 1;
      }
      return fromJS(state).set('current_section', NextSection).set(currentSectionName, action.updatedSection).toJS();
    case "SELECTED_SECTION":
      return fromJS(state).set('current_section', action.SectionIndex).toJS();
    default:
      return state;
  }
};
