// @flow
import React, { Component } from "react";
import { SafeAreaView, Text, KeyboardAvoidingView, Platform } from "react-native";
import commonStyles from "../../styles";
class Tab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'none' : 'padding'} style={{}}>
          <Text>Tab3</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>);
  }
}

export default Tab3;