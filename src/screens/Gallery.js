import React, { Component } from 'react';
import API from '../config/api';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';
import ImageElement from '../components/ImageElement.js';
import roverData from '../constants/roverData.json';


class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalImage: null,
      roverData: roverData.photos,
      columns: 3
    }
  }

  renderItem = ({item}) => {
    const { columns } = this.state,
          WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns
    return (
      <ImageElement
        columns={this.state.columns}
        itemDimension={itemDimension}
        imgsource={item.img_src}
      />
    )
  };

  render(){
    const { columns } = this.state

    return(
      <View style={styles.container}>
        <FlatList
          numColumns={columns}
          data={roverData.photos}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
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

export default Gallery;


// componentDidMount() {
//   API.fetchData();
// }

// render(){
//   const { params } = this.props.navigation.state;
//   const roverId = params ? params.roverId : null;
//
//   return (
//     <View>
//       <Text>Rover Id: {JSON.stringify(roverId)}</Text>
//     </View>
//   );
// }
