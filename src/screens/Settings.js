import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch
} from 'react-native';


class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameras: {
        fhaz: null,
        rhaz: null,
      }
    }
  }

  componentDidMount() {
    this.setState({
      cameras: this.props.navigation.state.params.cameras
    })
  }


  render() {
    return(
      <View style={styles.container}>
        <Text>FHAZ</Text>
        <Switch
          value={this.state.cameras.fhaz}
          onValueChange={(value)=>{
            this.setState({
              cameras: {
                fhaz: value
              }
            }, () => console.log(this.state.fhaz))
          }}/>
        <Text>RHAZ</Text>
        <Switch
          value={this.state.cameras.rhaz}
          onValueChange={(value)=>{
            this.setState({
              cameras: {
                rhaz: value
              }
            }, () => console.log(this.state.rhaz))
          }}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    alignItems: 'center',
  }
})

export default Settings;
