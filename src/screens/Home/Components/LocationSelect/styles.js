import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    pickuplocationcontainer : {
        width: '95%',
        height : 50,
        backgroundColor : Colors.white,
        alignSelf : 'center',
        elevation : 5,
        borderTopRightRadius : 20,
        borderTopLeftRadius : 20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 10
    },
    droplocationcontainer : {
        width: '95%',
        height : 50,
        backgroundColor : Colors.white,
        alignSelf : 'center',
        elevation : 5,
        borderBottomRightRadius : 20,
        borderBottomLeftRadius : 20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 10
    },
    dot : {
        width : 8,
        height : 8,
        borderRadius : 10,
        marginRight : 15
    },
    placeholdertext : {
        fontFamily : Constants.light
    }
})

export default styles;