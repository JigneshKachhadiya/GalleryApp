import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    photoSection: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 13,
        backgroundColor: '#fff'
    },
    photoGridStyel: {
        width: (deviceWidth - 50) / 3,
        height: (deviceWidth - 50) / 3,
        borderRadius: 10
    },
    bigPhotoGrid: {
        width: (deviceWidth - 50) / 1.42,
        height: (deviceWidth - 50) / 1.42,
        borderRadius: 10
    },
    // for single image -------------------
    oneView: {
        borderRadius: 10,
        overflow: "hidden",
    },
    oneImg: {
        width: (deviceWidth - 35) / 1.95,
        height: (deviceWidth - 35) / 1.95,
        resizeMode: 'cover'
    },
    // for two image -------------------
    twoViewOne: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: "hidden",
        // paddingRight: 2,
    },
    twoImgOne: {
        width: (deviceWidth - 35) / 4,
        height: (deviceWidth - 35) / 2,
        resizeMode: 'cover'
    },
    twoViewTwo: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden",
        paddingLeft: 1,
    },
    twoImgTwo: {
        width: (deviceWidth - 35) / 4,
        height: (deviceWidth - 35) / 2,
        resizeMode: 'cover'
    },
    // for three image -------------------
    threeViewOne: {
        borderTopLeftRadius: 10,
        overflow: "hidden",
        // paddingRight: 1,
        // paddingBottom: 1
    },
    Img: {
        width: (deviceWidth - 35) / 3.93,
        height: (deviceWidth - 35) / 4,
        resizeMode: 'cover'
    },
    threeViewTwo: {
        borderTopRightRadius: 10,
        overflow: "hidden",
        paddingLeft: 1,
        paddingBottom: 0.5
    },
    threeViewThree: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden",
        // paddingTop: 2
    },
    threeImgThree: {
        width: (deviceWidth - 35) / 1.95,
        height: (deviceWidth - 35) / 4,
        resizeMode: 'cover'
    },
    // for four image -------------------
    fourViewOne: {
        borderTopLeftRadius: 10,
        overflow: "hidden",
        // paddingRight: 2,
        // paddingBottom: 2
    },
    fourViewTwo: {
        borderTopRightRadius: 10,
        overflow: "hidden",
        paddingLeft: 1,
        paddingBottom: 1
    },
    fourViewThree: {
        borderBottomLeftRadius: 10,
        overflow: "hidden",
        // paddingRight: 2,
        // paddingTop: 2
    },
    fourViewFour: {
        borderBottomRightRadius: 10,
        overflow: "hidden",
        paddingLeft: 1,
        // paddingTop: 1
    },
    // ---------------------------------
    textView: {
        width: (deviceWidth / 2) - 15,
        margin: 5
    },
    groupText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000'
    },
    froupCount: {
        fontSize: 16,
        color: '#777',
        marginTop: 5
    },
    mainView: {
        margin: 5,
        alignItems: 'center'
    },
    btnAddAlbum: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        position: 'absolute',
        right: 20,
        bottom: Platform.OS == 'ios' ? 20 : 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;
