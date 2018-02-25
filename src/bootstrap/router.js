import { NativeModules } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Navigator from './navigator';
import { Helper } from '../utils';

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
      let setting = {
        name: "TAX INVOICE",
        receiptPrinter: "TCP:F8:D0:27:2B:0F:93",
        header1: "NOODLE HOUSE",
        // header2: "The Original Noodle",
        header3: "30 Elizabeth",
        header4: "Phone 123",
        header5: "ABN 456",
        footer1: "Thank you!"
      }

      let order = {
        code: "0052",
        createdAt: new Date(),
        items: [
          {name: "Hokkien Mee", quantity: 1, subtotal: 12.00},
          {name: "Natural Turquoise", quantity: 5, subtotal: 28.50},
          {name: "Prawn Cracker", quantity: 2, subtotal: 2.50},
        ],
        subtotal: 20.50,
        discount: 2.00,
        tax: 3.00,
        total: 27.50
      }

      let data = Helper.getReceiptPrint(setting, order);
      NativeModules.RNPrinter.print(data).catch((error) => {        
        throw new Error(error.message);      
      });
      break;
  }

  return nextState || state;
}

export default router;
