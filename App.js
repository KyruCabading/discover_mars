// import React from 'react';
// import { StackNavigator } from 'react-navigation';
//
// const App = StackNavigator({
//   Home: { screen: HomeScreen },
//   Profile: { screen: ProfileScreen },
// });
//
// export default App;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import Gallery from './src/screens/Gallery';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = StackNavigator({
  HomeScreen: {screen : HomeScreen},
  Gallery: {screen : Gallery}
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
