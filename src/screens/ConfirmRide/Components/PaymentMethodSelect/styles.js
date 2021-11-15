import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const height = Dimensions.get('screen').height;
const barheight = height/3.5

const styles = StyleSheet.create({
    container : {
        width: '80%', 
        backgroundColor: Colors.white,
        padding : 10,
        borderRadius : 10
    },
    overlay : {
        width : '100%',
        height : '100%',
        backgroundColor : 'rgba(0,0,0,0.5)',
        position : 'absolute',
        zIndex: 99,
        top : 0,
        left : 0,
        right : 0,
        bottom : 0,
        alignItems : 'center',
        justifyContent : 'center'
    },
    containertitle : {
        fontFamily : Constants.bold,
        fontSize : 15,
        alignSelf : 'center'
    },
    donetext : {
        fontFamily : Constants.bold,
        fontSize : 20,
        alignSelf : 'center',
        color : Colors.primary
    },
    donebuttonborder : {
        padding : 0,
        borderRadius : 10,
        borderWidth : 2,
        borderColor : Colors.primary,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 25,
        width : '50%',
        alignSelf : 'center'
    }
})

export default styles;