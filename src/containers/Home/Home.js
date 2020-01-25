// @flow
import React, { Component } from "react";
import {
  SafeAreaView,
  PermissionsAndroid,
  Text,
  View,
  Platform,
  SectionList,
  CameraRoll,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import moment from 'moment';
import _ from "underscore";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as GalleryActions from '../../actions/galleryAction';
import Header from "../../components/Header";
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstImageLoad: 18,
      nextImageLoad: 100,
      isNext: false,
      lastCursor: '',
      loadingMore: false,
      photosList: [],
      photoData: [],
      noMore: true,
    }
    // this._getAllAssets = this._getAllAssets.call(this)
  }

  componentWillMount() { }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Access Storage',
            'message': 'Access Storage for the pictures.'
          })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this._doFetch();
          const photos = await CameraRoll.getPhotos({
            first: 10000,
            assetType: 'Photos',
          });
          this._createStore(photos.edges);
        } else {
          console.log("permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      CameraRoll.getPhotos({
        first: 15000,
        // after: endCursor,
        groupTypes: 'All',
        assetType: 'All',
      })
        .then(res => {
          this._resCameraRoll(res.edges);
          this._createStore(res.edges);
        })
        .catch((err) => {
          //Error Loading Images
        });
    }
  }

  _createStore = (data) => {
    let assetsArray = []
    data && data.length > 0 && data.map((item) => {
      assetsArray.push(item.node)
    })
    this.props.actions.getGallery(assetsArray) // Action call
  }

  async _doFetch(endCursor) {
    const { isNext, nextImageLoad, firstImageLoad } = this.state
    const photos = await CameraRoll.getPhotos({
      first: isNext ? nextImageLoad : firstImageLoad,
      assetType: 'All',
      after: endCursor,
    });
    this.setState({
      isNext: true,
      lastCursor: photos.page_info.end_cursor,
      loadingMore: photos.page_info.has_next_page,
    })
    this._resCameraRoll(photos.edges);
  }

  _onEndReache = () => {
    const { lastCursor, loadingMore, noMore } = this.state;
    if (loadingMore) {
      this._doFetch(lastCursor)
    }
  };

  _resCameraRoll(data) {
    let PhotoArray = this.state.photoData;
    data && data.length > 0 && data.map((item) => {
      PhotoArray.push(item.node)
    })
    this.setState({
      photoData: PhotoArray,
      noMore: false
    })
    let groupImage = _.groupBy(PhotoArray, (value) => {
      return moment.unix(value.timestamp).utc().format('DD MMM YYYY');
    });

    let finalData = []
    for (key in groupImage) {
      const data = _.chunk(groupImage[key], 6)
      const temp = { 'title': key, data }
      finalData.push(temp)
    }
    // this.props.actions.getGallery(PhotoArray)
    this.setState({
      photosList: finalData
    })
  };

  _viewPhotos = (item) => {
    let w, h;
    let ci = this.props.getGalleryData.data.map((d) => d.image.uri).indexOf(item);
    Image.getSize(item, (w, h) => {
      w = w; h = h;
    }, (rej) => console.log(rej));
    if (item) {
      this.props.navigation.navigate('ViewImage', { currentIndex: ci, height: h, width: w })
    }
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

  renderFooterSpinner() {
    const { loadingMore } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          loadingMore &&
          <ActivityIndicator animating size="large" />
        }
      </View>
    )
  };



  render() {
    const { photosList, photoData, loadingMore } = this.state;
    const { getGalleryData } = this.props;
    return (
      <SafeAreaView style={commonStyles.container}>
        <Header isMenuIcon={true} />
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
              onEndReachedThreshold={0.5}
              onEndReached={() => this._onEndReache()}
              keyExtractor={(item, index) => item + index}
              ListFooterComponent={() => this.renderFooterSpinner()}
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

function mapStateToProps(state) {
  return {
    getGalleryData: state.gallery.galleryData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GalleryActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

