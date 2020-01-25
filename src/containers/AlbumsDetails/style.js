import { StyleSheet, Dimensions } from 'react-native';

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
        width: (deviceWidth - 50) / 1.41,
        height: (deviceWidth - 50) / 1.41,
        borderRadius: 10
    },
    
});

export default styles;
