import { connect } from 'react-redux'
import * as actions  from './Actions'
import CompanyProfileComponent from './Component'

const mapStateToProps = (state) => {
  return {
    state: state.CompanyProfile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompanyProfile: (companyId = null) => {
      dispatch(actions.fetchCompanyAction(companyId))
    },
    fetchActiveDeals: (companyId) => {
      dispatch(actions.fetchActiveDeals(companyId))
    },
    onActiveDealSelect: (selected) => {
      dispatch(actions.onActiveDealSelect(selected))
    },
    submitMatchRequest: (matchInfo) => {
      dispatch(actions.submitMatchRequest(matchInfo))
    },
    unMount: () => {
      dispatch(actions.unMount())
    }
  }
}

const CompanyProfileContainer = connect(
  mapStateToProps, mapDispatchToProps
)(CompanyProfileComponent)

export default CompanyProfileContainer
