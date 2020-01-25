// @flow
import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  CameraRoll,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import Octicons from 'react-native-vector-icons/Octicons';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as albumsActions from './../../actions/albumAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from "underscore";
import Header from "../../components/Header";
import commonStyles from "../../styles";
import styles from "./style";
const deviceHeight = Dimensions.get('screen').height;

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCursor: '',
      loadingMore: false,
      albumsList: [],
      albumsData: [],
      noMore: true,
    }
    // this._showAlbums = this._showAlbums.call(this)
  }

  componentDidMount() {
    this._showAlbums();
  }

  _showAlbums = async (endCursor) => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Access Storage',
            'message': 'Access Storage for the pictures'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          try {
            const photos = await CameraRoll.getPhotos({
              first: 15000,
              assetType: 'Photos',
              after: endCursor,
            });
            this.setState({
              lastCursor: photos.page_info.end_cursor,
              loadingMore: photos.page_info.has_next_page,
            })
            this._getAlbums(photos.edges);
          } catch (err) {
            console.log('---err----', err);
          }
        } else {
          console.log("Storage permission denied")
        }
      } catch (err) {
      }
    } else {
      CameraRoll.getPhotos({
        first: 100,
        after: endCursor,
        groupTypes: 'All',
        assetType: 'All',
      })
        .then(res => {
          this.setState({
            lastCursor: res.page_info.end_cursor,
            loadingMore: res.page_info.has_next_page,
          })
          this._getAlbums(res.edges);
        })
        .catch((err) => {
          //Error Loading Images
        });
    }
  };

  _getAlbums(data) {
    let AlbumArray = this.state.albumsData;
    data && data.length > 0 && data.map((item) => {
      AlbumArray.push(item.node)
    })
    this.setState({
      albumsData: AlbumArray,
      noMore: false
    })
    let groupAlbums = _.groupBy(AlbumArray, (data) => { return data.group_name });

    let finalData = []
    for (key in groupAlbums) {
      const data = groupAlbums[key]
      const temp = { 'title': key, data }
      finalData.push(temp)
    }
    this.props.actions.getAlbums(finalData)
    this.setState({
      albumsList: finalData
    })
  }

  _renderItem(data) {
    return (
      <View>
        {
          data.item.data.length == 1 ?
            // for single image -------------------
            <TouchableOpacity
              onPress={() => this._albumsDetails(data.item.data)} style={styles.mainView}>
              <View style={styles.oneView}>
                <Image source={{ uri: data.item.data[0] && data.item.data[0].image.uri }}
                  style={styles.oneImg} />
              </View>
            </TouchableOpacity>
            : data.item.data.length == 2 ?
              // for two image -------------------
              <TouchableOpacity
                onPress={() => this._albumsDetails(data.item.data)}
                style={styles.mainView}>
                <View style={commonStyles.flexRow}>
                  <View style={styles.twoViewOne}>
                    <Image source={{ uri: data.item.data[0] && data.item.data[0].image.uri }}
                      style={styles.twoImgOne} />
                  </View>
                  <View style={styles.twoViewTwo}>
                    <Image source={{ uri: data.item.data[1] && data.item.data[1].image.uri }}
                      style={styles.twoImgTwo} />
                  </View>
                </View>
              </TouchableOpacity>
              : data.item.data.length == 3 ?
                // for three image -------------------
                <TouchableOpacity
                  onPress={() => this._albumsDetails(data.item.data)}
                  style={styles.mainView}>
                  <View style={commonStyles.flexRow}>
                    <View style={styles.threeViewOne}>
                      <Image source={{ uri: data.item.data[0] && data.item.data[0].image.uri }}
                        style={styles.Img} />
                    </View>
                    <View style={styles.threeViewTwo}>
                      <Image source={{ uri: data.item.data[1] && data.item.data[1].image.uri }}
                        style={styles.Img} />
                    </View>
                  </View>
                  <View style={styles.threeViewThree}>
                    <Image source={{ uri: data.item.data[2] && data.item.data[2].image.uri }}
                      style={styles.threeImgThree} />
                  </View>
                </TouchableOpacity>
                :
                // for four image -------------------
                <TouchableOpacity onPress={() => this._albumsDetails(data.item.data)} style={styles.mainView}>
                  <View style={commonStyles.flexRow}>
                    <View style={styles.fourViewOne}>
                      <Image source={{ uri: data.item.data[0] && data.item.data[0].image.uri }}
                        style={styles.Img} />
                    </View>
                    <View style={styles.fourViewTwo}>
                      <Image source={{ uri: data.item.data[1] && data.item.data[1].image.uri }}
                        style={styles.Img} />
                    </View>
                  </View>
                  <View style={commonStyles.flexRow}>
                    <View style={styles.fourViewThree}>
                      <Image source={{ uri: data.item.data[2] && data.item.data[2].image.uri }}
                        style={styles.Img} />
                    </View>
                    <View style={styles.fourViewFour}>
                      <Image source={{ uri: data.item.data[3] && data.item.data[3].image.uri }}
                        style={styles.Img} />
                    </View>
                  </View>
                </TouchableOpacity>
        }
        <View style={styles.textView}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.groupText}>{data.item.title}</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.froupCountƒ}>{data.item.data.length}</Text>
        </View>
      </View>
    )
  }

  _albumsDetails(data) {
    this.props.navigation.navigate('AlbumsDetails', { albumData: data })
  }

  _onEndReache = () => {
    const { lastCursor, loadingMore, noMore } = this.state;
    if (loadingMore) {
      // this._showAlbums(lastCursor)
    }
  };

  render() {
    const { albumsList } = this.state;
    const { getAlbumsData } = this.props;
    return (
      <SafeAreaView style={commonStyles.container}>
        <Header isTitle={true} Title="Albums" />
        {
          getAlbumsData && getAlbumsData.data && getAlbumsData.data.length > 0 ?
            <View style={{
              ...ifIphoneX({
                height: deviceHeight - 180,
              }, {
                height: deviceHeight - 120,
              })
            }}>
              <View style={{ marginBottom: 20 }}>
                <FlatList
                  data={getAlbumsData.data}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={(data) => this._renderItem(data)}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{ marginHorizontal: 3, marginVertical: 10 }}
                  onEndReachedThreshold={0.5}
                  onEndReached={() => this._onEndReache()}
                />
                {/* <TouchableOpacity style={styles.btnAddAlbum}>
                  <Octicons name="plus" size={25} color={'#fff'} />
                </TouchableOpacity> */}
              </View>
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} />
            </View>

        }
      </SafeAreaView>
    )

  }
}
function mapStateToProps(state) {
  return {
    getAlbumsData: state.albums.albumsData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(albumsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);

