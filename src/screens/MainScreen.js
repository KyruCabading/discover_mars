import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Header from '../components/common/Header';
import Colors from '../constants/Colors';


class MainScreen extends Component{
  static navigationOptions = {
    title: "Missions",
    headerStyle: {
       backgroundColor: Colors.main
     },
     headerTintColor: '#fff'
  };

  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={{width: 200, height: 100}}>
            <Image style={{width: 200, height: 100}} source={require('../../assets/images/opportunity.jpg')}></Image>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
});

export default MainScreen;
