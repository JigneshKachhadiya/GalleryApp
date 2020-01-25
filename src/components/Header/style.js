import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from './../../styles/colors'
import Fonts from './../../styles/fonts';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    headerBackIconView: {
        height: 50,
        width: deviceWidth,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center'
        borderBottomWidth: 1,
        borderColor: '#bcbcbc'
    },
    headerParentView: {
        height: 60,
        width: deviceWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerTitle: {
        color: Colors.darkGray,
        ...Fonts.fontHeaderTitle
    },
    headerBackTitle: {
        color: Colors.black,
        ...Fonts.fontHeadlineBold,
    },
    titleView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#bcbcbc'
    },

});

export default styles;
