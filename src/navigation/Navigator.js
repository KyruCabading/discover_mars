import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, Button } from 'react-native';
import MainScreen from '../screens/MainScreen';
import Gallery from '../screens/Gallery';
import Colors from '../constants/Colors';


const RightBarButton = (title, onPress) => {
  return (
    <Button
      title={title}
      onPress={onPress} />
  )
}

const SettingsButton = (navigation) => {
  const { navigate } = navigation;
  const onPress = () => {navigate('MainScreen')}
  return RightBarButton('...', onPress)
}

const AppNavigator = StackNavigator({

  MainScreen: {
    screen : MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mars Missions",
      headerStyle: {
         backgroundColor: 'transparent',
         borderBottomWidth: 0,
         shadowColor: 'transparent'
       },
       headerTintColor: '#fff'
    })
  },

  Gallery: {
    screen : Gallery,
    navigationOptions: ({ navigation }) => ({
      title: "Mars Rover Gallery",
      headerRight: SettingsButton(navigation),
    })}

})

export default AppNavigator;
