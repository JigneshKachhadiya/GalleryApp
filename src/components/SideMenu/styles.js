import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Colors from './../../styles/colors'
import Fonts from './../../styles/fonts';

const styles = StyleSheet.create({
    sideBarMainView: {
        flex: 1,
        marginLeft: 100
    },
    closeIconView: {
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    profielImgStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'cover'
    },
    profileTxt1: {
        ...Fonts.profileFont,
        color: Colors.blue1,
    },
    profileTxt2: {
        ...Fonts.fontSize14,
        color: Colors.black
    },
    mainView: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 0 : 90,
        backgroundColor: '#fff',
        ...ifIphoneX({
            paddingTop: 50,
        }, {
                paddingTop: Platform.OS === 'ios' ? 20 : 0,
            })

    },
    sideBarText: {
        flex: 2,
        justifyContent: 'center',
    }

});

export default styles;
