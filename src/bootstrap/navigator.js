import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import Login from '../components/login';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import Cashier from '../components/cashier';
import Dashboard from '../components/dashboard';

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