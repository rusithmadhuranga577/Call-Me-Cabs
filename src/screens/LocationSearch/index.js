import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Dimensions, Image} from "react-native";
import {getDistance, getPreciseDistance} from 'geolib';
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {LocationView, CustomAlert, CustomAlertButton } from '@components';
import {Colors, Store, Url, Languages} from '@common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const QueryString = require('query-string');

var SharedPreferences = require('react-native-shared-preferences');

const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SetLocation = ({route}) =>  {
  
  const {logged} = route.params;
  const isFocused = useIsFocused();
  const [locationdata, setLocation] = useState([]);
  const navigation = useNavigation();
  const [LoginStatus, setLogin] = useState('');
  const [deliveryrange, setdeliveryrange] = useState(Number(1000));
  const [locations, setlocations] = useState([]);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [place_id, setPlaceId] = useState('');
  const [shortName, setShortName] = useState('');
  const [addressval, setAddress] = useState('');

  const [successalert, setsuccessalert] = useState(false);
  const [available, setavailable] = useState(true);

  useEffect(() => {
    SharedPreferences.getItems(['LoginStatus', 'delivery_range'], (result => {
      setLogin(result[0]);
      // setdeliveryrange(result[1]);
    }))
    console.log(Store.merchantlan);

    AsyncStorage.getItem('recentlocations', (err, locations) => {
      if (locations == null) {
        console.log('No places');
      } else {
        const valuesArray = JSON.parse(locations);
        console.log(valuesArray);
        setlocations(valuesArray);
      }
    });
  }, [isFocused])

  const NavigationFunction = () => {
    if(logged == 0){
      navigation.replace('Home');
      SharedPreferences.setItem('logged', 1 + '');
    }else{
      navigation.pop();
    }
  };

  const checkAvailable = LocationData => {
    const address = LocationData.address;
    const shortname = LocationData.short_name;
    const placeId = LocationData.placeId;
    const lat = LocationData.latitude;
    const lan = LocationData.longitude;

    setLat(lat);
    setLong(lan);
    setPlaceId(placeId);
    setShortName(shortname);
    setAddress(address);

    console.log(lat, '|' ,lan, '|' ,placeId, '|' ,address)

      var pdis = getPreciseDistance(
        {
          latitude: lat,
          longitude: lan,
        },
        {latitude: Store.merchantlat, longitude: Store.merchantlan},
      );
      console.log(pdis);
      if (pdis >= deliveryrange) {
        setavailable(false);
      } else {
        setavailable(true);
        deliveryUser(address, shortname, placeId, lat, lan);
      }
  }
  
  const selfpickupUser = () => {
    setavailable(true);
    const addressArray = [{
      location: "outofdeliveryrange",
      id: place_id,
      address: addressval,
      latitude: latitude,
      longitude: longitude
    }]

    const newaddressArray = [{
      location: "outofdeliveryrange",
      id: place_id,
      address: addressval,
      latitude: latitude,
      longitude: longitude,
      shortname: shortName
    }]

    console.log(addressArray)

    SharedPreferences.getItem('login_Id', (uId => {
      const id = uId;
      axios
      .post(
        Url.updateuseraddress,
        QueryString.stringify({
          id: id,
          def_address: addressval,
          latitude: latitude,
          longitude: longitude,
          location_type: "outofdeliveryrange"
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      ).then(response => {
        console.log(response.data.status);
          if (response.data.status == 1) {

            if (data.indexOf(place_id) !== -1) {
              console.log('Value exists!');
            } else {
              AsyncStorage.getItem('recentlocations', (err, result) => {
                if (result !== null) {
                  var l = JSON.parse(result);
                  var newlocation = l.concat(newaddressArray);
                  AsyncStorage.setItem('recentlocations', JSON.stringify(newlocation));
                } else {
                  AsyncStorage.setItem('recentlocations', JSON.stringify(newaddressArray));
                }
              });
            }
            let a = JSON.stringify(addressArray);
            SharedPreferences.setItem('defaultaddress', a);
            SharedPreferences.setItem('latitude', latitude+'');
            SharedPreferences.setItem('longitude', longitude + '');
            SharedPreferences.setItem('userlocation', "outofdeliveryrange");
            setsuccessalert(true);
        } else {
          alert('Location update failed please try again', response.data.status);
        }
      }).catch(err => 
        alert(err))
    }));
  }

  const deliveryUser = (address, shortname, placeId, lat, lan) => {
    setavailable(true);
    const addressArray = [{
      location: "indeliveryrange",
      id: placeId,
      address: address,
      latitude: lat,
      longitude: lan
    }]

    const newaddressArray = [{
      location: "indeliveryrange",
      id: placeId,
      address: address,
      latitude: lat,
      longitude: lan,
      shortname: shortname
    }]

    console.log(addressArray)

    SharedPreferences.getItem('userid', (uId => {
      const id = uId;
      axios
      .post(
        Url.updateuseraddress,
        QueryString.stringify({
          id: id,
          def_address: address,
          latitude: lat,
          longitude: lan,
          location_type: "indeliveryrange"
        }),
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      ).then(response => {
        console.log(response.data.status);
          if (response.data.status == 1) {

            if (data.indexOf(place_id) !== -1) {
              console.log('Value exists!');
            } else {
              AsyncStorage.getItem('recentlocations', (err, result) => {
                if (result !== null) {
                  var l = JSON.parse(result);
                  var newlocation = l.concat(newaddressArray);
                  AsyncStorage.setItem('recentlocations', JSON.stringify(newlocation));
                } else {
                  AsyncStorage.setItem('recentlocations', JSON.stringify(newaddressArray));
                }
              });
            }
            let a = JSON.stringify(addressArray);
            SharedPreferences.setItem('defaultaddress', a);
            SharedPreferences.setItem('latitude', latitude+'');
            SharedPreferences.setItem('longitude', longitude + '');
            SharedPreferences.setItem('userlocation', "indeliveryrange")
            setsuccessalert(true);
        } else {
          alert('Location update failed please try again', response.data.status);
        }
      }).catch(err => 
        alert(err))
    }));
  }

  const data = [];
  for (i = 0; i < locations.length; i++) {
    data.push(locations[i].id);
  }

    return(
      <View style={{flex: 1, height: screenHeight-50,}}>
        <LocationView
          range={deliveryrange}
          apiKey={Store.mapsapi}
          initialLocation={{
            latitude: Number(Store.merchantlat),
            longitude: Number(Store.merchantlan),
          }}
          actionText = {'Confirm'}
          actionButtonStyle= {{width: '95%', height: 50, backgroundColor: Colors.primary, alignSelf: 'center'}}
          onLocationSelect={location=> (checkAvailable(location), console.log("LOCATION DATA",location), setLocation(location))}
        />
        {available ? (null): 
        <TouchableOpacity onPress={selfpickupUser} style={{width: '100%', height: 100, backgroundColor: 'red', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[styles.alerttitle]}>{Languages.OutOfDeliveryArea}</Text>
          <Text style={[styles.alertsubtitle]}>{Languages.SelfPickupSubLine}</Text>
          <TouchableOpacity onPress={()=>setavailable(true)} style={{position : 'absolute', top: 10, right : 10}}>
            <Icon name={'times-circle'} size={25} color={Colors.white}/>
          </TouchableOpacity>
        </TouchableOpacity> } 

        <CustomAlert
          displayMode={'success'}
          displayMsg={Languages.LocationUpdatedSuccessfully}
          displaymsgtitle={Languages.Success}
          visibility={successalert}
          dismissAlert={setsuccessalert}
          cancellable={true}
          buttons={(
            <>
              <CustomAlertButton buttontitle={Languages.Continue} theme={'success'} buttonaction={NavigationFunction}/>
            </>
          )}
        />   
      </View>
    );
  }

  export default SetLocation;