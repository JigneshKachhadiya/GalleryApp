import React from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  CameraRoll,
  Animated,
  VirtualizedList,
  FlatList,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageResizer from 'react-native-image-resizer';
import ImageRotate from 'react-native-image-rotate';
import AmazingCropper from 'react-native-amazing-cropper';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ViewImageHeader from '../../components/ViewImageHeader';
import BottomTab from '../../components/BottomTab';
import ZoomableImage from '../../components/ZoomImage';
import CropImageFooter from '../../components/CropImageFooter';
import * as GalleryActions from '../../actions/galleryAction';
import Colors from '../../styles/colors';
import styles from './style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class ViewImage extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    let ci = props.navigation.getParam('currentIndex'); // current image index
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid
        )
    );
    this.state = {
      currentIndex: ci,
      originalImg: '',
      isEditing: false,
      changedImg: '',
      currentAction: '',
      imgHeight: 0,
      imgWidth: 0,
      isChanged: false,
      isCancel: false,
      scale: 1,
      translateX: 0,
      translateY: 0
    }
    this.changeAction = this.changeAction.bind(this);
    this.cancelAction = this.cancelAction.bind(this);
    this.doneAction = this.doneAction.bind(this);
    this.onDone = this.onDone.bind(this);
    this.closeAction = this.closeAction.bind(this);
    this._saveImage = this._saveImage.bind(this);
    this._exit = this._exit.bind(this);
    this._goBack = this._goBack.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    let { uri, height, width } = this.props.getGalleryData.data[this.state.currentIndex].image;
    this.setState({ originalImg: uri, imgWidth: width, imgHeight: height });
  }
  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid
        )
    );
  }
  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }


  onBackButtonPressAndroid = () => {
    let { isEditing, isChanged, currentAction } = this.state;
    console.log('back pressed', isEditing, isChanged, currentAction)
    if (isEditing) {
      if (currentAction != '') {
        this.setState({ currentAction: '', changedImg: '' })
      }
      else {
        if (isChanged) {
          Alert.alert(
            'Are you sure ?',
            'All Changes will be discarded',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK', onPress: () => this.setState({ isEditing: false }) },
            ],
            { cancelable: false },
          );
        }
        else {
          this.setState({ isEditing: false });
        }
      }
    }
    else {
      this.props.navigation.navigate('Home');
    }
    return true
  };
  getItemLayout(data, index) {
    return {
      length: WIDTH,
      offset: (WIDTH) * index,
      index
    };
  }
  changeAction(action) {
    this.setState({ currentAction: action, });
  }
  cancelAction() {
    this.setState({ changedImg: '', currentAction: '', })
  }
  doneAction() {
    Image.getSize(this.state.changedImg, (w, h) => {
      this.setState({ imgWidth: w, imgHeight: h })
    }, (rej) => console.log(rej));
    this.setState({ currentAction: '', originalImg: this.state.changedImg || this.state.originalImg, changedImg: '', isChanged: true });
  }
  _resizeImage(ratio) {
    let { imgHeight, imgWidth, originalImg } = this.state;
    let resizeHeight;
    let resizeWidth;
    switch (ratio) {
      case 'square':
        resizeHeight = resizeWidth = imgHeight < imgWidth ? imgHeight / 2 : imgWidth / 2;
        break;
      case '3-2':
        resizeHeight = Math.min(imgHeight, imgWidth) * 2 / 5;
        resizeWidth = Math.min(imgHeight, imgWidth) * 3 / 5;
        break;
      case '3-4':
        resizeHeight = Math.min(imgHeight, imgWidth) * 4 / 7;
        resizeWidth = Math.min(imgHeight, imgWidth) * 3 / 7;
        break;
      case '16-9':
        resizeHeight = Math.min(imgHeight, imgWidth) * 9 / 25;
        resizeWidth = Math.min(imgHeight, imgWidth) * 16 / 25;
        break;
    }
    console.log(resizeWidth, resizeHeight);
    if (resizeWidth <= 0 || resizeHeight <= 0) { return }
    ImageResizer.createResizedImage(originalImg, resizeWidth, resizeHeight, 'JPEG', 100)
      .then(({ uri }) => {
        this.setState({
          isChanged: true,
          changedImg: uri,
        })
      })
      .catch(err => {
        console.log(err);
        return Alert.alert('Something went wrong', 'Unable to resize the photo');
      });
  }
  _rotation(deg) {
    ImageRotate.rotateImage(
      this.state.changedImg || this.state.originalImg,
      deg,
      (uri) => {
        this.setState({
          changedImg: uri,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onDone = (croppedImageUri) => {
    Image.getSize(croppedImageUri, (w, h) => {
      console.log('image width height ', w, h)
      this.setState({ imgWidth: w, imgHeight: h })
    }, (rej) => console.log(rej));

    this.setState({ originalImg: croppedImageUri, currentAction: '', isChanged: true });
  }
  onDelete = async () => {
    // const filepath = this.state.originalImg;
    // console.log(filepath);  
    // Alert.alert(
    //   'Delete',
    //   'Are you sure ?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Delete', onPress: () => {
    //         RNFS.exists(filepath).then((result) => {
    //           console.log('file exist', result);
    //           if (result == true) {
    //             this.props.actions.deletePhoto(filepath);
    //             RNFS.unlink(filepath)
    //               .then(() => {
    //                 console.log('deleted');
    //                 RNFS.scanFile(filepath).then((data)=>{
    //                   console.log("scanned file", data  );
    //                     this.props.navigation.navigate('Home');
    //                 }).catch((Err)=>{
    //                   console.log("scan errro => ",Err)
    //                 })
    //               })
    //               .catch((err) => {
    //                 console.log(err);
    //               })
    //           }
    //         }).catch((err) => console.log(err.message));
    //       }
    //     },
    //   ],
    //   { cancelable: false },
    // );
  }
  onCancel = () => {
    this.setState({ currentAction: '', isCancel: true })
  }
  closeAction() {
    console.log('close action');

    let { isChanged } = this.state;
    if (isChanged) {
      Alert.alert(
        'Are You Sure ?',
        'All changes will be discarded',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.setState({ isEditing: false, isChanged: false, currentAction: '', changedImg: '' }) },
        ],
        { cancelable: false },
      );
    }
    else {
      this.setState({ isEditing: false, currentAction: '', changedImg: '' });
    }
  }
  onViewableItemsChanged = ({ viewableItems, changed }) => {

    this.ZoomableImage.resetImage();
    let { index, isViewable } = changed[0];
    if (isViewable) {
      Image.getSize(this.props.getGalleryData.data[index].image.uri, (w, h) => {
        this.setState({ imgWidth: w, imgHeight: h })
      }, (rej) => console.log(rej));
      this.setState({ currentIndex: index, originalImg: this.props.getGalleryData.data[index].image.uri })
    }
  }
  _saveImage = async () => {
    const { originalImg } = this.state
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            'title': 'Access Storage',
            'message': 'Access Storage for the pictures'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          try {
            CameraRoll.saveToCameraRoll(originalImg)
              .then(res => {
                console.log('save image Result--->', res)
                this.props.navigation.navigate('Home');
              })
              .catch(err => console.log('err:', err))
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("Storage permission denied")
        }
      } catch (err) { }
    } else {

    }
  };
  _goBack() {
    this.props.navigation.navigate('Home');
  }
  _exit() {
    console.log('is exits call')
    if (this.state.isChanged == false) {
      Animated.timing(
        this.state.animation,
        {
          toValue: -1,
          duration: 500,
          useNativeDriver: true
        }
      ).start();
      this.props.navigation.navigate('Home');
    }
    else {
      Alert.alert(
        'Are you sure ?',
        'All Changes will be discarded',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
        ],
        { cancelable: false },
      );
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
        {this.state.currentAction == 'Crop' &&
          <AmazingCropper
            footerComponent={
              <CropImageFooter changeAction={this.changeAction} />}
            onDone={this.onDone}
            onCancel={this.onCancel}
            imageUri={this.state.originalImg}
            imageWidth={this.state.imgWidth}
            imageHeight={this.state.imgHeight}
            NOT_SELECTED_AREA_OPACITY={0.3}
            BORDER_WIDTH={20}
          />
        }
        {this.state.currentAction != 'Crop' &&

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {
                this.state.isEditing == true ?
                  <ViewImageHeader navigation={this.props.navigation} isChanged={this.state.isChanged} isEditing={this.state.isEditing} closeAction={this.closeAction} saveImage={this._saveImage} close={this._exit} />
                  :
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity style={{ padding: 20, }} onPress={this._goBack} >
                      <MaterialCommunityIcons name="keyboard-backspace" size={30} color={Colors.dark} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: WIDTH / 1.5, color: Colors.dark, fontSize: 15, fontWeight: '500' }}>{this.state.originalImg.slice(this.state.originalImg.lastIndexOf('/') + 1)}</Text>
                  </View>
              }
            </View>
            {
              this.state.isEditing == false ?
                <View style={[{ flex: 9, }]}
                  onLayout={(e) => this.setState({ imgContainerHeight: e.nativeEvent.layout.height })}
                >
                  <VirtualizedList
                    ref={(ref) => this.virtualList = ref}
                    style={{ width: WIDTH, flex: 1, }}
                    pagingEnabled={true}
                    viewabilityConfig={{
                      itemVisiblePercentThreshold: 60
                    }}
                    getItem={(data, index) => data[index]}
                    getItemCount={data => { return data != null ? data.length : 0 }}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.getGalleryData.data}
                    initialScrollIndex={this.state.currentIndex}
                    getItemLayout={(data, index) => (
                      { length: WIDTH, offset: WIDTH * index, index }
                    )}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(d) =>
                      <ZoomableImage
                        ref={ (ref) => this.ZoomableImage = ref}
                        imageWidth={d.item.image.width}
                        imageHeight={d.item.image.height}
                        source={{ uri: d.item.image.uri }}
                        style={{ width: WIDTH, height: '100%', resizeMode: 'contain' }}
                      />
                    }
                  />
                </View>
                :
                <View style={{ flex: 9, justifyContent: 'center' }}>
                  <Image style={{ width: WIDTH, flex: 1 }}
                    source={{ uri: this.state.changedImg || this.state.originalImg }} resizeMode={'contain'} />
                </View>
            }
            {
              this.state.currentAction == 'Resize' &&
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => this._resizeImage('square')}
                  style={styles.resizeBox}>
                  <Text style={{ color: Colors.black }}>Square</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._resizeImage('3-4')}
                  style={styles.resizeBox}>
                  <Text style={{ color: Colors.black }}>3:4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._resizeImage('3-2')}
                  style={styles.resizeBox}>
                  <Text style={{ color: Colors.black }}>3:2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._resizeImage('16-9')}
                  style={styles.resizeBox}>
                  <Text style={{ color: Colors.black }}>16:9</Text>
                </TouchableOpacity>
              </View>
            }
            {
              this.state.currentAction == 'Rotate' &&
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Colors.blackOpacity20, marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={() => this._rotation(-90)}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                  <Feather name='rotate-ccw' size={30} color={Colors.black} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._rotation(90)}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                  <Feather name='rotate-cw' size={30} color={Colors.black} />
                </TouchableOpacity>
              </View>
            }
            <View style={{ flex: 1, }}>
              {
                !this.state.isEditing == true ?
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 20, }} onPress={() => this.setState({ isEditing: true })}>
                      <Feather name="edit" size={30} color={Colors.dark} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 20, }} onPress={this.onDelete} >
                      <FontAwesome name="trash-o" size={30} color={Colors.dark} />
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <BottomTab changeAction={this.changeAction}
                      cancelAction={this.cancelAction}
                      doneAction={this.doneAction}
                      currentAction={this.state.currentAction} />
                  </View>
              }
            </View>
          </View>
        }
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  console.log('-----------View Image-State--------------->', state.gallery)
  return {
    getGalleryData: state.gallery.galleryData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GalleryActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewImage);