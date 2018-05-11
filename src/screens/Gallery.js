// Figuring out why onEndReached triggers on init.


import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Image,
  ActivityIndicator,
  RootView
} from 'react-native';
import ImageElement from '../components/ImageElement';
import NavigateButton from '../components/NavigateButton';
import Colors from '../constants/Colors';

class Gallery extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: NavigateButton(navigation, 'Settings', {
      cameras: navigation.state.params.cameras
    }),
    title: navigation.state.params.roverManifest.name
  });

  constructor(props) {
    super(props)
    this.state = {
      rawData: [],
      roverData: [],
      modal: {
        visible: false,
        image: "",
        camera: "",
        sol: "",
      },
      gallery: {
        currentPage: 0,
      },
      cameras: {
        fhaz: false,
        rhaz: false,
      },
      loading: false,
      error: null,
      refreshing: false,
      init: false,
    }
    this.setModalVisible.bind(this)
  }

  componentDidMount(){
    this.setState({ init: true },()=>{
      this.requestData()
    });
    this.props.navigation.setParams({
      cameras: this.state.cameras
    });
  }

  requestData = () => {
    // Build URL
    const apiKey = '&api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k'
    let roverName = this.props.navigation.state.params.roverManifest.name;
    let maxSol = this.props.navigation.state.params.roverManifest.max_sol - this.state.gallery.currentPage;
    const URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverName + "/photos?sol=" + maxSol + "&page=1" + apiKey;
    console.log(URL)
    // Set state

    // Fetch API
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      this.setState((prevState) => ({
        rawData: [...prevState.rawData, ...data.photos],
        error: data.error || null,
      }), function(){
        const convertedData = convertDataToSections(this.state.rawData)
        this.setState({
          roverData: convertedData.photos,
          refreshing: false,
          loading: false,
          init: false
        }, function(){
          console.log("ROVER DATA: ", this.state.roverData, this.state.loading)
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
          data: next
        });
        return acc
      }, [])

      const data = {
        photos: photos
      }

      return data
    }

  }

  setModalVisible(bool, imageKey) {
    console.log(this.state.roverData);
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
          image: this.state.roverData[0].data[imageKey].img_src,
          camera: this.state.roverData[0].data[imageKey].camera.name,
          sol: this.state.roverData[0].data[imageKey].sol
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
    if (!(info.distanceFromEnd < -500)) {
      console.log(info)
      this.setState((prevState) => ({
        loading: true,
        gallery: {
          currentPage: prevState.gallery.currentPage + 1
        }
      }), () => {
        this.requestData()
      })
    }
  }

  renderHeader = ({section: {title}}) => {
    return (
      <Text style={{ fontWeight: 'bold', backgroundColor: 'white' }}>{title}</Text>
    )
  }

  renderFooter = () => {
    if(this.state.loading) {
      return (
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <ActivityIndicator size="large"/>
        </View>
      );

    }
    return null;


  };

  renderItem = ({item, index}) => {
    const WINDOW_WIDTH = Dimensions.get('window').width,
          itemDimension = WINDOW_WIDTH-30;
    return (
      // <Text>{item.img_src}</Text>
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.setModalVisible(true, Number(index))}
        >
        <View>
            <ImageElement
              itemDimension={itemDimension}
              imgsource={item.img_src}
            />
        </View>
      </TouchableWithoutFeedback>
    )
  };

  render() {
    const { roverData, modal } = this.state;

    if(this.state.init) {
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
         renderItem={this.renderItem}
         renderSectionHeader={this.renderHeader}
         ListFooterComponent={this.renderFooter}
         sections={roverData}
         keyExtractor={(item, index) => item.id + index}
         initialNumToRender={1}
         refreshing={this.state.refreshing}
         onRefresh={this.handleRefresh}
         onEndReached={this.handleLoadMore}
         onEndReachedThreshold={-0.1}
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
