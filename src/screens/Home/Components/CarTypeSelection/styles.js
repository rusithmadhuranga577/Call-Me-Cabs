import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const height = Dimensions.get('screen').height;
const barheight = height/3.5

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: barheight,
        backgroundColor: Colors.white,
        paddingTop : 10
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
        alignSelf : 'center'
    }
})

export default styles;