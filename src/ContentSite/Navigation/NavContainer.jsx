import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
import Nav from './Nav'

const mapStateToProps = (state) => {
  return {
    LoginStatus: false
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

const NavContainer = connect(
  mapStateToProps
)(Nav)

export default NavContainer
