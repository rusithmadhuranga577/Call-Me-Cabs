/** @format */

import React, { useEffect, useState, useRef  } from 'react';
import { connect } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Animated,
  LogBox
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors, Constants, Icons, Store } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';
import DeviceSettings from 'react-native-device-settings';

var SharedPreferences = require('react-native-shared-preferences');

const LocationSettings =({route}) => {
  const {logged} = route.params;
  const navigation = useNavigation();

  const [selfpickupalert, setselfpickupalert] = useState(false);
  const [locationrequesttimeout, setlocationrequesttimeout] = useState(false);

  const animatein = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestCameraPermission();
    LogBox.ignoreAllLogs();
  })

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use location");
        GetLocation();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const alertin = () => {
    Animated.timing(animatein, {
      toValue: 100,
      duration: 1000
    }).start();
  };

  const alertout = () => {
    Animated.timing(animatein, {
      toValue: 0,
      duration: 1000
    }).start();
  };

  const GetLocation = () => {
    alertout();
    Geolocation.getCurrentPosition(
      position => {
      },
      error => {
        alertin();
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }

  const SelfpickupUser = () => {
    SharedPreferences.setItem('userlocation', "outofdeliveryrange");
    setselfpickupalert(false);
    if(logged == 0){
      navigation.replace('Home');
    }else{
      navigation.goBack();
    }
  }

  const ButtonView = ({icon, title, subtitle, page}) => {
      return(
        <TouchableOpacity  
          style={[styles.button]}
          onPress={()=> 
            page == 'SelectNowLocation' ? navigation.navigate('SelectNowLocation', {logged : logged}) : null
            || page == 'LocationSearch' ? navigation.navigate('LocationSearch', {logged : logged}) : null
            || page == 'selfpickupUser' ? setselfpickupalert(true) : null
          }
        >
          <View style={[styles.description]}>
            <Icon name={icon} size={20}/>
            <View style={{marginLeft : 15}}>
                <Text style={[styles.buttontitle]}>{title}</Text>
                <Text numberOfLines={1} style={[styles.buttonsubtitle]}>{subtitle}</Text>
            </View>
          </View>
          <Icon name={'arrow-right'} size={18}/>
        </TouchableOpacity>
      );
  }

  return(
    <ScrollView style={[styles.container]}>
      <Animated.View style={[styles.topalertcontainer, {height : animatein}]}>
        <View>
          <Text style={[styles.alerttext]}>{Languages.CannotGetYourLocation}</Text>
        </View>
        <View style={[styles.alertbutton]}>
          <Icon name={'redo'} size={20} color={Colors.white} onPress={GetLocation}/>
        </View>
        <View style={[styles.alertbutton, {right : 50}]}>
          <Icon name={'cog'} size={20} color={Colors.white} onPress={()=>DeviceSettings.location()}/>
        </View>
      </Animated.View>
      <View style={[styles.container]}>
          <Text style={[styles.sectiontitle]}>{Languages.DeliveryOption}</Text>
          <ButtonView icon={'search'} title={Languages.SearchLocation} subtitle={Languages.SearchLocationSubLine} page={'LocationSearch'}/>
          <ButtonView icon={'location-arrow'} title={Languages.SelectMyLocationNow} subtitle={Languages.SelectMyLocationNowSubLine} page={'SelectNowLocation'}/>

          <Text style={[styles.sectiontitle]}>{Languages.SelfPickup}</Text>
          <ButtonView icon={'walking'} title={Languages.SelfPickup} subtitle={Languages.SelfPickupSubLine} page={'selfpickupUser'}/>

          <Text style={[styles.sectiontitle]}>{Languages.DineIn}</Text>
          <ButtonView icon={'utensils'} title={Languages.DineIn} subtitle={Languages.DineInSubLine}/>

          <CustomAlert
            displayMode={'alert'}
            displayMsg={Languages.ContinueAsSelfPickup}
            displaymsgtitle={Languages.AreYouSure}
            visibility={selfpickupalert}
            dismissAlert={setselfpickupalert}
            cancellable={false}
            buttons={(
              <>
                <CustomAlertButton buttontitle={Languages.Continue} theme={'alert'} buttonaction={SelfpickupUser}/>
              </>
            )}
          />   

          <CustomAlert
            displayMode={'alert'}
            displayMsg={Languages.ContinueAsSelfPickup}
            displaymsgtitle={Languages.AreYouSure}
            visibility={selfpickupalert}
            dismissAlert={setselfpickupalert}
            cancellable={false}
            buttons={(
              <>
                <CustomAlertButton buttontitle={Languages.Continue} theme={'alert'} buttonaction={SelfpickupUser}/>
              </>
            )}
          />   
      </View>
    </ScrollView>
  );
}
export default LocationSettings;