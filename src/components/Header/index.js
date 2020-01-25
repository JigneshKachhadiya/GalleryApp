// @flow
import React, { Component } from "react";
import { Text, TouchableOpacity, View, Modal, SafeAreaView } from "react-native";
import Colors from "../../styles/colors";
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import commonStyles from "../../styles";
import Menu from '../SideMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  sideMenu() {
    this.setModalVisible(!this.state.modalVisible);
  }

  goBack() {
    const { Title, currentPossession } = this.props
    if (Title == 'Place') {
      this.props.navigation.navigate({ routeName: 'Place', key: 'Place-123', params: currentPossession })
    } else {
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <SafeAreaView>
        {
          this.props.isMenuIcon == true &&
          <View style={[styles.headerBackIconView, commonStyles.paddingH10]}>
            <TouchableOpacity style={{ width: 40 }}>
              <AntDesign name="menu-fold" size={30} color={Colors.black} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerBackTitle}>{this.props.Title}</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>
        }
        {
          this.props.isBack == true &&
          <View style={[styles.headerBackIconView, commonStyles.paddingH10]}>
            <TouchableOpacity
              onPress={() => this.goBack()}
              style={{ width: 40, height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="left" size={20} color={Colors.black} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerBackTitle}>{this.props.Title}</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>
        }
        {
          this.props.isTitle == true &&
          <View style={styles.titleView}>
            <Text style={styles.headerBackTitle}>{this.props.Title}</Text>
          </View>
        }
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>
          <Menu {...this.props} closeModal={this.setModalVisible} />
        </Modal>
      </SafeAreaView >
    );
  }
}

export default Header;