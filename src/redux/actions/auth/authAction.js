// export const changeRole = role => {
//   return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
// }

export const setAuth = (isAuthenticated) => ({ 
  type:"LOGIN", 
  isAuthenticated 
});