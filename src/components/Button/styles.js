import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    buttoncontainer : {
        width: '100%', 
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius : 100,
        elevation : 8,
        alignItems : 'center',
        justifyContent : 'center'
    },
    title : {
        fontFamily : Constants.bold,
        fontSize : 20,
        color : Colors.white
    }
})

export default styles;