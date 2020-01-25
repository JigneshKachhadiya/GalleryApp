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
  ScrollView
} from "react-native";
import commonStyles from "../../styles";
import moment from 'moment';
import _ from "underscore";
import Colors from "../../styles/colors";
import Images from '../../styles/images';
import styles from './style';
import ImagePlaceholder from '../../components/imageCatch';
import Icon from 'react-native-vector-icons/AntDesign';
import TimedSlideshow from 'react-native-timed-slideshow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const deviceWidth = Dimensions.get('window').width;

class Memories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memoriesList: [],
      items: [
        {
          uri: "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
          title: "Michael Malik",
          text: "Minnesota, USA",
        },
        {
          uri: "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
          title: "Victor Fallon",
          text: "Val di Sole, Italy",
          duration: 3000
        },
        {
          uri: "https://greatist.com/sites/default/files/Running_Mountain.jpg",
          title: "Mary Gomes",
          text: "Alps",
          fullWidth: true
        },
        {
          uri: "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
          title: "Michael Malik",
          text: "Minnesota, USA",
        },
        {
          uri: "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
          title: "Victor Fallon",
          text: "Val di Sole, Italy",
          duration: 3000
        },
        {
          uri: "https://greatist.com/sites/default/files/Running_Mountain.jpg",
          title: "Mary Gomes",
          text: "Alps",
          fullWidth: true
        },
        {
          uri: "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
          title: "Michael Malik",
          text: "Minnesota, USA",
        },
        {
          uri: "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
          title: "Victor Fallon",
          text: "Val di Sole, Italy",
          duration: 3000
        },
      ]
    }
  }
  componentDidMount() {
    const { getGalleryData } = this.props;
    let galleryData = getGalleryData.data && getGalleryData.data.length > 0 ? getGalleryData.data : null;

    let filterData = _.filter(galleryData, (value) => {
      return value.group_name == "Camera" && value.location
    })

    let memoriesData = _.groupBy(filterData, (item) => {
      return moment.unix(item.timestamp).utc().format('MMM YYYY')
    })

    let finalData = []
    for (key in memoriesData) {
      const data = memoriesData[key]
      if (data.length >= 15) {
        const temp = { 'title': key, data }
        finalData.push(temp)
      }
      let arrengeData = _.chunk(finalData, 4)

      this.setState({
        memoriesList: arrengeData
      })
    }
  }

  playMemories(itemList) {
    if (itemList && itemList.data.length > 0) {
      // this.props.navigation.navigate('ShowMemories', { memoriesArray: itemList.data })
      this.props.navigation.navigate('PlayMemories', { memoriesArray: itemList.data })
    }
  }

  renderItemList(data) {

    let imageUrl_1 = data && data.item && data.item.length > 0 && data.item[0].data[0].image.uri;
    let cerateAtDate_1 = moment.unix(data && data.item && data.item.length > 0 && data.item[0].data[0].timestamp).utc().format('DD MMM YYYY').toLocaleUpperCase();

    let imageUrl_2 = data && data.item && data.item.length > 1 && data.item[1].data[1].image.uri;
    let cerateAtDate_2 = moment.unix(data && data.item && data.item.length > 1 && data.item[1].data[1].timestamp).utc().format('DD MMM YYYY').toLocaleUpperCase();

    let imageUrl_3 = data && data.item && data.item.length > 2 && data.item[2] && data.item[2].data[2].image.uri;
    let cerateAtDate_3 = moment.unix(data && data.item && data.item.length > 2 && data.item[2] && data.item[2].data[2].timestamp).utc().format('DD MMM YYYY').toLocaleUpperCase();

    let imageUrl_4 = data && data.item && data.item.length > 3 && data.item[3].data[3].image.uri;
    let cerateAtDate_4 = moment.unix(data && data.item && data.item.length > 3 && data.item[0].data[0].timestamp).utc().format('DD MMM YYYY').toLocaleUpperCase();

    return (
      <View style={{ flex: 1, paddingHorizontal: 5, marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          {
            imageUrl_1 &&
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.playMemories(data && data.item && data.item.length > 0 && data.item[0])}
              style={{ height: 140, width: 140, borderRadius: 5, marginRight: 5, backgroundColor: '#000', }}>
              <Image
                source={{ uri: imageUrl_1 }}
                style={{
                  height: 140,
                  width: 140,
                  resizeMode: 'cover',
                  borderRadius: 5,
                  opacity: .8
                }}
              />
              <View style={styles.gridAbsoluteView}>
                <Text style={styles.gridCityText}>Surat</Text>
                <Text style={styles.dridDateText}>{cerateAtDate_1}</Text>
              </View>
            </TouchableOpacity>
          }
          {
            imageUrl_2 &&
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.playMemories(data && data.item && data.item.length > 1 && data.item[1])}
              style={{ height: 140, width: 140, borderRadius: 5, backgroundColor: '#000', }}>
              <Image
                source={{ uri: imageUrl_2 }}
                style={{
                  height: 140,
                  width: 140,
                  resizeMode: 'cover',
                  borderRadius: 5,
                  opacity: .8
                }}
              />
              <View style={styles.gridAbsoluteView}>
                <Text style={styles.gridCityText}>Surat</Text>
                <Text style={styles.dridDateText}>{cerateAtDate_2}</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={{ flexDirection: 'row' }}>
          {
            imageUrl_3 &&
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.playMemories(data && data.item && data.item.length > 2 && data.item[2])}
              style={{ height: 140, width: 140, borderRadius: 5, marginRight: 5, backgroundColor: '#000' }}>
              <Image
                source={{ uri: imageUrl_3 }}
                style={{
                  height: 140,
                  width: 140,
                  resizeMode: 'cover',
                  borderRadius: 5,
                  opacity: .8
                }}
              />
              <View style={styles.gridAbsoluteView}>
                <Text style={styles.gridCityText}>Surat</Text>
                <Text style={styles.dridDateText}>{cerateAtDate_3}</Text>
              </View>
            </TouchableOpacity>
          }
          {
            imageUrl_4 &&
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.playMemories(data && data.item && data.item.length > 3 && data.item[3])}
              style={{ height: 140, width: 140, borderRadius: 5, backgroundColor: '#000' }}>
              <Image
                source={{ uri: imageUrl_4 }}
                style={{
                  height: 140,
                  width: 140,
                  resizeMode: 'cover',
                  borderRadius: 5,
                  opacity: .8
                }}
              />
              <View style={styles.gridAbsoluteView}>
                <Text style={styles.gridCityText}>Surat</Text>
                <Text style={styles.dridDateText}>{cerateAtDate_4}</Text>
              </View>
            </TouchableOpacity>
          }

        </View>
      </View>
    )
  }

  render() {
    const { items, memoriesList } = this.state;
    let slidData = this.props.galleryData
    let newDate = moment(new Date()).format('dddd, DD MMMM').toUpperCase();
    let masterMemori = memoriesList && memoriesList.length > 0 && memoriesList[0];

    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerView}>
            <Text style={{ fontWeight: 'bold' }}>{newDate}</Text>
            <Text style={styles.forYouText}>For You</Text>
          </View>
          {
            memoriesList && memoriesList.length > 0 ?
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.memoriesView}>
                  <Text style={styles.memoriesText}>Memories</Text>
                  <Text style={styles.seeAllText}>See All</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.masterImageView}>
                  <Image
                    source={{ uri: masterMemori[0].data[0].image.uri }}
                    style={styles.masterImage}>
                  </Image>
                  <View style={styles.memoAbsoluteView}>
                    <Text style={styles.cityText}>Surat</Text>
                    <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{moment.unix(masterMemori[0].data[0].timestamp).utc().format('DD MMM YYYY').toLocaleUpperCase()}</Text>
                  </View>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 9 }}>
                  <FlatList
                    data={memoriesList}
                    horizontal={true}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(data) => this.renderItemList(data)}
                    onEndReachedThreshold={0.5}
                  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Memories);

