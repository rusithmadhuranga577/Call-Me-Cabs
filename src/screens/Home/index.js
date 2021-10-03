/** @format */

import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages } from '@common';

import Map from './Components/Map';
import LocationSelect from './Components/LocationSelect';

var SharedPreferences = require('react-native-shared-preferences');

const Home =() => {

  const navigation = useNavigation();

  useEffect(() => {

  })

  return(
    <View style={[styles.container]}>
      <Map/>
      
    </View>
  );
}
export default Home;