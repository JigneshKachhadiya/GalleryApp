import React, { PureComponent } from "react";
import { TouchableOpacity, Image, View, Text, StatusBar } from "react-native";
import Colors from "../../styles/colors";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import commonStyles from "../../styles";
import Images from "../../styles/images";
import styles from "./styles";

class Menu extends PureComponent {
    static navigationOptions = {
        tabBarVisible: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            isOnDefaultToggleSwitch: true,
            isSwitch1On: false,
        }
    }

    isNavigate(routerName) {
        this.props.navigation.navigate(routerName);
        this.props.closeModal(false);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Sid Menu</Text>
            </View>
        )
    }
}

export default (Menu);
