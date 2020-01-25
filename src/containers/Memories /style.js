import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    headerView: {
        height: 80,
        width: deviceWidth,
        borderBottomWidth: 0.5,
        borderBottomColor: '#C0C0C0',
        marginBottom: 10,
        padding: 11
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
        fontSize: 17,
        color: '#1a67fb',
    },
    masterImageView: {
        backgroundColor: '#000',
        marginHorizontal: 10,
        borderRadius: 5,
    },
    masterImage: {
        height: 250,
        width: deviceWidth - 20,
        resizeMode: 'cover',
        borderRadius: 5,
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
    }
});

export default styles;
