import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.pagebggray,
        position : 'absolute',
        zIndex : 99,
    },
    pagetitle : {
        fontFamily : Constants.light,
        fontSize : 25,
        color : Colors.secondary,
        marginTop : 10,
        margin : 10
    },
    setlocationbutton : {
        width : '100%',
        height : 60,
        backgroundColor : Colors.white,
        flexDirection : 'row',
        alignItems : 'center',
        padding : 10,
    },
    pinmarkerholder : {
        width : 40,
        height : 40,
        borderRadius : 100,
        backgroundColor : Colors.gray,
        alignItems : 'center',
        justifyContent : 'center',
    },
    buttontitle : {
        fontFamily : Constants.medium,
        fontSize : 15,
        color : Colors.black,
        marginLeft : 15
    },
    topcard : {
        width : '100%', 
        backgroundColor : Colors.white, 
        elevation : 5
    },
    recentsearchcard : {
        width : '100%', 
        backgroundColor : Colors.white, 
        marginTop : 15,
        padding : 10
    },
    recentsearchtext : {
        fontFamily : Constants.light,
        fontSize : 15,
        color : Colors.black,
    }
})

export default styles;