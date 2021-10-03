import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    input: {
        height: 50,
        padding: 10,
        backgroundColor: Colors.gray,
        width : '90%',
        borderTopRightRadius : 8,
        borderBottomRightRadius : 8,
        color : Colors.black,
        alignSelf : 'center'
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
        height : 50,
        width: '10%',
        borderBottomLeftRadius : 8,
        borderTopLeftRadius : 8
    },
    placeholdertitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        marginBottom : 5
    },
    checkboxcontainer : {
        flexDirection : 'row',
        alignItems : 'center',
        alignSelf : 'flex-end'
    },
    checkboxcontainertext: {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal
    }
})

export default styles;