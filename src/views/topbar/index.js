import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

const menu = (navigation) => {
  return (
    <Text
      style={{padding: 20, color: '#F5F8F9'}}
      onPress={() => {
        // Coming soon: navigation.navigate('DrawerToggle')
        // https://github.com/react-community/react-navigation/pull/2492
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }
    }>Menu</Text>
  )
}

export default ({navigation}) => ({
  headerStyle: {backgroundColor: 'rgb(70, 70, 70)'},
  title: 'goretailr',
  headerTintColor: '#F5F8F9',
  gesturesEnabled: false,
  headerLeft: menu(navigation)
})
