import React, {useState} from 'react';
import {Modal, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Constants } from '@common';

export default function CustomAlertButton({
  buttontitle,
  buttonaction,
  theme
}) {
  return (
    <View>
        <TouchableOpacity 
            onPress={buttonaction ? buttonaction : console.log('button')} 
            style={theme == '' ? styles.buttoninverse : null || theme == 'error' ? styles.buttonerror : null || theme == 'alert' ? styles.buttonalert : null || theme == 'success' ? styles.buttonsuccess : null || theme == 'info' ? styles.buttoninfo : null || theme == 'inverse' ? styles.buttoninverse : null}
        >
            <Text style={[styles.buttontitle]}>{buttontitle}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonsuccess : {
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.successgreen,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 20,
        marginBottom: 10,  
        padding : 8,
        elevation : 5   
    },
    buttonalert : {
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.alertyellow,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 20,
        marginBottom: 10,  
        padding : 8,
        elevation : 5   
    },
    buttoninverse : {
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 20,
        marginBottom: 10,  
        padding : 8,
        elevation : 5   
    },
    buttonerror : {
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.alertred,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 20,
        marginBottom: 10,  
        padding : 8,
        elevation : 5
    },
    buttoninfo : {
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.infoblue,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderRadius: 20,
        marginBottom: 10,  
        padding : 8,
        elevation : 5   
    },
    buttontitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    }
});