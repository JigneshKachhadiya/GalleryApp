// @flow
import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Animated
} from "react-native";
import commonStyles from "../../styles";
import moment from 'moment';
import _ from "underscore";
import Colors from "../../styles/colors";
import Images from '../../styles/images';
import styles from './style';
import ImagePlaceholder from '../../components/imageCatch';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TimedSlideshow from 'react-native-timed-slideshow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const deviceWidth = Dimensions.get('window').width;
let randomHex = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
}

class ShowMemories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memoriesList: [],
      photoList: this.props.navigation.state.params.memoriesArray,
      isShowMore: true,
      currentIndex: 0,
      animated: new Animated.Value(0)
    }
  }
  componentDidMount() {
    const { animated } = this.state;
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000
    }).start();

    let memoriesPhotos = this.props.navigation.state.params.memoriesArray;
    let galleryData = memoriesPhotos && memoriesPhotos.length > 0 ? memoriesPhotos : null;
    let arrengeData = _.chunk(galleryData, 6)
    this.setState({
      memoriesList: arrengeData
    })
  }

  playMemories() {
    let memoriesPhotos = this.props.navigation.state.params.memoriesArray;
    this.props.navigation.navigate('PlayMemories', { memoriesArray: memoriesPhotos })
  }

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

  slideMemoriePhoto() {
    return (
      <TouchableOpacity
        onPress={() => this.playMemories()}
        style={styles.masterImageView}
        activeOpacity={0.9}>
        <Image
          source={{ uri: 'http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg' }}
          style={styles.masterImage}>
        </Image>
      </TouchableOpacity>
    )
  }

  renderItemList(data) {
    let isEvenNo = data.index % 2 == 0

    let imageUrl_1 = data && data.item && data.item.length > 0 && data.item[0].image.uri;

    let imageUrl_2 = data && data.item && data.item.length > 1 && data.item[1].image.uri;

    let imageUrl_3 = data && data.item && data.item.length > 2 && data.item[2].image.uri;

    let imageUrl_4 = data && data.item && data.item.length > 3 && data.item[3].image.uri;

    let imageUrl_5 = data && data.item && data.item.length > 4 && data.item[4].image.uri;

    let imageUrl_6 = data && data.item && data.item.length > 5 && data.item[5].image.uri;

    return (
      <View style={{ marginTop: 10 }}>
        <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
          <TouchableOpacity activeOpacity={0.9}
            style={{ backgroundColor: imageUrl_1 ? randomHex() : '#fff', borderRadius: 10 }}
            onPress={() => { this._viewPhotos(imageUrl_1) }}>
            <Image source={{ uri: imageUrl_1 }}
              style={styles.photoGridStyel}
              resizeMode={'cover'} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}
            style={{ backgroundColor: imageUrl_2 ? randomHex() : '#fff', borderRadius: 10 }}
            onPress={() => { this._viewPhotos(imageUrl_2) }}>
            <Image source={{ uri: imageUrl_2 }}
              style={styles.photoGridStyel}
              resizeMode={'cover'} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}
            style={{ backgroundColor: imageUrl_3 ? randomHex() : '#fff', borderRadius: 10 }}
            onPress={() => { this._viewPhotos(imageUrl_3) }}>
            <Image source={{ uri: imageUrl_3 }}
              style={styles.photoGridStyel}
              resizeMode={'cover'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 13 }}>
          {
            isEvenNo ?
              imageUrl_4 &&
              <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
                <TouchableOpacity activeOpacity={0.9}
                  style={{ backgroundColor: imageUrl_4 ? randomHex() : '#fff', borderRadius: 10 }}
                  onPress={() => { this._viewPhotos(imageUrl_4) }}>
                  <Image source={{ uri: imageUrl_4 }}
                    style={styles.bigPhotoGrid}
                    resizeMode={'cover'} />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity activeOpacity={0.9}
                    style={{ backgroundColor: imageUrl_5 ? randomHex() : '#fff', borderRadius: 10 }}
                    onPress={() => { this._viewPhotos(imageUrl_5) }}>
                    <Image source={{ uri: imageUrl_5 }}
                      style={styles.photoGridStyel}
                      resizeMode={'cover'} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    onPress={() => { this._viewPhotos(imageUrl_6) }} style={{ marginTop: 13 }}>
                    <View style={{ backgroundColor: imageUrl_6 ? randomHex() : '#fff', borderRadius: 10 }}>
                      <Image source={{ uri: imageUrl_6 }}
                        style={styles.photoGridStyel}
                        resizeMode={'cover'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              :
              imageUrl_4 &&
              <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
                <View>
                  <TouchableOpacity activeOpacity={0.9}
                    style={{ backgroundColor: imageUrl_5 ? randomHex() : '#fff', borderRadius: 10 }}
                    onPress={() => { this._viewPhotos(imageUrl_5) }}>
                    <Image source={{ uri: imageUrl_5 }}
                      style={styles.photoGridStyel}
                      resizeMode={'cover'} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    onPress={() => { this._viewPhotos(imageUrl_6) }} style={{ marginTop: 13 }}>
                    <View style={{ backgroundColor: imageUrl_6 ? randomHex() : '#fff', borderRadius: 10 }}>
                      <Image source={{ uri: imageUrl_6 }}
                        style={styles.photoGridStyel}
                        resizeMode={'cover'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.9}
                  style={{ backgroundColor: imageUrl_4 ? randomHex() : '#fff', borderRadius: 10 }}
                  onPress={() => { this._viewPhotos(imageUrl_4) }}>
                  <Image source={{ uri: imageUrl_4 }}
                    style={styles.bigPhotoGrid}
                    resizeMode={'cover'} />
                </TouchableOpacity>
              </View>
          }
        </View>
      </View>
    )
  }

  renderPhotoList(data) {
    let imageUrl = data.item.image.uri
    return (
      <View>
        <Image
          style={{ height: 85, width: 85, marginRight: 1, marginBottom: 1, resizeMode: 'cover' }}
          source={{ uri: imageUrl }}>
        </Image>
      </View>
    )
  }

  render() {
    const { items, memoriesList, isShowMore, photoList } = this.state;
    let masterMemori = memoriesList && memoriesList.length > 0 && memoriesList[0];

    let memoriesPhotos = this.props.navigation.state.params.memoriesArray;

    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.headerView}>
            <AntDesign name="left" size={25} color={Colors.black} />
          </TouchableOpacity>
          {
            memoriesList && memoriesList.length > 0 ?
              <ScrollView showsVerticalScrollIndicator={false}>
{/* 
                <FlatList
                  ref={(ref) => this.flatList = ref}
                  pagingEnabled={true}
                  horizontal
                  initialScrollIndex={this.state.currentIndex}
                  data={memoriesPhotos}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(data) => this.slideMemoriePhoto(data)}
                  onEndReachedThreshold={0.5}
                /> */}
                <View style={{ paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: '#e1e1e1' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ isShowMore: !isShowMore })}
                    style={{ width: 100 }}>
                    <Text style={styles.seeAllText}>{isShowMore ? 'Show More' : 'Summary'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 9 }}>
                  {
                    isShowMore ?
                      <FlatList
                        data={memoriesList}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(data, index) => this.renderItemList(data)}
                        onEndReachedThreshold={0.5}
                      />
                      :
                      <FlatList
                        data={photoList}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        style={{ marginTop: 10 }}
                        renderItem={(element) => this.renderPhotoList(element)}
                        numColumns={4}
                        key={4}
                        onEndReachedThreshold={0.5}
                      />
                  }

                </View>
              </ScrollView>
              :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: '#ABB2B9', fontWeight: 'bold', letterSpacing: 1 }}>No Content</Text>
              </View>
          }

        </View>
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

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowMemories);

