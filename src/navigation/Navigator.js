import { StackNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import Gallery from '../screens/Gallery';
import Colors from '../constants/Colors';

const AppNavigator = StackNavigator({

  MainScreen: {
    screen : MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Missions",
      headerStyle: {
         backgroundColor: Colors.main
       },
       headerTintColor: '#fff'
    })
  },

  Gallery: {screen : Gallery}

})

export default AppNavigator;
