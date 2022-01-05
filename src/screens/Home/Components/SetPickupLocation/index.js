/** @format */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    AsyncStorage,
    ScrollView,
    Dimensions,
    Text,
    Animated,
    View,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors, Icons, Business } from '@common';
import { Button } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

Geocoder.init(Business.mapsapi);
var SharedPreferences = require('react-native-shared-preferences');
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;

class PickupLocation extends React.Component{

    location = [];

    constructor(props) {
        super(props);
        this.map = React.createRef<MapView>(null);
        this.state = {
            containerheight: new Animated.Value(0),
            backstate : false,
            mapregion : {
                latitude: 7.50015162585,
                longitude: 80.3325495607,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            userlocation : {latitude : 7.50015162585, longitude : 80.3325495607},
            selectedlocation : [],
            recentlocations : [],
            recentlocations_id_array : [],
        };
        this.goback = this.goback.bind(this);
        this.setloactiononmap = this.setloactiononmap.bind(this);
        this.getselectedlocation = this.getselectedlocation.bind(this);
    }

    handleCenter = () => {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.mapregion;
        console.log(this.map)
        // this.map.animateToRegion({
        //   latitude,
        //   longitude,
        //   latitudeDelta,
        //   longitudeDelta
        // })
    }

    componentDidMount(){
        console.log('focused')
        this.getCurrentLocation();
        this.getoldaddress();
    }

    getoldaddress = () => {
        AsyncStorage.getItem('recentlocations', (err, locations) => {
          if (locations == null) {
          } else {
            const valuesArray = JSON.parse(locations);
            this.setState({recentlocations : valuesArray})
            const data = [];
            for (i = 0; i < valuesArray.length; i++) {
                data.push(valuesArray[i].id);
            }
            console.log('data', data)
            this.setState({recentlocations_id_array : data})
          }
        });
    };

    getCurrentLocation(){
        Geolocation.getCurrentPosition(
            (position) => {
                let usercoords = {latitude : position.coords.latitude, longitude : position.coords.longitude};
                let regioncoords = {latitude : position.coords.latitude, longitude : position.coords.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121};
                this.setState({userlocation : usercoords});
                this.setState({userlocation : regioncoords});
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    onRegionChangecomplete(result){
        console.log('result ', result)
        this.location = result;
    }

    setRecentLocationArray(json){
        const id = json.results[0].place_id;
        const address = json.results[0].formatted_address;
        const latitude = json.results[0].geometry.location.lat;
        const longitude = json.results[0].geometry.location.lng;

        const data = this.state.recentlocations_id_array;

        const newdata = [
            {
              id: id,
              address: address,
              latitude: latitude,
              longitude: longitude,
            },
        ];

        console.log(newdata)
      
        if (data.indexOf(id) !== -1) {
        } else {
            AsyncStorage.getItem('recentlocations', (err, result) => {
                if (result !== null) {
                    var l = JSON.parse(result);
                    var newlocation = l.concat(newdata);
                    AsyncStorage.setItem('recentlocations', JSON.stringify(newlocation));
                    console.log('newlocation', newlocation)
                } else {
                    AsyncStorage.setItem('recentlocations', JSON.stringify(newdata));
                    console.log('newdata', newdata)
                }
            });
            this.getselectedlocation(this.location); 
            this.goback(false);
        }
    }

    setRecentLocations=()=>{
        Geocoder.from(this.location.latitude, this.location.longitude)
        .then(json => {
            this.setRecentLocationArray(json);
        })
        .catch(error => console.warn(error));
    }

    goback(state){
        this.props.goback(state);
    }

    getselectedlocation(location){
        this.props.getselectedlocation(location);
    }

    setloactiononmap(state){
        this.props.setloactiononmap(state);
    }

    render(){
        return(
            <View>
            {this.props.setpickuplocationmapvisible ?
                <Animated.View style={[styles.container]}>
                    <TouchableOpacity onPress={()=>this.goback(false)} style={[styles.mapbackbuttoncontainer]}>
                        <Icon name={'arrow-back-outline'} size={25}/>
                    </TouchableOpacity>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={ref => { this.map = ref }}
                            onLayout={() => {
                                this.map.animateCamera({
                                center: {
                                    latitude: this.state.mapregion.latitude,
                                    longitude: this.state.mapregion.longitude,
                                },
                                heading: 20,
                                });
                            }}
                        showsUserLocation={true}
                        style={[styles.mapstyle]}
                        region={this.state.mapregion}
                        onRegionChangeComplete={(result) => this.onRegionChangecomplete(result)} 
                    >
                    </MapView>
                    <Icon name={'pin'} size={50} style={{position : 'absolute', zIndex : 100, marginBottom : 10}}/>
                    <View style={[styles.confirmbutton]}>
                        <Button title={Languages.Confirm} action={()=>this.setRecentLocations()}/>
                    </View>
                    
                </Animated.View>:null}
            </View>
        );
    }
  
}

PickupLocation.propTypes = {
    goback: PropTypes.func,
    setloactiononmap: PropTypes.func,
    getselectedlocation: PropTypes.func
};

export default PickupLocation;