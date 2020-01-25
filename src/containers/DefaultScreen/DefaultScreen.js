// @flow
import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, Text, KeyboardAvoidingView, Platform, View } from "react-native";
import commonStyles from "../../styles";
class DefaultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handlePress = this.handlePress.bind(this);
  }
  
  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('Home')
  }
  render() {
    return (
      <SafeAreaView style={commonStyles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'none' : 'padding'} style={{}}>
          <View>
            <Text>DefaultScreen</Text>
            <TouchableOpacity onPress={this.handlePress}>
              <View>
                <Text>TEST</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default DefaultScreen;