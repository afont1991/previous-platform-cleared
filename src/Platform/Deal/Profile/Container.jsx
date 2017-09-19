import { connect } from 'react-redux'
import * as actions from './Actions'
import DealProfileComponent from './Component'

const mapStateToProps = (state) => {
  return {
    state: state.DealProfile,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDealProfile: (DealId = null) => {
      dispatch(actions.fetchDealAction(DealId))
    },
    submitUpdateMatchRequest: (matchInfo) => {
      dispatch(actions.submitUpdateMatchRequest(matchInfo))
    },
    submitMatchRequest: (matchInfo) => {
      dispatch(actions.submitMatchRequest(matchInfo))
    },
  }
}

const DealProfileContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DealProfileComponent)

export default DealProfileContainer
