import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // top: 50
    },
    headerTitleView: {
        height: 40,
        alignItems: 'center'
    },
    headerTitle: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600'
    },
    profileImgstyle: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    profileText: {
        color: Colors.blue,
        fontSize: 22,
        fontWeight: '600'
    },
    description: {
        color: Colors.grey,
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center'
    },
    btnView: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgView: {
        height: 100,
        width: 100,
    },
    btnStyle: {
        height: 50,
        width: 110,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    btnText: {
        color: Colors.white,
        fontWeight: '600'
    },
    msgBtnStyle: {
        height: 50,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.blue1
    },
    msgBtnText: {
        color: Colors.blue1,
        fontWeight: '600'
    },
    followerStyle: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    followersText: {
        color: Colors.grey, fontSize: 12, fontWeight: '300', textAlign: 'center', marginTop: 2
    },
    followersCenterView: {
        flex: 1,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: Colors.grey
    },
    imgStyle: {
        height: 100,
        width: 100,
        borderRadius: 15,
        resizeMode: 'cover'
    },
    songTitle: {
        color: Colors.blue1, fontWeight: '600'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    songText: {
        ...Fonts.fontSize14,
        color: Colors.black,
        fontWeight: '500',
        marginTop: 5,
        marginHorizontal: 5
    },
    margin20: {
        margin: 20
    },
    socialContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20
    },
    socialBtnView: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    socialBntStyle: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    socialBtnText: {
        marginHorizontal: 10,
        fontSize: 15,
        color: Colors.grey,
        fontWeight: '600'
    },
    socialImg: {
        height: 20, width: 20
    },
    instaText: {
        marginHorizontal: 5,
        fontSize: 15,
        color: Colors.grey,
        fontWeight: '600'
    },

    // ------------------------- ShowMemrorie Styels  ------------------------------------

    headerView: {
        height: 40,
        width: deviceWidth,
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        // marginBottom: 10,
        padding: 5
    },
    forYouText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000'
    },
    memoriesView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    memoriesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    seeAllText: {
        fontSize: 14,
        color: '#1a67fb',
        marginTop: 20,
        marginBottom: 10
    },
    masterImageView: {
        backgroundColor: '#000',
        height: 200,
        width: deviceHeight,
        resizeMode:'cover',
        width: deviceWidth
        // marginHorizontal: 10,
        // borderRadius: 10,
    },
    masterImage: {
        height: 200,
        width: deviceWidth,
        resizeMode: 'cover',
        // borderRadius: 10,
        opacity: .8
    },
    memoAbsoluteView: {
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 100,
        left: 50,
        right: 50
    },
    cityText: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '800',
        letterSpacing: 1
    },
    gridAbsoluteView: {
        position: 'absolute',
        top: 52,
        left: 40,
        alignItems: 'center'
    },
    gridCityText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    dridDateText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold'
    },
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
        width: (deviceWidth - 50) / 1.41,
        height: (deviceWidth - 50) / 1.41,
        borderRadius: 10
    },

});

export default styles;
