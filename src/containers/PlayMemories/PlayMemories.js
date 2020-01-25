// @flow
import React, { Component } from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Dimensions,
    FlatList
} from "react-native";
import commonStyles from "../../styles";
import Colors from "../../styles/colors";
import Images from '../../styles/images';
import styles from './style';
import ImagePlaceholder from '../../components/imageCatch';
import Icon from 'react-native-vector-icons/AntDesign';
import TimedSlideshow from 'react-native-timed-slideshow';
import { connect } from 'react-redux';
import BurnsImage from 'react-native-kenburns-view';
import { bindActionCreators } from 'redux';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class PlayMemories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryImages: [],
            index: 0,
            CurrentIndex: 0
        }
        this.slider = this.slider.bind(this);
    }

    componentDidMount() {
        const getGalleryData = this.props.navigation.state.params.memoriesArray;
        setInterval(() => {
            this.slider();
        }, 5000);
    }

    slider() {
        this.setState({
            CurrentIndex: this.state.CurrentIndex + 1
        })
        this.myFlatList.scrollToOffset({
            offset: this.state.CurrentIndex * deviceWidth,
            animated: true
        })
    }

    componentWillMount() {
        setInterval(() => {
            this.playMusic()
        }, 5000);
    }

    playMusic() {
        var whoosh = new Sound('https://www.computerhope.com/jargon/m/example.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }

    goBack = () => {
        this.props.navigation.navigate('Memories');
    }

    renderPhotoList(data) {
        console.log('render Index----------->', data.index)
        console.log('render Data----------->', data)
        return (
            <BurnsImage
                tension={4}
                friction={50}
                imageWidth={deviceWidth}
                imageHeight={deviceHeight}
                sourceUri={{ uri: data.item.image.uri }}
            // placeholderSource={require('./../../assets/images/place.jpg')}
            />
        )
    }
    render() {
        const getGalleryData = this.props.navigation.state.params.memoriesArray;
        return (
            <SafeAreaView style={commonStyles.container}>
                <FlatList
                    ref={(ref) => this.myFlatList = ref}
                    data={getGalleryData}
                    extraData={this.state}
                    horizontal={true}
                    pagingEnabled={true}
                    keyExtractor={this._keyExtractor}
                    style={{ marginTop: 10 }}
                    renderItem={(element) => this.renderPhotoList(element)}
                    onEndReachedThreshold={0.5}
                />
                {/* <TimedSlideshow
                    items={playList}
                    fullWidth={true}
                    showProgressBar={false}
                    onClose={this.goBack}
                /> */}
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayMemories);

