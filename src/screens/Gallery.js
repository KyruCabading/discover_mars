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
  Modal,
  Image
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
      roverData: [],
      modal: {
        visible: false,
        image: "",
        camera: "",
        sol: ""
      },
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
      this.setState({
        roverData: convertedData.photos
      },function(){
        console.log("stateRoverData", this.state.roverData);
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
    return URL = baseUrl + roverName + "sol=1000&page=" + pageNumber + apiKey;
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
        data: [{
          item: next
        }]
      });
      return acc
    }, [])

    return data;
  }


  setModalVisible(bool, imageKey) {
    if(imageKey == null) {
      this.setState({
        modal: {
          visible: bool
        }
      })

    } else {
      this.setState({
        modal: {
          visible: bool
        }
      })
      this.setState({
        modal: {
          image: this.state.roverData[0].data[0].item[imageKey].img_src,
          camera: this.state.roverData[0].data[0].item[imageKey].camera.name,
          sol: this.state.roverData[0].data[0].item[imageKey].sol
        }
      }, function(){
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
    return this.state.modal.image;
  }

  genListSection = (index, myData) => ([{
    key: `${index}`,
    title: myData,
    data: myData
  }])

  renderHeader = ({section: {title}}) => {
    // // const title = item.section.data["0"].title || "Hello"
    // const title = "hi" || "Hello"
    return (
      // <View></View>
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    )
  }

  renderList = ({ item, section, index }) => {
    const { columns } = this.state,
          WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns;
    console.log("renderList", item);
    return (
      <FlatList
        numColumns={columns}
        data={item.item}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={6}
        getItemLayout={( item, index) => (
          {length: itemDimension, offset: itemDimension * index, index}
        )}
      />
    )

  }

  // Section List
  // { title: 'Title1', data: ['item1', 'item2'] },
  // { title: 'Title2', data: ['item3', 'item4'] },
  // { title: 'Title3', data: ['item5', 'item6'] },
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
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns,
          { roverData, modal } = this.state;

    return(
      <View style={styles.container}>
      <Modal style={styles.modal} animationType={'fade'}
             transparent={true} visible={modal.visible}
             onRequestClose={() => {}}>
             <View style={styles.modal}>
              <Text style={styles.text, {textAlign: 'right', color: 'white', fontSize: 16}}
                    onPress={() => {this.setModalVisible(false)}}>Close</Text>
              <Image style={styles.modalImageContainer} source={{uri:modal.image}}/>
              <Text style={styles.text}>Camera: {modal.camera}</Text>
              <Text style={styles.text}>Sol: {modal.sol}</Text>

              </View>
      </Modal>
        <SectionList
         renderItem={this.renderList}
         renderSectionHeader={this.renderHeader}
         sections={roverData}
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
  modalImageContainer: {
    flex: 1,
    width: null,
    height: null
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
