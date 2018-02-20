import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';

import Navigator from './navigator';

class App extends React.Component {
  render() {
    const { dispatch, router } = this.props;
    const navigation = addNavigationHelpers({
      dispatch: dispatch,
      state: router,
    });

    return (
      <Navigator navigation = { navigation } />
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

const State = state => {
  return {
    router: state.router
  }
};

export default connect(State)(App);
