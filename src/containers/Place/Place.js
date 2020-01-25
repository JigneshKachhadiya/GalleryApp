// @flow
import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import _ from "underscore";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import commonStyles from "../../styles";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as GalleryActions from '../../actions/galleryAction';

import styles from "./style";

let zoomLevel = 4;
class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosList: [],
      placeData: [],
      currentLat: null,
      currentLng: null,
      tracksViewChanges: true,
      initialZoomLevel: 4,
      isPlaceOfGroup: true,
      regionCurrentLat: null,
      regionCurrentLng: null,
      initialRender: true,
      isinitRender: true
    }
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      const { regionCurrentLat, regionCurrentLng, initialZoomLevel } = this.props.navigation.state.params;
      if (regionCurrentLat && regionCurrentLng && initialZoomLevel) {
        this.setState({
          currentLat: regionCurrentLat,
          currentLng: regionCurrentLng,
          initialZoomLevel: initialZoomLevel,
          isPlaceOfGroup: false,
        })
      }
    }
    this.onLocationPressed();
  }

  async componentDidMount() { }

  onLocationPressed = () => {
    const { params } = this.props.navigation.state
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
        .then(data => {
          if (data == 'already-enabled' || data == 'enabled') {
            this.getGeolocation();
          }
        }).catch(err => {
          alert("Error " + err.message + ", Code : " + err.code);
        });
    } else {
      this.getGeolocation();
    }
  }

  getGeolocation = async () => {
    const { params } = this.props.navigation.state
    if (params == undefined) {
      navigator.geolocation.getCurrentPosition(position => {
        const cLongitude = position.coords.longitude;
        const cLatitude = position.coords.latitude;
        this.setState({
          currentLat: cLatitude,
          currentLng: cLongitude,
        });
      }, (error) => console.log(JSON.stringify(error)),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 20000 })
    }
    this._resCameraRoll();
  }

  _resCameraRoll() {
    const { initialZoomLevel } = this.state;
    let galleryData = this.props.getGalleryData && this.props.getGalleryData.data ? this.props.getGalleryData.data : null;
    let locationData = galleryData.filter(d => {
      if (d && d) {
        if (d.location && d.location.latitude !== undefined && d.location.longitude !== undefined) {
          return d
        }
      }
    })

    let newGroupImage = _.groupBy(locationData, (a) => {
      if (a.location.latitude !== undefined && a.location.longitude !== undefined) {
        return a.location.latitude.toFixed(2) && a.location.longitude.toFixed(2)
      } else { }
    })

    let finalData = []
    for (key in newGroupImage) {
      const temp = { 'title': key, data: newGroupImage[key] }
      finalData.push(temp)
    }

    let reversFinalData = finalData.reverse();
    this.setState({
      photosList: reversFinalData
    })
    this.placePhotosGroup(initialZoomLevel)
  }

  getImages(images) {
    const { regionCurrentLat, regionCurrentLng, initialZoomLevel, currentLat, currentLng } = this.state;
    currentPossession = {}
    if (regionCurrentLat == null && regionCurrentLng == null) {
      currentPossession.regionCurrentLat = currentLat;
      currentPossession.regionCurrentLng = currentLng;
      currentPossession.initialZoomLevel = initialZoomLevel;
    } else {
      currentPossession.regionCurrentLat = regionCurrentLat;
      currentPossession.regionCurrentLng = regionCurrentLng;
      currentPossession.initialZoomLevel = initialZoomLevel;
    }
    this.props.navigation.navigate('PlaceImage', { AllImage: images, currentLocation: currentPossession })
  }

  onRegionChange = (region) => {
    if (region) {
      const cLongitude = region.longitude;
      const cLatitude = region.latitude;
      this.setState({
        regionCurrentLat: cLatitude,
        regionCurrentLng: cLongitude,
      });
      let zoomLevel = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
      let isEvenNo = zoomLevel % 2 == 0;
      if (isEvenNo) {
        this.placePhotosGroup(zoomLevel);
      }
      this.setState({
        initialZoomLevel: zoomLevel
      })
    }
  }

  placePhotosGroup(zoomLevel) {
    const { isPlaceOfGroup, photosList, isinitRender } = this.state;
    let locationOfGroup = [];
    if (zoomLevel >= 8) {
      if (isinitRender) {
        this.setState({
          initialRender: true,
          isinitRender: false
        })
      }
      locationOfGroup.push(...photosList)
    } else if (zoomLevel == 7) {
      locationOfGroup.push(photosList[0], photosList[1])
    } else if (zoomLevel <= 6) {
      locationOfGroup.push(photosList[0])
    }
    this.setState({
      placeData: locationOfGroup
    })
  }
  // placePhotosGroup(zoomLevel) {
  //   const { isPlaceOfGroup, photosList } = this.state
  //   let locationOfGroup = [];
  //   if (isPlaceOfGroup) {
  //     if (zoomLevel >= 8) {
  //       locationOfGroup.push(...photosList)
  //       this.setState({
  //         isPlaceOfGroup: false
  //       })
  //     } else if (zoomLevel == 7) {
  //       locationOfGroup.push(photosList[0], photosList[1])
  //     } else if (zoomLevel <= 6) {
  //       locationOfGroup.push(photosList[0])
  //     }

  //     this.setState({
  //       placeData: locationOfGroup
  //     })
  //   }
  // }

  render() {
    const { photosList, currentLat, currentLng, initialZoomLevel, placeData, initialRender } = this.state;
    let allPlaceData = placeData;
    return (
      <SafeAreaView style={commonStyles.container}>
        {/* <NavigationEvents onWillFocus={payload => { this.componentWillMount(), this._resCameraRoll() }} /> */}
        {
          currentLat && currentLng ?
            <MapView style={{ height: '100%', width: '100%' }}
              provider={Platform.OS === 'android' ? 'google' : null}
              camera={{
                center: {
                  latitude: parseFloat(currentLat),
                  longitude: parseFloat(currentLng),
                },
                pitch: 1,
                heading: 1,
                altitude: 1,
                zoom: parseFloat(zoomLevel),
              }}
              loadingEnabled={true}
              rotateEnabled={true}
              minZoomLevel={initialZoomLevel}
              cacheEnabled={true}
              onRegionChange={this.onRegionChange}
            >
              {
                allPlaceData && allPlaceData[0] !== undefined && allPlaceData.length > 0 && allPlaceData.map((d, i) => {
                  let firstData = d.data[0];
                  let imageUrl = firstData.image.uri
                  let noOfImg = d.data.length;
                  if (firstData) {
                    let latlng = {
                      latitude: parseFloat(firstData.location.latitude),
                      longitude: parseFloat(firstData.location.longitude),
                    }
                    return (
                      <MapView.Marker style={{ width: 80, height: 100, justifyContent: 'center' }} tracksViewChanges={this.state.tracksViewChanges} key={i} coordinate={latlng} onPress={() => this.getImages(d.data)} >
                        <ImageBackground
                          source={{ uri: imageUrl }}
                          style={styles.markerPlaceImage}
                          onLoad={() => this.forceUpdate()}
                          onLayout={() => this.setState({ initialRender: false })}
                          key={`${this.state.initialRender}`}
                        >
                          <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
                        </ImageBackground>
                        <View style={styles.placeCounter}>
                          <Text style={styles.counterText}>{noOfImg}</Text>
                        </View>
                      </MapView.Marker>
                    )
                  }
                })
              }
            </MapView>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} />
            </View>
        }
      </SafeAreaView>);
  }
}

function mapStateToProps(state) {
  console.log('---------gallery Data--------', state.gallery.galleryData)
  return {
    getGalleryData: state.gallery.galleryData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GalleryActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);