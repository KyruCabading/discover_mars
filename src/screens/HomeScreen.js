import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';


class HomeScreen extends Component{
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

export default HomeScreen;
