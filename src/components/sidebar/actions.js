import { AsyncStorage } from 'react-native';

export default (dispatch) => {
  return {
    logout: () => {
      AsyncStorage.multiRemove(['token', 'payload'], (err) => {
        dispatch({
          type: "LOGIN"
        })
      });
    },    
    gotoDashboard: () => {
      dispatch({
        type: "DASHBOARD"
      })
    },
    gotoCashier: () => {
      dispatch({
        type: "CASHIER"
      })
    },
    gotoKitchen: () => {
      dispatch({
        type: "KITCHEN"
      })
    },
    gotoSettings: () => {
      dispatch({
        type: "SETTINGS"
      })
    }
  }  
};

