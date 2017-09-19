import { fromJS } from 'immutable';

const intialState = {
  status: 'pending',
  error: {},
  formData: {
    testFile: {
      name: 'testFile',
      display_name: 'Test File',
      type: 'file_upload',
      file: null,
      rules: [],
      validation: '',
    }
  },
}

export default (state = intialState, action) => {
  switch(action.type) {
    case "LAB_INIT":
      return fromJS(state)
        .set('status', 'ready')
        .toJS();
    case "LAB_UNMOUNT":
      return intialState;
    case "LAB_STATUS":
      return fromJS(state)
        .set('status', action.status)
        .toJS();
    case 'LAB_SET_DOWNLOAD':
      return {
        ...state,
        fileUrl: action.url
      }
    case 'LAB_ON_FILE_DROP':
      return fromJS(state)
        .setIn(action.path.concat('url'), action.acceptedFiles[0].preview)
        .setIn(action.path.concat('file'), action.acceptedFiles[0])
        .toJS();
    default:
      return state;
  }
};
