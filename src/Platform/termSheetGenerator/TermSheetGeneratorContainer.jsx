import { connect } from 'react-redux'
import { nextSectionAction, SelectSectionAction, SubmitFormAction } from './TermSheetGeneratorActions'
import TermSheetGenerator from './TermSheetGenerator'

const mapStateToProps = (state) => {
  return {
    TermSheetFormData: state.TermSheetGeneratorReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    NextClick: (updatedSectionState) => {
      dispatch(nextSectionAction(updatedSectionState))
    },
    SelectSection: (sectionIndex) => {
      dispatch(SelectSectionAction(sectionIndex))
    },
    SubmitForm: (formData) => {
      dispatch(SubmitFormAction(formData))
    }
  }
}

const TermSheetGeneratorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TermSheetGenerator)

export default TermSheetGeneratorContainer
