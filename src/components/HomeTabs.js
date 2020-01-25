// @flow
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import { withNavigation } from 'react-navigation';
import Color from './../styles/colors';
import commonStyles from "./../styles";


class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBtn: 'Home',
    }
    this.tabs = [{
      label: 'Photos',
      icon: 'photo',
      routeName: 'Home'
    },
    {
      label: 'Place',
      icon: 'map',
      routeName: 'Place'
    }, {
      label: 'Albums',
      icon: 'cube',
      routeName: 'Albums'
    }, {
      label: 'Memories',
      icon: 'video',
      routeName: 'Memories'
    }]
  }

  tabHandlePress(routerData) {
    let tabConfig = this.props.navigation.state.routes[1]
    if (routerData == 'Place' && tabConfig.index == 2) {
      this.props.navigation.navigate({ routeName: 'Place', key: 'Place-123' })
    } else {
      this.props.navigation.navigate(routerData)
    }
  }

  render() {
    const { navigation } = this.props;
    const navState = navigation.state;
    const cIdx = navState.index;

    return (
      <SafeAreaView style={[commonStyles.flexRow, {
        borderColor: Color.grey,
        borderTopWidth: .2,
      }
      ]}>
        {this.tabs.map((info, i) => {
          const activeTabColor = i === cIdx
            ? '#0361c2'
            : 'grey';
          return (
            <View key={i} style={[commonStyles.container, commonStyles.paddingT10]}>
              <TouchableOpacity key={info.label} onPress={() => this.tabHandlePress(info.routeName)} >
                <View>
                  {
                    info.label === 'Photos' &&
                    <View style={commonStyles.alItems}>
                      <FontAwesome name={info.icon} size={25} color={activeTabColor} />
                      <Text style={[commonStyles.marginT5, { color: activeTabColor }]}>{info.label}</Text>
                    </View>
                  }
                  {
                    info.label === 'Place' &&
                    <View style={commonStyles.alItems}>
                      <Foundation name={info.icon} size={25} color={activeTabColor} />
                      <Text style={[commonStyles.marginT5, { color: activeTabColor }]}>{info.label}</Text>
                    </View>
                  }
                  {
                    info.label === 'Albums' &&
                    <View style={commonStyles.alItems}>
                      <Icon name={info.icon} size={25} color={activeTabColor} />
                      <Text style={[commonStyles.marginT5, { color: activeTabColor }]}>{info.label}</Text>
                    </View>
                  }
                  {
                    info.label === 'Memories' &&
                    <View style={commonStyles.alItems}>
                      <Entypo name={info.icon} size={25} color={activeTabColor} />
                      <Text style={[commonStyles.marginT5, { color: activeTabColor }]}>{info.label}</Text>
                    </View>
                  }
                </View>
              </TouchableOpacity>
            </View>);
        })
        }
      </SafeAreaView>);
  }
}

export default withNavigation(HomeTabs);