import React, { Component } from 'react';
import { SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../styles/colors";

export default class ViewImageHeader extends Component {
  constructor(props) {
    super(props);
    console.log(props);

  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 20 }} onPress={this.props.closeAction}>
          <AntDesign name="close" size={30} color={Colors.black} />
        </TouchableOpacity>
        {
          this.props.isChanged &&
          <TouchableOpacity style={{ marginRight: 20 }} onPress={this.props.saveImage}>
            <AntDesign name="save" size={25} color={Colors.black} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}