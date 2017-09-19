
export default (state = {loginStatus: false}, action) => {
  switch (action.type) {
    case "LOGIN":
      const newState = {
        loginStatus: action.status
      }
      return newState;
    default:
      return state;
  }
};
