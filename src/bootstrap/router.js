import { NativeModules } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Navigator from './navigator';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('LOGIN'));

const router = (state = initialState, action) => {
  let nextState = Navigator.router.getStateForAction(action, state);

  switch(action.type) {
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
    case "PRINT":
      alert('print');
      const Printer = NativeModules.Printer;  
      Printer.get().then(volume => alert(volume));      
      break;
  }

  return nextState || state;
}

export default router;
