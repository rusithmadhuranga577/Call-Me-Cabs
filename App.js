/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  LogBox,
  useColorScheme,
  View,
} from 'react-native';
import Router from './src/router/Router';

const App = () => {

  useEffect(()=>{
    LogBox.ignoreAllLogs();
  })

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Router/>
    </>
  );
};

export default App;
