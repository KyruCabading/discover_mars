import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Header from '../components/common/Header';
import MenuItem from '../components/MenuItem';
import Gallery from './Gallery';
import data from '../constants/data.json';

class MainScreen extends Component{
  constructor(props) {
    super(props)

    this.state = {
      data: data,
      roverManifest: [],
      init: true,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1),
      selectedRover: {
        id: 0,
        name: "",
        status: "",
        landingDate: "",
        maxSol: null,
        photos: null,
        roverImage: require('../../assets/images/curiosity.jpg'),
      }
    }

  }

  componentDidMount() {
    const urls = [
      "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k",
      "https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k",
      "https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k",
    ]

    Promise.all(urls.map(fetch))
    .then(res => Promise.all(res.map(res => res.json())))
    .then(data => {
      this.setState({
        roverManifest: data,
        init: false,
      }, () => {
        this.setState({
          selectedRover: {
            id: 0,
            name: this.state.roverManifest[0].photo_manifest.name,
            status: this.state.roverManifest[0].photo_manifest.status,
            landingDate: this.state.roverManifest[0].photo_manifest.landing_date,
            maxSol: this.state.roverManifest[0].photo_manifest.max_sol,
            roverImage: require('../../assets/images/curiosity.jpg'),
          }
        })
      })
    })
    const { animated, opacityA } = this.state;
    Animated.loop (
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: 1400,
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1400,
        })
      ])

    ).start()
  }

  handleSelect = (roverId) => {
   switch (roverId) {
      case 0:
        roverImage = require('../../assets/images/curiosity.jpg')
        break;
      case 1:
        roverImage = require('../../assets/images/opportunity.jpg')
        break;
      case 2:
        roverImage = require('../../assets/images/spirit.jpg')
        break;
      default:
    }

    this.setState({
      selectedRover: {
        id: roverId,
        name: this.state.roverManifest[roverId].photo_manifest.name,
        status: this.state.roverManifest[roverId].photo_manifest.status,
        landingDate: this.state.roverManifest[roverId].photo_manifest.landing_date,
        maxSol: this.state.roverManifest[roverId].photo_manifest.max_sol,
        roverImage: roverImage
      }
    })
  }

  handleViewPhotos = () => {
    this.props.navigation.navigate('Gallery', {
      selectedRover: this.state.selectedRover.id,
      roverManifest: this.state.roverManifest[Number(this.state.selectedRover.id)].photo_manifest
    })
  }

  renderItem = ({item}) => (
    <MenuItem
      title={item.title}
      image={item.image}
      onItemPress={() => {this.props.navigation.navigate('Gallery', {
          selectedRover: item.id,
          roverManifest: this.state.roverManifest[Number(item.id)].photo_manifest
        });
      }} />
  )


  render() {
    const { mainContainer, container, card, button, beacon, titleText, text } = styles;
    const { animated, opacityA } = this.state;
    if(this.state.init) {
      return (
        <View style={mainContainer}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
    return (
      <View style={mainContainer}>
      <ScrollView>
        <View style={container}>


          <View style={card}>
          <Image
            style={{
              width: 180,
              height: 100,
              borderRadius: 5,
              margin: 5
            }}
            source={this.state.selectedRover.roverImage} />
            <Text style={text}>Rover Name: {this.state.selectedRover.name}</Text>
            <Text style={text}>Status: {this.state.selectedRover.status}</Text>
            <Text style={text}>Landing Date: {this.state.selectedRover.landingDate}</Text>
            <Text style={text}>Max Sol: {this.state.selectedRover.maxSol}</Text>
            <TouchableOpacity key={"View"} onPress={this.handleViewPhotos}>
              <View style={button}>
                <Text style={text}>View Latest Photos</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={card}>
            <Image
              style={{
                width: 310,
                height: 310
              }}
              source={require('../../assets/images/mars.png')}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableWithoutFeedback
              key={"0"}
              onPress={()=>this.handleSelect(0)}>
              <Animated.View
                style={{
                  top: -250,
                  left: 0,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  opacity: opacityA,
                  transform:[
                    {
                      scale: animated
                    }
                  ]
                }}
              ></Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              key={"1"}
              onPress={()=>this.handleSelect(1)}>
              <Animated.View
                style={{
                  top: -120,
                  left: 0,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  opacity: opacityA,
                  transform:[
                    {
                      scale: animated
                    }
                  ]
                }}
              ></Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              key={"2"}
              onPress={()=>this.handleSelect(2)}>
              <Animated.View
                style={styles.beacon,{
                  top: -200,
                  left: 0,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  opacity: opacityA,
                  transform:[
                    {
                      scale: animated
                    }
                  ]
                }}
              ></Animated.View>
            </TouchableWithoutFeedback>
          </View>
          </View>

          <View style={card}>
            <View style={{padding: 20}}>
              <Text style={titleText}>Mars, "The Red Planet"</Text>
              <Text style={text}>
                Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System after Mercury. In English, Mars carries a name of the Roman god of war, and is often referred to as the "Red Planet"[14][15] because the reddish iron oxide prevalent on its surface gives it a reddish appearance that is distinctive among the astronomical bodies visible to the naked eye.[16] Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.
              </Text>
            </View>
          </View>


        </View>
      </ScrollView>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black'
  },
  card: {
    padding: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingBottom: 5
  },
  text: {
    color: 'white'
  },
  button: {
    padding: 7,
    margin: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  test: {
    backgroundColor: 'blue'
  }
});

export default MainScreen;
