import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Index from './src/index';
import commonStyles from './src/styles';

export default class App extends Component {

  render() {
    console.disableYellowBox = true;
    return (
      <View style={commonStyles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Index />
      </View>
    );
  }
}