import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  Dimensions,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import ImageElement from '../components/ImageElement.js';
// import newData from '../constants/roverData.json';


// import { fetchData } from '../config/api';

/* START Embedded SectionList x FlatList - WIP */

//
// newData.photos = _.groupBy(newData.photos, d => {
//   var options = { year: 'numeric', month: 'long', day: 'numeric' }
//   let earthDate = new Date(Date.parse(d.earth_date))
//   let earthDay = earthDate.toLocaleDateString('en-US', options)
//   return "Sol " + d.sol + " / " + earthDay
// })
//
// newData.photos = _.reduce(newData.photos, (acc, next, index) => {
//   acc.push({
//     title: index,
//     data: next
//   });
//   return acc
// }, [])


class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      roverData: [],
      modalImage: "",
      columns: 3
    }
    this.setModalVisible.bind(this)
  }

  componentDidMount(){
    // console.log(this.fetchData(parseInt(this.props.navigation.state.params.selectedRover), 1));
    fetch(
      this.buildURL(parseInt(this.props.navigation.state.params.selectedRover), 1)
    )
    .then((response)=>response.json())
    .then((data)=>{
      const convertedData = this.convertDataToSections(data)
      console.log("convertedData")
      console.log(convertedData.photos)
      this.setState({
        roverData: convertedData.photos
      },function(){
        console.log("stateData")
        console.log(this.state.roverData);
      })
    })

  }

  buildURL(selectedRover, pageNumber) {
    // Build URL
    let apiKey = '&api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k'
    let baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
    let roverName = '';
    switch(parseInt(selectedRover)) {
      case 0:
        roverName = "curiosity" + "/photos?"
        console.log("Curiosity")
        break;
      case 1:
        roverName = "opportunity" + "/photos?"
        console.log("Opportunity")

        break;
      case 2:
        roverName = "spirit" + "/photos?"
        console.log("Spirit")

        break;
      default:
    }
    return URL = baseUrl + roverName + "sol=max&page=" + pageNumber + apiKey;
  }



  convertDataToSections(data) {
    data.photos = _.groupBy(data.photos, d => {
      var options = { year: 'numeric', month: 'long', day: 'numeric' }
      let earthDate = new Date(Date.parse(d.earth_date))
      let earthDay = earthDate.toLocaleDateString('en-US', options)
      return "Sol " + d.sol + " / " + earthDay
    })

    data.photos = _.reduce(data.photos, (acc, next, index) => {
      acc.push({
        title: index,
        data: next
      });
      return acc
    }, [])

    return data;
  }


  setModalVisible(visible, imageKey) {
    console.log(this.props.selectedRover)

    console.log(imageKey)
    if(imageKey == null) {
      console.log("ImageKey Doesn't Exist")
      this.setState({
        modalVisible: visible
      })

    } else {
      this.setState({
        modalVisible: visible,
      })
      this.setState({
        modalImage: this.state.roverData[0].data[imageKey].img_src
      }, function(){
        console.log("Modal set to: " + this.state.modalImage)
      })

    }
    // console.log(roverData.photos[0].data[imageKey].img_src);
    // const props = {
    //   visible: visible,
    //   imageKey: imageKey,
    //   newImage: roverData.photos[0].data[imageKey].img_src
    // }
    // console.log(props)
    // // this.setState({
    // //   modalImage: roverData.photos[0].data[imageKey].img_src,
    // //   modalVisible: visible
    // // },function(){
    // // });
    //
    // {
    //   modalImage: roverData.photos[0].data[imageKey].img_src,
    //   modalVisible: visible
    // },function(){
    // }
    //
    // this.setState((previousState, props) => {
    //   modalImage: props.newImage || previousState.modalImage,
    //
    //
    // });

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
        initialNumToRender={6}
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
    const { columns } = this.state,
          WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns;

    return(
      <View style={styles.container}>
      <Modal style={styles.modal} animationType={'fade'}
             transparent={true} visible={this.state.modalVisible}
             onRequestClose={() => {}}>
             <View style={styles.modal}>
              <Text style={styles.text}
                    onPress={() => {this.setModalVisible(false)}}>Close</Text>
              <Text style={styles.text}>{this.state.modalImage}</Text>
              <ImageElement columns={this.state.columns} itemDimension={itemDimension} imgsource={this.state.modalImage}/>

              </View>
      </Modal>
        <SectionList
         renderItem={this.renderList}
         renderSectionHeader={this.renderHeader}
         sections={this.state.roverData}
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
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0, 0.9)'
  },
  text: {
    color: '#fff'
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
