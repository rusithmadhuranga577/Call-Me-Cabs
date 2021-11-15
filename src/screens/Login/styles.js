import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    vector : {
        height : 200,
        width : 200,
        position : 'absolute',
        top : 10,
        right : 10
    },
    title : {
        fontFamily : Constants.bold, 
        fontSize : 35,
        width : '95%'
    },
    subtitle : {
        fontFamily : Constants.light, 
        fontSize : 15,
        alignSelf : 'center'
    },
    textinputviewrow : {
        flexDirection : 'row',
        width : '90%',
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center'
    },
    iconholder : {
        width: 50, 
        backgroundColor: Colors.white, 
        height: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        elevation : 8
    },
    input: {
        height: 50,
        padding: 10,
        backgroundColor: Colors.white,
        width : 200,
        borderTopRightRadius : 8,
        borderBottomRightRadius : 8,
        color : Colors.black,
        elevation : 8
    },
    registertext : {
        fontSize : 15,
        fontFamily : Constants.light,
        marginTop : 10
    },
    registerclicktext : {
        fontFamily : Constants.medium,
        fontSize : 15,
        color : Colors.alertyellow
    },
    checkboxcontainer : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 8,
        alignSelf : 'flex-end'
    },
    checkboxcontainertext: {
        fontSize : 12,
        fontFamily : Constants.medium
    },
    vector : {
        width : 250,
        height : 150,
        top : 10,
        alignSelf : 'flex-end',
        position: 'absolute',
        right : -25
    },
    sociallogincontainer : {
        width : '100%',
        padding : 15,
        marginTop : 30
    },
    socialloginicon : {
        width : 30,
        height : 30
    }
})

export default styles;