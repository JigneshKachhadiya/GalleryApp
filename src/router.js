import React, { Component } from "react";
import { View, StatusBar, Easing, Animated } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { connect } from 'react-redux';
import Home from './containers/Home';
import Place from './containers/Place';
import PlaceImage from './containers/Place/PlaceImage';
import Albums from './containers/Albums';
import AlbumsDetails from './containers/AlbumsDetails';
import Tab3 from './containers/Tab3';
import Memories from './containers/Memories ';
import PlayMemories from './containers/PlayMemories'
import ShowMemories from './containers/PlayMemories/ShowMemories'
import ViewImage from './containers/ViewImage';

import DefualtScreen from './containers/DefaultScreen';
import HomeTabs from './components/HomeTabs';
import commonStyles from "./styles";
const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 350,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { position, scene } = sceneProps;
      const { index, route } = scene
      const transition = 'default'; // <- That's new
      return {
        default: CollapseExpand(index, position),
      }[transition];
    },
  }
}
let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};
const StackNavigatorOptions = {
  initialRouteName: "DefualtScreen",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  },
  transitionConfig: TransitionConfiguration,
};

const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
}, {
  initialRouteName: "Home",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});
HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const MemoriesNavigator = createStackNavigator({
  Memories: { screen: Memories },
  ShowMemories: { screen: ShowMemories },
  PlayMemories: { screen: PlayMemories },
}, {
  initialRouteName: "Memories",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});
MemoriesNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const AlbumsNavigator = createStackNavigator({
  Albums: { screen: Albums },
  AlbumsDetails: { screen: AlbumsDetails },
}, {
  initialRouteName: "Albums",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

AlbumsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const PlaceNavigator = createStackNavigator({
  Place: { screen: Place },
  PlaceImage: { screen: PlaceImage },
}, {
  initialRouteName: "Place",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

PlaceNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0 || navigation.state.index === 2) {
    tabBarVisible = true
  }
  return {
    tabBarVisible
  }
}

const HomeTab = createBottomTabNavigator(
  {
    HomeScreen: { screen: HomeNavigator },
    Place: { screen: PlaceNavigator },
    Albums: { screen: Albums },
    Memories: { screen: MemoriesNavigator },
  },
  {
    animationEnabled: true,
    tabBarComponent: HomeTabs,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    lazy: true
  });
const ViewPhotoNavigator = createSwitchNavigator({
  DefualtScreen: HomeTab,
  ViewImage: ViewImage
})
const AppNavigator = createStackNavigator(
  {
    DefualtScreen: {
      screen: ViewPhotoNavigator,
    },
    AlbumsDetails: {
      screen: AlbumsDetails
    },
  }, StackNavigatorOptions);
const App = createAppContainer(AppNavigator);

class AppScreen extends Component {
  render() {
    // console.disableYellowBox = true;
    return (
      <View style={commonStyles.container}>
        <StatusBar />
        <App />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(AppScreen);