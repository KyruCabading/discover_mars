// Figuring out why onEndReached triggers on init.


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
  Image,
  ActivityIndicator
} from 'react-native';
import ImageElement from '../components/ImageElement.js';
import Colors from '../constants/Colors';

class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      rawData: [],
      roverData: [],
      modal: {
        visible: false,
        image: "",
        camera: "",
        sol: ""
      },
      gallery: {
        columns: 2,
        currentPage: 1,
        selectedRover: this.props.navigation.state.params.selectedRover
      },
      loading: false,
      error: null,
      refreshing: false,

    }
    this.setModalVisible.bind(this)
  }

  componentDidMount(){
    this.setState({ loading: true },()=>{
      this.requestData()
    });

  }


  requestData = () => {
    // Build URL
    const apiKey = '&api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k'
    let roverName = '';
    switch(parseInt(this.props.navigation.state.params.selectedRover)) {
      case 0:
        roverName = "curiosity" + "/photos?"
        break;
      case 1:
        roverName = "opportunity" + "/photos?"
        break;
      case 2:
        roverName = "spirit" + "/photos?"
        break;
      default:
    }
    const URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverName + "sol=" + this.state.gallery.currentPage + "&page=1" + apiKey;
    console.log(URL)
    // Set state

    // Fetch API
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log("Data: ", data.photos)
      this.setState((prevState) => ({
        rawData: prevState.gallery.currentPage === 1 ? data.photos : [...prevState.rawData, ...data.photos],
        error: data.error || null,
      }), function(){
        const convertedData = convertDataToSections(this.state.rawData)
        this.setState({
          roverData: convertedData.photos,
          refreshing: false,
          loading: false,
        }, function(){
          console.log("currentData: ", this.state.roverData, this.state.rawData)
        })
      })

    })
    .catch(error => {
      this.setState({ error, loading: false, refreshing: false });
    })


    convertDataToSections = (photos) => {
      photos = _.groupBy(photos, d => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' }
        let earthDate = new Date(Date.parse(d.earth_date))
        let earthDay = earthDate.toLocaleDateString('en-US', options)
        return "Sol " + d.sol + " / " + earthDay
      })

      photos = _.reduce(photos, (acc, next, index) => {
        acc.push({
          title: index,
          data: [{
            item: next
          }]
        });
        return acc
      }, [])
      console.log('converted', photos)
      const data = {
        photos: photos
      }

      return data
    }

  }

  setModalVisible(bool, imageKey) {
    console.log(imageKey)
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
  }

  handleRefresh = () => {
    const { selectedRover, currentPage } = this.state.gallery;
    this.setState({ refreshing: true }, () => {
      this.requestData()
      console.log('Refreshed')
    })

  }

  handleLoadMore = (info) => {
    console.log("Triggered", info.distanceFromEnd)
    if (!(info.distanceFromEnd < -500)) {
      console.log("Load More Data: ", this.state.rawData, this.state.gallery.currentPage)
      this.setState((prevState) => ({
        gallery: {
          currentPage: prevState.gallery.currentPage + 1
        }
      }), () => {
        this.requestData()
      })
    }
    // this.setState({
    //   gallery: {
    //     currentPage: this.state.gallery.page + 1,
    //   }
    // }, () => {
    //   this.requestData()
    // })
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
    const { columns } = this.state.gallery,
          WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns;
    console.log("renderList", item);
    return (
      <View>
        <FlatList
          numColumns={2}
          data={item.item}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={1}
          getItemLayout={( item, index) => (
            {length: itemDimension, offset: itemDimension * index, index}
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          extraData={this.state}
        />
      </View>
    )

  }

  // Section List
  // { title: 'Title1', data: ['item1', 'item2'] },
  // { title: 'Title2', data: ['item3', 'item4'] },
  // { title: 'Title3', data: ['item5', 'item6'] },
    renderItem = ({item, index}) => {
      const { columns } = this.state.gallery,
            WINDOW_WIDTH = Dimensions.get('window').width,
            itemDimension = (WINDOW_WIDTH-(20*columns))/columns;

      return (
        <Text>{item.id}</Text>
        // <TouchableWithoutFeedback
        //   key={index}
        //   onPress={() => this.setModalVisible(true, Number(index))}
        //   >
        //     <View>
              // <ImageElement
              //   columns={columns}
              //   itemDimension={itemDimension}
              //   // imgsource={item.img_src}
              // />
        //     </View>
        // </TouchableWithoutFeedback>
      )
    };

  render(){
    const { columns } = this.state.gallery,
          WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = (WINDOW_WIDTH-(18*columns))/columns,
          { roverData, modal } = this.state;

    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
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
         onEndReached={this.handleLoadMore}
         onEndReachedThreshold={-.15}
         extraData={this.state}
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
    height: null,
    backgroundColor: Colors.lightGray
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
