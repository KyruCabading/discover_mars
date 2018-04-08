import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import Header from '../components/common/Header';


class MainScreen extends Component{
  static navigationOptions = {
    title: "Missions",
  };

  render(){
    return (
      <View>
        <Text> This is the Homescreen </Text>
        <Button
          title="Gallery"
          onPress={() => this.props.navigation.navigate('Gallery')}
        />
      </View>
    );
  }
}

export default MainScreen;
