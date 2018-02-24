import { NativeModules } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Navigator from './navigator';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('LOGIN'));

const router = (state = initialState, action) => {
  let nextState = Navigator.router.getStateForAction(action, state);

  switch(action.type) {
    case "MAIN":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MAIN' }),
        state
      );
      break;
    case "DASHBOARD":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DASHBOARD' }),
        state
      );
      break;
    case "CASHIER":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CASHIER' }),
        state
      );
      break;
    case "KITCHEN":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'KITCHEN' }),
        state
      );
      break;
    case "SETTINGS":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SETTINGS' }),
        state
      );
      break;
    case "PRINT":
      let data = {
        printer: "TCP:F8:D0:27:2B:0F:93",
        company: "NOODLE HOUSE",
        company1: "The Original Noodle",
        company2: "30 Elizabeth",
        company3: "Phone 123",
        company4: "ABN 456",
        header: "TAX INVOICE  #0052",
        timestamp: "7/01/07 16:58",
        items: [
          {name: "Hokkien Mee", total: "$12.80"},
          {name: "Prawn Cracker", total: "$2.50"},
        ],
        subtotal: "$20.50",
        discount: "$2.00",
        tax: "$3.00",
        total: "$27.50"
      }

      NativeModules.RNPrinter.print(data).catch((error) => {        
        throw new Error(error.message);      
      });
      break;
  }

  return nextState || state;
}

export default router;
