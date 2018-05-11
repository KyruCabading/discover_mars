import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, Button } from 'react-native';
import MainScreen from '../screens/MainScreen';
import Gallery from '../screens/Gallery';
import Settings from '../screens/Settings';
import Colors from '../constants/Colors';



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
    })
  },

  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: "Settings"
    })
  }

})

export default AppNavigator;
