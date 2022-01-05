import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container : {
        height : screenheight,
        width : screenwidth,
        alignItems : 'center',
        justifyContent : 'center'
    },
    mapbackbuttoncontainer : {
        width : 40,
        height : 40,
        borderRadius : 100,
        backgroundColor : Colors.white,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        top : 10,
        left : 10,
        zIndex : 99
    },
    mapstyle : {
        height : screenheight,
        width : screenwidth
    },
    confirmbutton : {
        width : screenwidth-30,
        height : 40,
        borderRadius : 100,
        backgroundColor : Colors.white,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom : 25,
        zIndex : 99
    },
})

export default styles;