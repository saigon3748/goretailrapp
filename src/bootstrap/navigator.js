import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import Login from '../views/login';
import Topbar from '../views/topbar';
import Sidebar from '../views/sidebar';
import Cashier from '../views/cashier';
import Dashboard from '../views/dashboard';

export default StackNavigator({
  LOGIN: { screen: Login },
  APP: { screen: StackNavigator({
    MAIN: { screen: DrawerNavigator({
        POS: { screen: Cashier },
        DASHBOARD: { screen: Dashboard }
      }, {
        gesturesEnabled: false,
        contentComponent: Sidebar
      })
    }
  }, {
    headerMode: 'float',
    navigationOptions: Topbar
  })
 }
}, {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })
})