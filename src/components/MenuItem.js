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

  static navigationOptions = {
    title: "Missions",
    headerStyle: {
       backgroundColor: Colors.main
     },
     headerTintColor: '#fff'
  };

  onPressIn(){
    Animated.timing(this.state.animatePress,{
      toValue:0.96,
      duration: 150
    }).start()
  }

  onPressOut() {
    const { navigate } = this.props.navigation;

    Animated.timing(this.state.animatePress,{
      toValue:1,
      duration: 200
    }).start()

    navigate('Gallery');
  }

  render() {
    const { image } = styles;
    return (
          <TouchableWithoutFeedback
            onPressIn={() => this.onPressIn()}
            onPressOut={() => this.onPressOut()}
          >
            <Animated.View
              style={image,{transform:[{scale: this.state.animatePress}]}
            }>
              <Image style={{width: 200, height: 100}} source={this.props.image}></Image>
            </Animated.View>
          </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100
  }
});

export default MenuItem;
