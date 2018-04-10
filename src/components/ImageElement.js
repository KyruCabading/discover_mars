import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
export default class ImageElement extends Component {
  render() {
    return (
      <Image
        source={{uri: this.props.imgsource}}
        style={{
          width: this.props.itemDimension,
          height: this.props.itemDimension,
          margin: 5
        }}
      />
    );
  }
}
