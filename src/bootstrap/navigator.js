import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';

import Login from '../views/login';
import Dashboard from '../views/dashboard';
import Cashier from '../views/cashier';

export default StackNavigator({
  LOGIN: { screen: Login },
  MAIN: {
    screen: StackNavigator({
      DASHBOARD: { screen: Dashboard },
      CASHIER: { screen: Cashier }
    }, { headerMode: 'none' })    
  }
}, { headerMode: 'none' });
