import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import {Business, Icons} from '@common';
import Geocoder from 'react-native-geocoding';
import styles from "./styles";
import LocationSelect from '../LocationSelect/index';
import PickupLocation from '../PickupLocation';
import DropLocation from '../DropLocation';
import SetPickupLocationOnMap from '../SetPickupLocation';
import SetDropLocationOnMap from '../SetDropLocation';
import CarTypeSelection from '../CarTypeSelection';

Geocoder.init(Business.mapsapi);
const height = Dimensions.get('screen').height;
const bottom = height/3

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.map = React.createRef();

        this.state = {
            setpickuplocationmapvisible : false,
            pikuplocationcontainerstate : false,

            setdroplocationmapvisible : false,
            droplocationcontainerstate : false,

            mapregion : {
                latitude: 7.50015162585,
                longitude: 80.3325495607,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            userlocation : {latitude : 7.50015162585, longitude : 80.3325495607},
            pickuplocation : [],
            pickuplocationaddress : '',

            droplocation : [],
            droplocationaddress : '',
        };
    }

    componentDidUpdate(){
        let pickuplocation = this.state.pickuplocation;
        let droplocation = this.state.droplocation;
        if(pickuplocation != '' && droplocation != ''){
            setTimeout(() => {
                this.map.fitToSuppliedMarkers(['mk1','mk2'],{ edgePadding:{top: 5, right: 5, bottom: 80, left: 5}})
            }, 1000);
        }
    }

    componentDidMount(){
        this.getCurrentLocation();
        setTimeout(() => {
            this.map.fitToSuppliedMarkers(['mk1','mk2'],{ edgePadding:{top: 10, right: 10, bottom: 10, left: 10}})
        }, 1000);
    }

    setpickuplocation(location){
        Geocoder.from(location.latitude, location.longitude)
        .then(json => {
            var addressComponent = json.results[0].formatted_address;
            this.setState({pickuplocationaddress : addressComponent});
            this.setState({pickuplocation : location});
        })
        .catch(error => console.warn(error));
    }

    setdroplocation(location){
        this.setState({droplocation : location});
        Geocoder.from(location.latitude, location.longitude)
        .then(json => {
            var addressComponent = json.results[0].formatted_address;
            this.setState({droplocationaddress : addressComponent});
        })
        .catch(error => console.warn(error));
    }

    getCurrentLocation(){
        Geolocation.getCurrentPosition(
            (position) => {
                let usercoords = {latitude : position.coords.latitude, longitude : position.coords.longitude};
                let regioncoords = {latitude : position.coords.latitude, longitude : position.coords.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121};
                this.setState({userlocation : usercoords});
                this.setState({userlocation : regioncoords});
                console.log(regioncoords)
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }


    render(){
        let pickupaddress = this.state.pickuplocationaddress;
        let dropaddress = this.state.droplocationaddress;

        let pickuplocation = this.state.pickuplocation;
        let droplocation = this.state.droplocation;
        return(
            <View>
                <PickupLocation 
                    pickupvisible={this.state.pikuplocationcontainerstate} 
                    goback={(state)=>this.setState({pikuplocationcontainerstate : state})}
                    setpickuploactiononmap={(state)=>this.setState({setpickuplocationmapvisible : state})}
                />
                <SetPickupLocationOnMap
                    setpickuplocationmapvisible={this.state.setpickuplocationmapvisible} 
                    goback={(state)=>this.setState({setpickuplocationmapvisible : state})}
                    getselectedlocation={(location)=>this.setpickuplocation(location)}
                />

                <DropLocation 
                    pickupvisible={this.state.droplocationcontainerstate} 
                    goback={(state)=>this.setState({droplocationcontainerstate : state})}
                    setloactiononmap={(state)=>this.setState({setdroplocationmapvisible : state})}
                />
                <SetDropLocationOnMap
                    setdroplocationmapvisible={this.state.setdroplocationmapvisible} 
                    goback={(state)=>this.setState({setdroplocationmapvisible : state})}
                    getselectedlocation={(location)=>this.setdroplocation(location)}
                />
                <View style={[styles.container]}>
                    <View>
                        <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={map => {this.map = map}}
                        style={styles.map}
                        showsUserLocation={true}
                        region={this.state.mapregion}
                        >
                            {pickuplocation != '' && droplocation != '' ?
                            
                            <MapView.Marker
                                key={1}
                                coordinate={{latitude : this.state.pickuplocation.latitude, longitude : this.state.pickuplocation.longitude}}
                                image={Icons.PickupLocationIcon}
                                identifier={'mk1'}
                            />:null}
                            {pickuplocation != '' && droplocation != '' ?
                            <MapView.Marker
                                key={1}
                                coordinate={{latitude : this.state.droplocation.latitude, longitude : this.state.droplocation.longitude}}
                                image={Icons.DropLocationIcon}
                                identifier={'mk2'}
                            />:null}
                            {pickuplocation != '' && droplocation != '' ?
                            <MapViewDirections
                                origin={{latitude : this.state.pickuplocation.latitude, longitude : this.state.pickuplocation.longitude}}
                                destination={{latitude : this.state.droplocation.latitude, longitude : this.state.droplocation.longitude}}
                                apikey={Business.mapsapi}
                                strokeWidth={3}
                                strokeColor="#000"
                            />:null}
                        </MapView>
                    </View>
                    {pickuplocation != '' && droplocation != '' ? 
                    <View style={{position : 'absolute', bottom : 0, zIndex : 99, width : '100%'}}>
                        <CarTypeSelection state={this.state} getSelectedCar={(data)=>setCarType(data)}/>
                    </View> : null}
                    <View style={[pickuplocation != '' && droplocation != '' ? styles.locationfetchcompleted : styles.locationfetchincompleted]}>
                        <LocationSelect 
                            pickupaddress={pickupaddress}
                            dropaddress={dropaddress} 
                            getpickuplocationbuttonstate={(state)=>this.setState({pikuplocationcontainerstate : state})}
                            getdroplocationbuttonstate={(state)=>this.setState({droplocationcontainerstate : state})}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
export default Map