/** @format */

import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Animated,
  PermissionsAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images } from '@common';

var SharedPreferences = require('react-native-shared-preferences');
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const Splash =() => {
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
    SharedPreferences.getItem('logged', (logged) => {
      console.log(logged)
      if(logged == 1){
        setTimeout(() => {           
          navigation.replace('Home');
        }, 3000);
      }else{
        setTimeout(() => {           
          navigation.replace('Login');
        }, 3000);
      }
    })
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return(
    <View style={[styles.container]}>
      <Image source={Images.Logo} style={[styles.logoimage]}></Image>
      <Image source={Images.SplashBottom} style={[styles.image]}></Image>
    </View>
  );
}
export default Splash;