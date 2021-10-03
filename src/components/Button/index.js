import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
   GoogleSignin,
   GoogleSigninButton,
   statusCodes,
} from '@react-native-google-signin/google-signin';
import "@react-native-firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images, Languages, Constants } from '@common';
import styles from './styles';

const Button = ({title, action}) => {
    return(
    <TouchableOpacity onPress={action} style={[styles.buttoncontainer]}>
        <Text style={[styles.title]}>{title}</Text>
    </TouchableOpacity>
    );
}
export default Button;