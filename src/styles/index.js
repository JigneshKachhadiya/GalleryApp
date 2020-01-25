import { StyleSheet, Platform } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Colors from './colors';
import Fonts from './fonts';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ifIphoneX: {
    ...ifIphoneX({
      paddingTop: 50
    }, {
        paddingTop: Platform.OS === 'ios' ? 20 : 0
      })
  },
  jsContent: {
    justifyContent: 'center',
  },
  jsCenter: {
    justifyContent: 'center',
  },
  jsSpaceBT:{
    justifyContent:'space-between'
  },
  alItems: {
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row'
  },
  paddingH20: {
    paddingHorizontal: 20
  },
  paddingH10: {
    paddingHorizontal: 10
  },
  paddingV10: {
    paddingVertical: 10
  },
  paddingR10: {
    paddingHorizontal: 10
  },
  marginH10: {
    marginHorizontal: 10
  },
  marginH20: {
    marginHorizontal: 20
  },
  marginV20: {
    marginVertical: 20
  },
  marginT5: {
    marginTop: 5
  },
  marginT20: {
    marginTop: 20
  },
  marginT10: {
    marginTop: 10
  },
  paddingT10: {
    paddingTop: 10
  },
  marginB70: {
    marginBottom: 70
  },
  paddingB50: {
    paddingBottom: 50
  },
  padding10: {
    padding: 10
  }
});

export default commonStyles;
