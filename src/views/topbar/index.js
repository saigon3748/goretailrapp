import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { Button } from 'native-base'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

const menu = (navigation) => {
  return (
    <Button transparent style={{padding: 20}} onPress={() => {
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }
    }>
      <Text style={{fontSize: 16, color: '#F5F8F9'}}>Menu</Text>
    </Button>
  )
}

const user = (navigation) => {
  return (
    <Text style={{padding: 20, fontSize: 16, color: '#F5F8F9'}}>nam</Text>
  )
}

export default ({navigation}) => ({
  headerStyle: {backgroundColor: 'rgb(70, 70, 70)'},
  title: 'goretailr',
  headerTintColor: '#F5F8F9',
  gesturesEnabled: false,
  headerLeft: menu(navigation),
  headerRight: user(navigation)
})
