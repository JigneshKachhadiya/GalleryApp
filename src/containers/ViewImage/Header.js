import React, { Component } from 'react';
import { SafeAreaView, View,  TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../../styles/colors";

export default class Header extends Component {
  render() {
    return (
        <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={{marginLeft: 20}} onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="close" size={30} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 20}}>
            <AntDesign name="upload" size={25} color={Colors.black} />
          </TouchableOpacity>
        </View>
    );
  }
}