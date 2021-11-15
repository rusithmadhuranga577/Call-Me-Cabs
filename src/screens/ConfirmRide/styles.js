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
    carcontainer : {
        height : 120,
        width : 110,
        backgroundColor : Colors.white,
        marginLeft : 10,
        marginRight : 10,
        borderRadius : 15,
        borderColor : Colors.black,
        borderWidth : 1,
        elevation : 5
    },
    image : {
        width : '100%',
        height : '100%',
    },
    imagecontainer : {
        width : 90,
        height : 50,
        alignSelf : 'center'
    },
    cartypetext : {
        fontFamily : Constants.medium,
        fontSize : 13,
        color : Colors.black,
        alignSelf : 'center'
    },
    maxpersonsinfocontainer : {
        flexDirection : 'row',
        justifyContent : 'center',
    },
    maxpersonstext : {
        fontFamily : Constants.light,
        fontSize : 12,
        color : Colors.black,
        marginLeft : 5
    },
    chargeforkmtext : {
        fontFamily : Constants.medium,
        fontSize : 12,
        color : Colors.black,
        marginLeft : 5,
        alignSelf : 'center'
    },
    buttonholder : {
        margin : 20,
        width : '95%',
        marginTop : 15,
        alignSelf : 'center',
        position : 'absolute',
        bottom : -5
    },
    bottomcontainer : {
        width : '100%',
        height : '30%',
        backgroundColor : Colors.white,
        position : 'absolute',
        bottom : 0,
    },
    paymentoptionholder : {
        width : '100%',
        flexDirection : 'row',
        height : '20%',
        backgroundColor : '#000',
        borderTopRightRadius : 15,
        borderTopLeftRadius : 15,
        justifyContent : 'space-between',
        elevation : 8
    },
    paymentmethodrow : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    paymenticonholder : {
        width : 40,
        height : 20,
        resizeMode : 'contain'
    },
    paymentmethodtext : {
        fontFamily : Constants.medium,
        fontSize : 12,
        marginTop : 4
    },
    rideoptionbuttonrow : {
        flexDirection : 'row', 
        alignItems : 'center', 
        width : '50%', 
        padding : 5, 
        justifyContent : 'center', 
        backgroundColor : Colors.white,
        borderBottomWidth : 1,
        borderBottomColor : Colors.gray
    },
    cabicon : {
        width : 53,
        height : 38,
        resizeMode : 'contain',
    },
    cabdetailsrow : {
        padding : 10,
        alignItems : 'center',
        alignSelf : 'flex-start',
        borderRightWidth : 0.5,
        width: '50%',
    },
    pricetext : {
        fontSize : 25,
        fontFamily : Constants.bold
    },
    distancetext : {
        fontSize : 15,
        fontFamily : Constants.medium
    },
    chargedetailsrow : {
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        borderRightWidth : 0.5,
        width: '50%',
        borderColor : Colors.pagebggray
    }
})

export default styles;