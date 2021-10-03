import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';
import { Dimensions } from "react-native";//94373164997

const screenwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    hometabtitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 13,
        color : Colors.black,
        marginBottom : 10
    },
    tabBarStyle : {
        height : 60,
        paddingTop : 10
    }
})

export default styles;