import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.backgroundgray,
    },
    addressbar : {
        width: '100%', 
        height : 60,
        backgroundColor : Colors.white,
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 8,
        paddingTop : 3,
    },
    addressbartitle : {
        fontSize : 13,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'center'
    },
    addresstext : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold,
        marginTop : 5,
        alignSelf : 'center'
    },
    namebar : {
        width: '100%', 
        height : 70,
        padding : 10,
        marginTop : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingBottom : 15
    },
    nametitle : {
        fontSize : 30,
        fontFamily : Constants.fontFamilybold,
    },
    namesubtitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
    },
    categoryimagecontainer : {
        width : 70,
        height : 70,
        backgroundColor : '#aaaa',
        borderRadius : 100,
        alignSelf : 'center'
    },
    categoryitemcontainer : {
        justifyContent: 'flex-end',
        borderRadius: 2,
        height: 100,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    gridcontainer : {
        width : '100%',
        marginTop : 15,
        alignItems : 'center',
        flex: 1,
        backgroundColor : '#aaa'
    },
    titlebar : {
        width : '100%',
        height : 50,
        backgroundColor : Colors.primary,
        marginTop : 10,
        marginBottom : 10,
        alignItems : 'center',
        padding : 10,
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    titlebartext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 18
    },
    categorytitle : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 15,
        alignSelf : 'center'
    },
    gridView: {
        marginTop: 5,
        flex: 1,
    },
    latestoffertext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 18,
        marginLeft : 10
    },
    bestdealstext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 12,
        marginLeft : 10
    }
})

export default styles;