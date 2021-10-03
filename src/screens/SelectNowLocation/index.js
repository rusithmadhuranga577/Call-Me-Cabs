import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ProgressBarAndroid,
  TextInput
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {getDistance, getPreciseDistance} from 'geolib';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Constants, Url, Store, Languages, Images } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import styles from './styles';

Geocoder.init(Store.mapsapi);
const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const QueryString = require('query-string');
var SharedPreferences = require('react-native-shared-preferences');

const SelectNowLocation = ({route}) => {
  const {logged} = route.params;
  const navigation = useNavigation();
  const _map = useRef(null);
  const [clatitude, setcLat] = useState(0);
  const [clongitude, setcLong] = useState(0);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [userId, setId] = useState(0);
  const [coordinates, setCore] = useState([]);
  const [erroralert, seterroralert] = useState(false);
  const [apartmentnumber, setapartment] = useState('');
  const [street, setstreet] = useState('');
  const [placeId, setplaceId] = useState('');
  const [shortName, setShortName] = useState('');
  const [symbol, setsymbol] = useState('');
  const [available, setavailable] = useState(false);
  const [snacbarshow, setsnacbarshow] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [locations, setlocations] = useState([]);
  const [deliveryrange, setdeliveryrange] = useState(Number(0));
  const [locationtype, setlocationtype] = useState('');
  const [loading, setloading] = useState(false);
  const [successalert, setsuccessalert] = useState(false);

  useEffect(() => {
    var d_range = 0;
    SharedPreferences.getItems(
      ['address','LoginStatus','latitude','longitude','userid','deliveryrange',],function (data) {
        console.log(data[5]);
        setcLat(data[2]);
        setcLong(data[3]);
        setId(data[4]);
        d_range = 5000;
        setdeliveryrange(d_range);
        getCUrruntLocation(d_range);
      },
    );
    getoldaddress();
  }, []);

  const NavigationFunction = () => {
    if(logged == 0){
      navigation.replace('Home');
      SharedPreferences.setItem('logged', 1 + '');
    }else{
      navigation.pop();
    }
  };


  const getoldaddress = () => {
    AsyncStorage.getItem('recentlocations', (err, locations) => {
      if (locations == null) {
        console.log('No places');
      } else {
        const valuesArray = JSON.parse(locations);
        console.log(valuesArray);
        setlocations(valuesArray);
      }
    });

    console.log('Data ----------', data);
  };

  var updateaddress = (address) => {
    console.log(logged);
    setloading(true);
    axios
      .post(
        Url.updateuseraddress,
        QueryString.stringify({
          id: 105,
          def_address: address,
          latitude: latitude,
          longitude: longitude,
          location_type: locationtype
        }),

        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        },
      )
      .then(response => {
        setloading(false);
        console.log(response.data.status);
        if (response.data.status == 1) {
          SharedPreferences.setItem('address', apartmentnumber + `${symbol}` + street + '');
          SharedPreferences.setItem('latitude', latitude+'');
          SharedPreferences.setItem('longitude', longitude + '');
          setsnacbarshow(false);
          setsuccessalert(true);
        } else {
          setsnacbarshow(false);
          Alert.alert('Location update failed, please try again');
        }
      }).catch(err => 
        (setsnacbarshow(false),
        alert(err)))
  };

  const confirm = () => {
    SharedPreferences.setItem('userlocation', 'indeliveryrange');
    setsnacbarshow(true);
    if (available == true) {
      let address = apartmentnumber + street;
      if (address == '') {
        console.log('No address');
        seterroralert(true);
      } else {
        if (apartmentnumber == '') {
          setsymbol(',');
        }
        setsnacbarshow(true);
        createplace(address, 'indeliveryrange');
        updateaddress(apartmentnumber + `${symbol}` + street + '');
      }
    } else {
      null;
    }
  };

  const confirmasselfpickup = () => {
    let address = apartmentnumber + street;
    const newdata = {
      id: placeId,
      name: 'selfpickup',
      address: address,
      latitude: latitude,
      longitude: longitude,
    };
    setsnacbarshow(true);
    SharedPreferences.setItem('userlocation', 'outofdeliveryrange');
    if (available == false) {
      let address = apartmentnumber + street;
      if (address == '') {
        console.log('No address');
        seterroralert(true);
      } else {
        if (apartmentnumber == '') {
          setsymbol(',');
        }
        setsnacbarshow(true);
        SharedPreferences.setItem('defaultaddress', JSON.stringify(newdata));
        createplace(
          apartmentnumber + `${symbol}` + street + '',
          'outofdeliveryrange',
        );
        updateaddress(apartmentnumber + `${symbol}` + street + '');
      }
    } else {
      null;
    }
  };

  const createplace = (address, location) => {
    const defaultaddress = [
      {
        location: location,
        id: placeId,
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    ];

    const newdata = [
      {
        location: location,
        id: placeId,
        address: address,
        latitude: latitude,
        longitude: longitude,
        shortname: shortName,
      },
    ];

    console.log('Create Place', defaultaddress);

    if (data.indexOf(placeId) !== -1) {
      console.log('Value exists!');
    } else {
      AsyncStorage.getItem('recentlocations', (err, result) => {
        if (result !== null) {
          var l = JSON.parse(result);
          var newlocation = l.concat(newdata);
          AsyncStorage.setItem('recentlocations', JSON.stringify(newlocation));
        } else {
          AsyncStorage.setItem('recentlocations', JSON.stringify(newdata));
        }
      });

      let a = JSON.stringify(defaultaddress);
      console.log(defaultaddress);
      SharedPreferences.setItem('defaultaddress', a);
    }
  };

  const getCUrruntLocation = (d_range) => {
    setfetching(true);
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setCore(
          coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );

        var pdis = getPreciseDistance(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          {latitude: 7.482082, longitude: 80.368089},
        );
        console.log('deliveryranges', d_range)
        if (pdis >= d_range) {
          console.log('outofdeliveryrange', d_range)
          setlocationtype('outofdeliveryrange');
          setavailable(false);
        } else {
          setlocationtype('indeliveryrange');
          setavailable(true);
        }

        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            console.log(
              'Geo Coding = ',
              json.results[0].address_components[0].short_name,
            );
            setShortName(json.results[0].address_components[0].short_name);
            setplaceId(json.results[0].place_id);
            setstreet(addressComponent);
            setfetching(false);
          })
          .catch(error => console.warn(error));
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  const data = [];
  for (i = 0; i < locations.length; i++) {
    data.push(locations[i].id);
  }

  const onRegionChange = (region) => {
    var latitudedata = 0;
    var longitudedata = 0;

    if(region.latitude.toFixed(6) === latitudedata.toFixed(6)
      && region.longitude.toFixed(6) === longitudedata.toFixed(6)){
        return;
    }

    setLat(region.latitude);
    setLong(region.longitude);
    console.log(region.latitude , '|' , region.longitude)

    var pdis = getPreciseDistance(
      {
        latitude: region.latitude,
        longitude: region.longitude,
      },
      {
        latitude: Store.merchantlat, 
        longitude: Store.merchantlan
      },
    );

    if (pdis >= deliveryrange) {
      setlocationtype('outofdeliveryrange');
      setavailable(false);
      console.log('Unavailable', pdis, Store.merchantlat, region.longitude,);
    } else {
      setlocationtype('indeliveryrange');
      console.log('Available', pdis);
      setavailable(true);
    }

    Geocoder.from(
      region.latitude,
      region.longitude,
    )
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setShortName(json.results[0].address_components[0].short_name);
        setplaceId(json.results[0].place_id);
        setstreet(addressComponent);
      })
      .catch(error => console.warn(error));
  }

  return (
    <View>
      <LoadingComponent visibility={loading}/>
      <ScrollView style={{height: screenHeight-30}}>
        {snacbarshow ? <View style={styles.overlay} />: (null)}
        {fetching ? <View style={styles.overlay} />: (null)}
        <View
          style={[styles.topcard]}>
          {available ? 
            <View>
              <View style={{marginBottom: 5}}>
                <Text style={[styles.placeholdertitle]}>{Languages.ApartmentNumber}</Text>
                  <View style={[styles.inputcontainer]}>
                  <View style={[styles.iconholder]}>
                    <Icon name={'home'} size={20}/>
                  </View>
                  <TextInput 
                      value={apartmentnumber}
                      onChangeText={input => setapartment(input)}
                      style={[styles.input]}
                      placeholderTextColor={'rgba(0,0,0,0.4)'}
                />
              </View>
            </View>

            <View style={{marginBottom: 10}}>
                <Text style={[styles.placeholdertitle]}>{Languages.StreetCity}</Text>
                  <View style={[styles.inputcontainer]}>
                  <View style={[styles.iconholder]}>
                    <Icon name={'road'} size={20}/>
                  </View>
                  <TextInput 
                    value={street}
                    onChangeText={input => setstreet(input)}
                    style={[styles.input]}
                    placeholderTextColor={'rgba(0,0,0,0.4)'}
                  />
              </View>
            </View>
            <Button title={'Confirm'} action={available ? confirm : null}/> 
        </View>
          : (
            <TouchableOpacity
              onPress={confirmasselfpickup}
              activeOpacity={0.5}
              style={[styles.selfpickupcontainer]}>
              <Text>
                {Languages.ServiceNotAvailableHere}
              </Text>
              <Text>
                ({Languages.ContinueAsSelfPickupUser})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.container]}>
            <View style={[styles.centermarker]}>
              <Image
                  source={Images.UserLocationMarker}
                  style={{width: 40, height: 40}}
                />
            </View>

          <MapView
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            style={{height: screenHeight-50, zIndex: 1, bottom: 0}}
            ref={_map}
            onRegionChangeComplete={(result) => onRegionChange(result)} 
            showsUserLocation={true}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.012,
              longitudeDelta: 0.008,
            }}>
            <MapView.Circle
              center={{
                latitude: Store.merchantlat,
                longitude: Store.merchantlan,
              }}
              radius={deliveryrange}
              strokeWidth={2}
              strokeColor="rgba(0, 0, 0, 0.15)"
              fillColor="rgba(0, 0, 0, 0.10)"
            />
            <Marker
                coordinate={{
                    latitude: Store.merchantlat,
                    longitude: Store.merchantlan,
                  }}
                title={'marker.title'}
                />
          </MapView>
        </View>

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

        <CustomAlert
          displayMode={'error'}
          displayMsg={Languages.LocationUpdatedSuccessfully}
          displaymsgtitle={Languages.Success}
          visibility={erroralert}
          dismissAlert={seterroralert}
          cancellable={true}
          buttons={(
            <>
              <CustomAlertButton buttontitle={Languages.Continue} theme={'error'} buttonaction={()=>seterroralert(false)}/>
            </>
          )}
        />

        {/* <SCLAlert
          theme="danger"
          show={show}
          title="Please Enter Adderess"
          subtitle="Address is requrired for ordering and other functions in this app"
          titleStyle={styles.titleStyle}
          onRequestClose={handleClose}
          subtitleStyle={styles.subtitleStyle}>
          <SCLAlertButton theme="danger" onPress={handleClose}>
            Ok
          </SCLAlertButton>
        </SCLAlert> */}

        {fetching ?
          <View
            style={{
              width: windowWidth,
              height: 100,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 20,
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 4,
            }}>
            <View style={{width: '100%', position: 'absolute', top: -5}}>
              <ProgressBarAndroid styleAttr="Horizontal" color={Colors.black} />
            </View>
            <View style={{position: 'absolute', bottom: 20, paddingLeft: 10}}>
              <Text style={[styles.fetchingbartitle]}>{Languages.PleaseWait}...</Text>
              <Text style={[styles.fetchingbarsubtitle, {marginTop: 5}]}>{Languages.FetchingYourLocation}</Text>
            </View>
          </View>
        : null}
      </ScrollView>
    </View>
  );
};

export default SelectNowLocation;
