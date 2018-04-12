import React, { Component } from 'react';
import API from '../config/api';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import ImageElement from '../components/ImageElement.js';
import roverData from '../constants/roverData.json';
import _ from 'lodash';


/* START Embedded SectionList x FlatList - WIP */
roverData.photos = _.groupBy(roverData.photos, d => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' }
  let earthDate = new Date(Date.parse(d.earth_date))
  let earthDay = earthDate.toLocaleDateString('en-US', options)
  return "Sol " + d.sol + " / " + earthDay
})

roverData.photos = _.reduce(roverData.photos, (acc, next, index) => {
  acc.push({
    title: index,
    data: next
  });
  return acc
}, [])


class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalImage: null,
      roverData: roverData.photos,
      columns: 3
    }
    this.setModalVisible.bind(this)
  }

  setModalVisible(visible, imageKey) {
    // console.log(this.state.roverData[0].data[0])
    this.setState({
      modalImage: this.state.roverData[0].data[imageKey].img_src,
      modalVisible: visible
    },function(){
      console.log(this.state.modalImage)
    });

  }

  getImage() {
    return this.state.modalImage;
  }

  renderHeader = ({ section: { title } }) => (
    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
  )

  renderList = ({ item, section, index }) => {
    const { columns } = this.state,
          WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns;
    return (
      <FlatList
        numColumns={columns}
        data={section.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={2}
        getItemLayout={( item, index) => (
          {length: itemDimension, offset: itemDimension * index, index}
        )}
      />
    )

  }

    renderItem = ({item, index}) => {
      const { columns } = this.state,
            WINDOW_WIDTH = Dimensions.get('window').width,
            itemDimension = (WINDOW_WIDTH-(18*columns))/columns;
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => this.setModalVisible(true, Number(index))}
          >
            <View>
              <ImageElement
                columns={this.state.columns}
                itemDimension={itemDimension}
                imgsource={item.img_src}
              />
            </View>
        </TouchableWithoutFeedback>
      )
    };

  render(){
    const { columns } = this.state

    return(
      <View style={styles.container}>
        <SectionList
         renderItem={this.renderList}
         renderSectionHeader={this.renderHeader}
         sections={roverData.photos}
         keyExtractor={(item, index) => item.id + index}
         initialNumToRender={1}
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
/* END - Embedded SectionList x FlatList - working */



// /* Start SectionList - working */
// roverData.photos = _.groupBy(roverData.photos, d => {
//   var options = { year: 'numeric', month: 'long', day: 'numeric' }
//   let earthDate = new Date(Date.parse(d.earth_date))
//   let earthDay = earthDate.toLocaleDateString('en-US', options)
//   return "Sol " + d.sol + " / " + earthDay
// })
//
// roverData.photos = _.reduce(roverData.photos, (acc, next, index) => {
//   acc.push({
//     title: index,
//     data: next
//   });
//   return acc
// }, [])
//
// class Gallery extends Component{
//   constructor(props) {
//     super(props)
//     this.state = {
//       modalVisible: false,
//       modalImage: null,
//       roverData: roverData.photos,
//       columns: 3
//     }
//   }
//
//   renderItem = ({ item, index, section }) => (
//     <Text key={index}>{item.id}</Text>
//   )
//
//   renderHeader = ({ section: { title } }) => (
//     <Text style={{ fontWeight: 'bold' }}>{title}</Text>
//   )
//
//   render(){
//     const { columns } = this.state
//
//     return(
//       <View style={styles.container}>
//       <SectionList
//        renderItem={this.renderItem}
//        renderSectionHeader={this.renderHeader}
//        sections={roverData.photos}
//        keyExtractor={(item, index) => item.id + index} />
//        columns={this.state.columns}
//       </View>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
//
// export default Gallery;
// /* End - SectionList - working */

/* Start FlatList - Working */
// class Gallery extends Component{
//   constructor(props) {
//     super(props)
//     this.state = {
//       modalVisible: false,
//       modalImage: null,
//       roverData: roverData.photos,
//       columns: 3
//     }
//   }
//
//   renderItem = ({item}) => {
//     const { columns } = this.state,
//           WINDOW_WIDTH = Dimensions.get('window').width,
//           itemDimension = (WINDOW_WIDTH-(18*columns))/columns
//     return (
//       <ImageElement
//         columns={this.state.columns}
//         itemDimension={itemDimension}
//         imgsource={item.img_src}
//       />
//     )
//   };
//
//   render(){
//     const { columns } = this.state
//
//     return(
//       <View style={styles.container}>
//       <FlatList
//         numColumns={columns}
//         data={roverData.photos}
//         renderItem={this.renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//       </View>
//     )
//   }
//
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
//
// export default Gallery;
/* End of FlatList */


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
