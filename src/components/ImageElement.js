import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import Colors from '../constants/Colors';

// export default class ImageElement extends Component {
//   render() {
//     return (
//       <Image
//         source={{uri: this.props.imgsource}}
//         style={styles.image}
//       />
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   image: {
//     flex: 1,
//     width: null,
//     alignSelf: 'stretch'
//   }
// })


export default class ImageElement extends Component {
  render() {
    return (
      <Image
        source={{uri: this.props.imgsource}}
        style={{
          width: this.props.itemDimension,
          height: this.props.itemDimension,
          margin: 5,
          backgroundColor: Colors.lightGray
        }}
      />
    );
  }
}
