export const loginAction = (loginStatus, userAuth) => {
  return {
    type: 'LOGIN',
    status: loginStatus,
    userAuth: userAuth
  }
}
