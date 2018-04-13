import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import Header from '../components/common/Header';
import MenuItem from '../components/MenuItem';
import Gallery from './Gallery';
import data from '../constants/data.json';

class MainScreen extends Component{
  constructor(props) {
    super(props)

    this.state = {
      data: data
    }

  }


  selectedRover() {
    return 1
  }

  renderItem = ({item}) => (
    <MenuItem
      title={item.title}
      image={item.image}
      onItemPress={() => {this.props.navigation.navigate('Gallery', {
          selectedRover: item.id
        });
      }}
    />
  )


  render() {
    const { container } = styles;

    return (
      <View style={container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onItemPress={() => {this.props.navigation.navigate('Gallery', {
              roverId: []
            });
          }}
        />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MainScreen;
