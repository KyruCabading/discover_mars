import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import Gallery from './src/screens/Gallery';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = StackNavigator({
  MainScreen: {screen : MainScreen},
  Gallery: {screen : Gallery}
})

AppRegistry.registerComponent('dicover_mars', () => AppNavigator);
