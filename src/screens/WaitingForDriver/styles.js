import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const height = Dimensions.get('screen').height;
const barheight = height/3.5

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white
    },
    map : {
        width: '100%', 
        height: '100%',
    },
    pulseholder : {
        width : '100%', 
        height : '100%', 
        position : 'absolute', 
        top : 0, 
        bottom : 0, 
        right : 0, 
        left : 0, 
        alignItems : 'center', 
        justifyContent : 'center'
    },
    pleasewaittext : {
        fontSize : 18,
        fontFamily : Constants.bold,
        color : Colors.black,
    },
    pleasewaitcontainer : {
        paddingLeft : 20,
        paddingRight : 20,
        padding : 10,
        backgroundColor : Colors.white,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        position : 'absolute',
        bottom : 50,
        borderRadius : 25,
        elevation : 5
    }
})

export default styles;