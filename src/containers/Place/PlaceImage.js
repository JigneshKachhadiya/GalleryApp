// @flow
import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  SectionList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import moment from 'moment';
import _ from "underscore";
import Header from "../../components/Header";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import commonStyles from "../../styles";
import styles from "./style";

let randomHex = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
}

class PlaceImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosList: [],
    }
  }

  componentDidMount() {
    this._resCameraRoll();
  }

  _resCameraRoll() {
    let images = this.props.navigation.state.params.AllImage
    let groupImage = _.groupBy(images, (value) => {
      return moment.unix(value.timestamp).utc().format('DD MMM YYYY');
    });
    let finalData = []
    for (key in groupImage) {
      const data = _.chunk(groupImage[key], 6)
      const temp = { 'title': key, data }
      finalData.push(temp)
    }
    this.setState({
      photosList: finalData
    })
  };

  _viewPhotos = (item) => {
    // if (item) {
    //   this.props.navigation.navigate('ViewImage', { imgId: item })
    // }
  };

  _photosGrid(item, index) {
    let isEvenNo = index % 2 == 0
    return (
      <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
        <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
          <TouchableOpacity
            style={{ backgroundColor: item[0] ? randomHex() : '#fff', borderRadius: 10 }}
            onPress={() => { this._viewPhotos(item[0] && item[0].image.uri) }}>
            <Image source={{ uri: item[0] && item[0].image.uri }}
              style={styles.photoGridStyel}
              resizeMode={'cover'} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}
            style={{ backgroundColor: item[1] ? randomHex() : '#fff', borderRadius: 10 }}
            onPress={() => { this._viewPhotos(item[1] && item[1].image.uri) }}>
            <Image source={{ uri: item[1] && item[1].image.uri }}
              style={styles.photoGridStyel}
              resizeMode={'cover'} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}
            style={{ backgroundColor: item[2] ? randomHex() : '#fff', borderRadius: 10 }}
            onPress={() => { this._viewPhotos(item[2] && item[2].image.uri) }}>
            <Image source={{ uri: item[2] && item[2].image.uri }}
              style={styles.photoGridStyel}
              resizeMode={'cover'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 13 }}>
          {
            isEvenNo ?
              item[3] &&
              <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
                <TouchableOpacity activeOpacity={0.9}
                  style={{ backgroundColor: item[3] ? randomHex() : '#fff', borderRadius: 10 }}
                  onPress={() => { this._viewPhotos(item[3] && item[3].image.uri) }}>
                  <Image source={{ uri: item[3] && item[3].image.uri }}
                    style={styles.bigPhotoGrid}
                    resizeMode={'cover'} />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity activeOpacity={0.9}
                    style={{ backgroundColor: item[4] ? randomHex() : '#fff', borderRadius: 10 }}
                    onPress={() => { this._viewPhotos(item[4] && item[4].image.uri) }}>
                    <Image source={{ uri: item[4] && item[4].image.uri }}
                      style={styles.photoGridStyel}
                      resizeMode={'cover'} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={{ backgroundColor: item[5] ? randomHex() : '#fff', borderRadius: 10 }}
                    onPress={() => { this._viewPhotos(item[5] && item[5].image.uri) }} style={{ marginTop: 13 }}>
                    <View style={{ backgroundColor: item[5] ? randomHex() : '#fff', borderRadius: 10 }}>
                      <Image source={{ uri: item[5] && item[5].image.uri }}
                        style={styles.photoGridStyel}
                        resizeMode={'cover'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              :
              item[3] &&
              <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
                <View>
                  <TouchableOpacity activeOpacity={0.9}
                    style={{ backgroundColor: item[5] ? randomHex() : '#fff', borderRadius: 10 }}
                    onPress={() => { this._viewPhotos(item[5] && item[5].image.uri) }}>
                    <Image source={{ uri: item[5] && item[5].image.uri }}
                      style={styles.photoGridStyel}
                      resizeMode={'cover'} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    onPress={() => { this._viewPhotos(item[4] && item[4].image.uri) }} style={{ marginTop: 13 }}>
                    <View style={{ backgroundColor: item[4] ? randomHex() : '#fff', borderRadius: 10 }}>
                      <Image source={{ uri: item[4] && item[4].image.uri }}
                        style={[styles.photoGridStyel]}
                        resizeMode={'cover'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.9}
                  style={{ backgroundColor: item[3] ? randomHex() : '#fff', borderRadius: 10 }}
                  onPress={() => { this._viewPhotos(item[3] && item[3].image.uri) }}>
                  <Image source={{ uri: item[3] && item[3].image.uri }}
                    style={styles.bigPhotoGrid}
                    resizeMode={'cover'} />
                </TouchableOpacity>
              </View>
          }
        </View>
      </View>
    )
  };


  render() {
    const { photosList } = this.state;
    const { currentLocation } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={commonStyles.container}>
        <NavigationEvents onWillFocus={payload => { this.componentDidMount() }} />
        <Header isBack={true} Title={'Place'} currentPossession={currentLocation} navigation={this.props.navigation} />
        {
          photosList && photosList.length > 0 ?
            <SectionList
              renderItem={({ item, index, section }) => this._photosGrid(item, index, section)}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.photoSection}>
                  <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                </View>
              )}
              refreshing={true}
              removeClippedSubviews={true}
              sections={photosList}
              keyExtractor={(item, index) => item + index}
            />
            :
            <View style={styles.loaderStyle}>
              <ActivityIndicator size={'large'} />
            </View>
        }
      </SafeAreaView>
    );
  }
}
export default PlaceImage;

