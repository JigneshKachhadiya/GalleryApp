import React, { Component } from "react";
import { View, PanResponder, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

function calcDistance(x1, y1, x2, y2) {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

class ZoomableImage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      previousDistance: 0,
      previousX: 0,
      previousY: 0,
      scale: 1,
      translateX: 0,
      translateY: 0
    };
  }


  processPinch(x1, y1, x2, y2) {

    let distance = calcDistance(x1, y1, x2, y2);
    let scale = Math.abs(this.state.previousDistance - distance) / 100;
    console.log('previoius distance', this.state.previousDistance, distance, scale);
    if (this.state.previousDistance != 0) {
      if (this.state.previousDistance < distance) { // ------ zoom in
        if (this.state.scale + scale > 4) {
          scale = 4
        }
        else {
          scale = this.state.scale + scale;
        }
      }
      if (this.state.previousDistance > distance) {  /// ------ zoom out
        console.log('zooming out');
        if ((this.state.scale - scale) < 1) {
          scale = 1
          console.log('sclae is less than 1', scale)
        }
        else {
          scale = this.state.scale - scale;
          this.setState({ translateX: 0, translateY: 0 })
          console.log('sclae is ', scale)
        }
      }
      console.log('scaling%%%%%%%%%%%%%%', this.state.scale, scale)
      this.setState({ scale: scale });
    }

    this.setState({ previousDistance: distance });
  }

  processTouch(x, y) {
    console.log('process Touch', x, y, this.state.previousDistance);
    let { previousX, previousY, translateX, translateY } = this.state;
    if (previousX == 0 && previousY == 0) {
      this.setState({ previousX: x, previousY: y });
    }
    else {
      this.setState({ translateX: translateX + (x - previousX), translateY: translateY - (previousY - y), previousX: x, previousY: y });
    }
    console.log('image translated -->', this.state.translateX, this.state.translateY);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // onStartShouldSetPanResponder: () => true,
      // onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log('onPanResponderGrant', gestureState);
      },
      onPanResponderMove: evt => {
        const touches = evt.nativeEvent.touches;
        if (touches.length === 2) {
          this.processPinch(
            touches[0].pageX,
            touches[0].pageY,
            touches[1].pageX,
            touches[1].pageY
          );
        }
        else {
          this.state.scale > 1 && this.processTouch(touches[0].pageX, touches[0].pageY);
        }
      },

      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ previousDistance: 0 })
      },
      onPanResponderTerminate: () => { },
      // onShouldBlockNativeResponder: () => true
    });
  }

  resetImage() {
    this.setState({ scale: 1, translateX: 0, translateY: 0 })
  }
  render() {
    return (
      <View
        style={this.props.style}
        {...this._panResponder.panHandlers}
      >
        <Image
          style={[
          {
            resizeMode: 'contain',
            width: '100%',
            height: '100%',
            transform: [
              { translateX: this.state.translateX },
              { translateY: this.state.translateY },
              { scale: this.state.scale }
            ]
          }]}
          source={this.props.source}
        />
      </View>
    );
  }
}

ZoomableImage.propTypes = {
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  source: PropTypes.object.isRequired
};
export default ZoomableImage;