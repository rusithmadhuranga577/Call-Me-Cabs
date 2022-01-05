import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, Dimensions, Image} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Pulse from 'react-native-pulse';
import firestore from '@react-native-firebase/firestore';
import {getDistance, getPreciseDistance} from 'geolib';

import {Business, Icons, Languages, Url, Colors} from '@common';
import Geocoder from 'react-native-geocoding';
import { Button } from '@components';
import styles from "./styles";

const QueryString = require('query-string');
Geocoder.init(Business.mapsapi);
const height = Dimensions.get('screen').height;
const bottom = height/3;
var SharedPreferences = require('react-native-shared-preferences');

class WaitingForDriver extends React.Component {

    constructor(props) {
        super(props);
        this.map = React.createRef();

        this.state = {
            mapregion : {
                latitude : 7.492955,
                longitude : 80.355925,
                latitudeDelta : 0.015, 
                longitudeDelta : 0.0170,
            },
            driverslist : []
        };
    }
    
    componentDidMount(){
        
        this.setState({});

        const {navigation} = this.props;

        console.log(this.props.route.params.cab_type_id)
        axios.post(Url.getridedataurl, 
        QueryString.stringify({
            ride_id : this.props.route.params.ride_id,
        }), 
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
            setTimeout(() => {
                const newregion = {
                    latitude : Number(response.data[0].start_point_lat),
                    longitude : Number(response.data[0].start_point_lan),
                    latitudeDelta : 0.050, 
                    longitudeDelta : 0.0170,
                }
                this.setState({mapregion : newregion});
                this.animateMapCamera(response.data[0]);
            }, 500);
        }).catch(err =>  (console.log(err)))
        this.getCabList();
    }

    componentDidUpdate(){
       
    }

    getCabList = () => {
        firestore()
        .collection('drivers')
        .onSnapshot(documentSnapshot => {
            var array = [];
            documentSnapshot.forEach(documentSnapshot => {
                array.push(documentSnapshot.data());
            });
            setTimeout(() => {
                this.setState({driverslist : array});
            }, 700);
        }) 
    }

    animateMapCamera = (data) => {
        var mapRef = this.map;
        setTimeout(() => {
            if(mapRef.animateCamera){
                mapRef.animateCamera({
                    center: {
                        latitude: Number(data.start_point_lat),
                        longitude: Number(data.start_point_lan),
                    },
                    heading: 0,
                    zoom : 15
                });
            }
        }, 1000);
    }

    getDistance = (lat, lan) => {
        const user_location_lat = this.props.route.params.ride_data.start_point_lat;
        const user_location_lan = this.props.route.params.ride_data.start_point_lan;

        const driver_location_lat = Number(lat);
        const driver_location_lan = Number(lan);
        var dis = getDistance(
            {latitude: user_location_lat, longitude: user_location_lan},
            {latitude: driver_location_lat, longitude: driver_location_lan},
        );
          alert(
            `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
        );
    }

    render(){
        const markerslist = this.state.driverslist;
        const cab_type_id = this.props.route.params.ride_data.cab_type_id;
        return(
            <View>
                <View style={[styles.container]}>
                    <View>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            ref={map => {this.map = map}}
                            style={styles.map}
                            showsUserLocation={true}
                            initialRegion={this.state.mapregion}
                        >  
                        {markerslist && markerslist.map(driver => (
                            <>
                            {cab_type_id == driver.cab_model_id ? 
                            <>
                            <Marker
                                key={driver.driver_id}
                                coordinate={{ latitude: Number(driver.latitude), longitude: Number(driver.longitude) }}
                                title={driver.driver_name}
                            >
                                <View style={{width : 35, height : 40, alignItems : 'center', justifyContent : 'center', transform : [{ rotate: `${driver.heading}deg` }]}}>
                                    <Image
                                        source={{uri : `https://img.cppng.com/download/2020-06/75694-bird's-eye-car-top-view,plan-view-icon_800x800.png`}}
                                        style={{width: '100%', height: '100%'}}
                                    />
                                </View>
                            </Marker >
                            </>:null}
                            </>
                        ))}
                        </MapView>
                        
                    </View>
                </View>
                <View style={[styles.pulseholder]}>
                    {/* <Pulse color={Colors.primary} numPulses={3} diameter={400} speed={20} duration={2000}/> */}
                </View>
                <View style={[styles.pleasewaitcontainer]}>
                    <Text style={[styles.pleasewaittext]}>Waiting For Driver</Text>
                </View>
            </View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <WaitingForDriver {...props} navigation={navigation} />;
} 