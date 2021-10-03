import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        zIndex : 98,
    },
    map : {
        width: '100%', 
        height: '100%',
    },
    pickuplocationcontainer : {
        width: '95%',
        height : 50,
        backgroundColor : Colors.black
    }
})

export default styles;