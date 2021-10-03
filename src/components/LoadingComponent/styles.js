import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    overlay : {
        width: '100%',
        height : '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
    },
    lottie: {
        width: 100,
        height: 100
    }
})

export default styles;