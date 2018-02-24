
export default (dispatch) => {
  return {
    gotoDashboard: id => {
      dispatch({
        type: "DASHBOARD"
      })
    },
    gotoCashier: id => {
      dispatch({
        type: "CASHIER"
      })
    },
    gotoKitchen: id => {
      dispatch({
        type: "KITCHEN"
      })
    },
    gotoSettings: id => {
      dispatch({
        type: "SETTINGS"
      })
    }
  }  
};

