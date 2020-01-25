import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    photoSection: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 13,
        backgroundColor: '#fff',
    },
    photoGridStyel: {
        width: (deviceWidth - 50) / 3,
        height: (deviceWidth - 50) / 3,
        borderRadius: 10,
    },
    bigPhotoGrid: {
        width: (deviceWidth - 50) / 1.41,
        height: (deviceWidth - 50) / 1.41,
        borderRadius: 10
    },
    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    markerPlaceImage: {
        height: 60, width: 60,
        borderWidth: 2,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: '#fff',
        backgroundColor: '#1A5276',
    },
    placeCounter: {
        alignItems: 'flex-start',
        width: 60,
        height: 70,
        left: 30,
        position: "absolute",
    },
    counterText: {
        marginLeft: 10,
        fontSize: 12,
        paddingHorizontal: 5,
        backgroundColor: '#3475d3',
        borderRadius: 15,
        color: '#fff',
    }

});

export default styles;
