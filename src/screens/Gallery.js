import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Gallery extends Component{
  // componentDidMount() {
  //   this.makeRemoteRequest();
  // }
  //
  // makeRemoteRequest = () => {
  //   // Fetch Method
  // }

  render(){
    const { params } = this.props.navigation.state;
    const roverId = params ? params.roverId : null;

    return (
      <View>
        <Text>Rover Id: {JSON.stringify(roverId)}</Text>
      </View>
    );
  }
}

export default Gallery;
