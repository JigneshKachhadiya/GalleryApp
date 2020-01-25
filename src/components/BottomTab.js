import React, { Component } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../styles/colors";

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.currentAction === '' ?
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 20, marginLeft: 10 }} onPress={() => this.props.changeAction('Resize')}>
            <Entypo name="brush" size={25} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => this.props.changeAction('Crop')}>
            <MaterialCommunityIcons name="crop" size={25} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, marginRight: 10 }} onPress={() => this.props.changeAction('Rotate')}>
            <MaterialCommunityIcons name="crop-rotate" size={25} color={Colors.black} />
          </TouchableOpacity>
        </View>
        :
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => this.props.cancelAction('')}>
            <AntDesign name="close" size={25} color={Colors.black} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontWeight: '500', fontSize: 20, color: Colors.black }}>{this.props.currentAction}</Text>
          </View>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => this.props.doneAction('')}>
            <AntDesign name="check" size={25} color={Colors.black} />
          </TouchableOpacity>
        </View>
    );
  }
}