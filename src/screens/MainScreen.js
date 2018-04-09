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

class MainScreen extends Component{
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          id: "0",
          name: "Curiosity",
          image: require("../../assets/images/opportunity.jpg")
        },
        {
          id: "1",
          name: "Opportunity",
          image: require("../../assets/images/opportunity.jpg")
        },
        {
          id: "2",
          name: "Spirit",
          image: require("../../assets/images/opportunity.jpg")
        }
      ]
    }

  }

  componentDidMount() {
    console.log(this.state.data);
  }

  renderItem = ({item}) => (
    <MenuItem
      title={item.name}
      image={item.image}
      onItemPress={() => this.props.navigation.navigate('Gallery')}
    />
  )


  render() {
    const { container } = styles;

    return (
      <View style={container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onItemPress={() => this.props.navigation.navigate('Gallery')}
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
