import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import Header from '../components/common/Header';
import Colors from '../constants/Colors';


class MenuItem extends Component{
  constructor(){
    super();
    this.state = {
      animatePress: new Animated.Value(1)
    }
  }

  onPressIn(){
    Animated.timing(this.state.animatePress,{
      toValue:0.96,
      duration: 150
    }).start()

  }

  onPressOut() {
    Animated.timing(this.state.animatePress,{
      toValue:1,
      duration: 200
    }).start()
    this.props.onItemPress();
  }

  render() {
    const { image, title } = styles;
    return (
          <TouchableWithoutFeedback
            onPressIn={() => this.onPressIn()}
            onPressOut={() => this.onPressOut()}
          >
            <Animated.View
              style={image,{transform:[{scale: this.state.animatePress}]}
            }>
              <Image style={image} source={this.props.image}></Image>
              <Text style={title}>{this.props.title}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 180,
    margin: 5
  },
  title: {
    position: 'absolute',
    bottom: 100,
    right: 50,
    fontSize: 24,
    color: '#fff'
  }
});

export default MenuItem;
