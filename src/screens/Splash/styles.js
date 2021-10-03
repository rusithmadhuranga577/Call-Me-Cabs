import { StyleSheet } from "react-native"
import { Colors } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.primary,
    },
    image : {
        alignSelf: 'center',
        height : '50%',
        width : '95%',
        position : 'absolute',
        bottom : 0
    },
    logo : {
        width : 'auto',
        height : '100%'
    },
    imagecontainer : {
        width : '60%',
        height : 150
    },
    logoimage : {
        width : 250,
        height : 250,
        position : 'absolute',
        top : 20,
        alignSelf : 'center',
        zIndex : 1
    },
    halfround : {
        height: '55%',
        width: '150%',
        backgroundColor: Colors.white,
        elevation: 10,
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        borderColor: Colors.primary,
        borderWidth: 12,
        alignSelf: 'center',
        position: 'absolute',
        top: -30,
        alignItems : 'center',
        justifyContent : 'center',
    },
})

export default styles;