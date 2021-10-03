import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    overlay : {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card : {
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 10,
        width: '70%',
        borderRadius: 15,
        elevation: 10,
    },
    buttoncontainer : {
        marginTop: 25,
        bottom : 0,
        alignSelf : 'center',
        width : '95%'
    },
    msgtitletext : {
        fontSize : 18,
        alignSelf : 'center',
        fontFamily : Constants.fontFamilybold,
        color : Colors.black
    },
    msgtext : {
        fontSize : 15,
        alignSelf : 'center',
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        textAlign : 'center'
    },
    buttontitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    }
})

export default styles;