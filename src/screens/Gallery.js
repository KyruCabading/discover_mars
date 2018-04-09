import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Gallery extends Component{
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    // Fetch Method
  }

  render(){
    return (
      <View>
        <Text> This is the Gallery </Text>
      </View>
    );
  }
}

export default Gallery;
