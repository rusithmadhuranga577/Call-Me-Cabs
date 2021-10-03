import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container : {
        height: screenHeight-30,
        flexDirection: 'column',
        zIndex: 1,
    },
    ButtonStyle: {
        width: '100%',
        marginTop: 10,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.white,
        height: 50,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#000',
        color: Colors.white,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        zIndex: 4,
    },
    centermarker : {
        position: 'absolute', 
        top: (screenHeight/2.5), 
        zIndex: 2, 
        alignSelf: 'center'
    },
    topcard : {
        position: 'absolute',
        top: 0,
        width: windowWidth,
        zIndex: 3,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: Colors.white,
        paddingTop: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        paddingBottom : 10
    },
    selfpickupcontainer : {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(101, 124, 134, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 5
    },
    textinput : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold,
        height : 55,
        backgroundColor : Colors.gray
    },
    fetchingbartitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 18
    },
    fetchingbarsubtitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal
    },
    inputcontainer : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center' 
    },
    iconholder : {
        backgroundColor: Colors.gray,
        alignItems : 'center',
        justifyContent : 'center',
        height : 40,
        width: '10%',
        borderBottomLeftRadius : 8,
        borderTopLeftRadius : 8
    },
    input: {
        height: 40,
        padding: 10,
        backgroundColor: Colors.gray,
        width : '90%',
        borderTopRightRadius : 8,
        borderBottomRightRadius : 8,
        color : Colors.black,
        alignSelf : 'center'
    },
    placeholdertitle : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        marginBottom : 5
    },
});

export default styles;