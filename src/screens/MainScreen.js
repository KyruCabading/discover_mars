import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import Header from '../components/common/Header';
import Colors from '../constants/Colors';


class MainScreen extends Component{
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
      toValue:0.85,
      duration: 200
    }).start()
  }

  onPressOut() {
    Animated.timing(this.state.animatePress,{
      toValue:1,
      duration: 200
    }).start()
    this.props.navigation.navigate('Gallery');
  }

  render() {
    const { image, container } = styles;
    return (
        <View style={container}>
          <TouchableWithoutFeedback
            onPressIn={() => this.onPressIn()}
            onPressOut={() => this.onPressOut()}
          >
            <Animated.View
              style={image,{transform:[{scale: this.state.animatePress}]}
            }>
              <Image style={{width: 200, height: 100}} source={require('../../assets/images/opportunity.jpg')}></Image>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
  // render(){
  //   return (
  //     <View>
  //       <Text> This is the Homescreen </Text>
  //       <Button
  //         title="Gallery"
  //         onPress={() => this.props.navigation.navigate('Gallery')}
  //       />
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 100
  }
});

export default MainScreen;
