import React, { Component } from 'react';
import {  View, TouchableOpacity, Text, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../styles/colors";

export default class CropImageFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ height: '100%', backgroundColor: 'white', marginBottom: Platform.OS == 'ios' ? -20 : 0 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={this.props.onCancel}>
            <AntDesign name="close" size={25} color={Colors.black} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontWeight: '500', fontSize: 20, color: Colors.black }}>Crop</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={this.props.onDone}>
            <AntDesign name="check" size={25} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}