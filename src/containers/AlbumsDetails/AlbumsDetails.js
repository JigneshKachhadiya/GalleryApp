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
    TouchableOpacity
} from "react-native";
import moment from 'moment';
import _ from "underscore";
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
class AlbumsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastCursor: '',
            loadingMore: false,
            photosList: [],
            photoData: [],
            noMore: true,
        }
        // this._doFetch = this._doFetch.call(this)
    }

    componentDidMount() {
        this._resCameraRoll();
    }

    _onEndReache = () => {
        const { lastCursor, loadingMore, noMore } = this.state;
        if (loadingMore) {
            this.setState({ noMore: true }, () => { this._doFetch(lastCursor) });
        }
    }
    _resCameraRoll() {
        const albumArr = this.props.navigation.state.params.albumData
        let PhotoArray = this.state.photoData;
        albumArr && albumArr.length > 0 && albumArr.map((item) => {
            PhotoArray.push(item.node)
        })
        this.setState({
            photoData: PhotoArray,
            noMore: false
        })
        let groupImage = _.groupBy(albumArr, (data) => {
            return moment.unix(data.timestamp).utc().format('DD MMM YYYY');
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
    }

    _viewPhotos = (item) => {
    //      let w, h;
    // let ci = this.props.getGalleryData.data.map((d) => d.image.uri).indexOf(item);
    // Image.getSize(item, (w, h) => {
    //   w = w; h = h;
    // }, (rej) => console.log(rej));
    // if (item) {
    //   this.props.navigation.navigate('ViewImage', { currentIndex: ci, height: h, width: w })
    // }
    };

    _photosGrid(item, index) {
        let isEvenNo = index % 2 == 0
        return (
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
                <View style={[commonStyles.flexRow, commonStyles.jsSpaceBT]}>
                    <TouchableOpacity activeOpacity={0.9}
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
                                        style={{ backgroundColor: item[4] ? randomHex() : '#fff', borderRadius: 10 }}
                                        onPress={() => { this._viewPhotos(item[4] && item[4].image.uri) }}>
                                        <Image source={{ uri: item[4] && item[4].image.uri }}
                                            style={styles.photoGridStyel}
                                            resizeMode={'cover'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        onPress={() => { this._viewPhotos(item[5] && item[5].image.uri) }} style={{ marginTop: 13 }}>
                                        <View style={{ backgroundColor: item[5] ? randomHex() : '#fff', borderRadius: 10 }}>
                                            <Image source={{ uri: item[5] && item[5].image.uri }}
                                                style={styles.photoGridStyel}
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
    }

    renderFooterSpinner() {
        if (this.state.noMore) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            )

        }
        return null;
    }

    render() {
        const album = this.props.navigation.state.params.albumData
        const { photosList, data } = this.state;
        return (
            <SafeAreaView style={commonStyles.container}>
                <Header isBack={true} Title={album[0].group_name} navigation={this.props.navigation} />
                <View style={{ marginBottom: 50 }}>
                    <SectionList
                        renderItem={({ item, index, section }) => this._photosGrid(item, index, section)}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.photoSection}>
                                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                            </View>
                        )}
                        refreshing={true}
                        removeClippedSubviews={true}
                        initialNumToRender={20}
                        sections={photosList}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => this._onEndReache()}
                        keyExtractor={(item, index) => item + index}
                        ListFooterComponent={this.renderFooterSpinner()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>);
    }
}

export default AlbumsDetails;