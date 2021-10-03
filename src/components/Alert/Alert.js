import React, {useState} from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Colors, Constants } from '@common';

export default function CustomAlert({
  displayMode,
  displayMsg,
  displaymsgtitle,
  visibility,
  dismissAlert,
  cancellable,
  buttons,
}) {
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>cancellable ? dismissAlert(false) : null}
          style={[styles.overlay]}>
            {displayMode == 'success' ? (
              <View style={[styles.card, {backgroundColor: Colors.white}]}>
                <Text style={[styles.msgtitletext, {color: Colors.black}]}>{displaymsgtitle}</Text>
                <Ionicons name={'checkmark-circle'} size={90} color={Colors.successgreen}/>
                <Text style={[styles.msgtext, {color: Colors.black}]}>{displayMsg}</Text>
                <View style={styles.buttoncontainer}>{buttons}</View>
              </View>
            ):null}

            {displayMode == 'alert' ? (
              <View style={[styles.card, {backgroundColor: Colors.white}]}>
                <Text style={[styles.msgtitletext]}>{displaymsgtitle}</Text>
                <Ionicons name={'alert-circle'} size={90} color={Colors.alertyellow}/>
                <Text style={[styles.msgtext]}>{displayMsg}</Text>
                <View style={styles.buttoncontainer}>{buttons}</View>
              </View>
            ):null}

            {displayMode == 'error' ? (
              <View style={[styles.card, {backgroundColor: Colors.alertlightred}]}>
                <Text style={[styles.msgtitletext, {color: Colors.white}]}>{displaymsgtitle}</Text>
                <Ionicons name={'warning-outline'} size={90} color={Colors.white}/>
                <Text style={[styles.msgtext, {color: Colors.white}]}>{displayMsg}</Text>
                <View style={styles.buttoncontainer}>{buttons}</View>
              </View>
            ):null}

            {displayMode == 'info' ? (
              <View style={[styles.card, {backgroundColor: Colors.alertlightblue}]}>
                <Text style={[styles.msgtitletext, {color: Colors.black}]}>{displaymsgtitle}</Text>
                <Ionicons name={'information-circle-outline'} size={90} color={Colors.black}/>
                <Text style={[styles.msgtext, {color: Colors.black}]}>{displayMsg}</Text>
                <View style={styles.buttoncontainer}>{buttons}</View>
              </View>
            ):null}

          </TouchableOpacity>
      </Modal>
    </View>
  );
}