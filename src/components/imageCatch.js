import React, { PureComponent } from "react";
import { ActivityIndicator, Image, StyleSheet, View, Animated } from "react-native";
import { CachedImage, ImageCacheProvider } from "react-native-cached-image";
import Images from './../styles/images'
export default class ImagePlaceholder extends PureComponent {
  static defaultProps = {
    duration: 750,
    showActivityIndicator: false,
    resizeMode: "cover"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fadeAnim: new Animated.Value(1)
    };
  }

  _onLoadEnd() {
    this.setState({ isLoading: false });
  }

  render() {
    // console.log('-----SRC props --------->', this.props)
    return (
      <View style={[styles.container, this.props.style]}>
        {this._renderPlaceholder.bind(this)()}
        {/* <ImageCacheProvider
        urlsToPreload={this.props.src}> */}
        <CachedImage
          resizeMode={this.props.resizeMode}
          onLoadEnd={this._onLoadEnd.bind(this)}
          onProgress={this._onProgress.bind(this)}
          style={[styles.image, this.props.imageStyle]}
          source={{ uri: this.props.src }}
        />
        {/* </ImageCacheProvider> */}
      </View>
    );
  }

  _onProgress(event) {
    const progress = event.nativeEvent.loaded / event.nativeEvent.total;
    this.setState({ isLoading: progress < 1 });
  }

  _renderPlaceholder() {
    return (
      <Animated.View style={this._getPlaceholderStyles()}>
        <Image
          resizeMode={this.props.resizeMode}
          style={[styles.placeholder, this.props.imageStyle]}
          source={require('@assets/images/place.jpg')}
        />
        {/* {this._renderActivityIndicator()} */}
      </Animated.View>
    );
  }

  _getPlaceholderStyles() {
    let container = [styles.placeholderContainer];

    if (!this.state.isLoading) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: this.props.duration
      }).start();
      container.push({ opacity: this.state.fadeAnim });
    }
    container.push(this.props.placeholderContainerStyle);
    return container;
  }

  // _renderActivityIndicator() {
  //   if (this.props.showActivityIndicator) {
  //     if (this.props.ActivityIndicator) {
  //       return this.props.ActivityIndicator;
  //     } else {
  //       return (
  //         <ActivityIndicator
  //           {...this.props.activityIndicatorProps}
  //           animating={this.state.isLoading}
  //         />
  //       );
  //     }
  //   } else {
  //     return null;
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    alignSelf: "stretch",
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  placeholder: {
    flex: 1,
    alignSelf: "stretch",
    zIndex: 2,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  image: {
    flex: 1
  }
});