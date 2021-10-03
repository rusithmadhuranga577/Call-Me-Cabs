import React, {useEffect, useState} from "react";
import {View, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {Business, Icons} from '@common';
import styles from "./styles";
import LocationSelect from '../LocationSelect/index';
import PickupLocation from '../PickupLocation';
import SetLocationOnMap from '../SetLocation';

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            setlocationmapvisible : false,
            piskuplocationcontainerstate : false,
            mapregion : {
                latitude: 7.50015162585,
                longitude: 80.3325495607,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            userlocation : {latitude : 7.50015162585, longitude : 80.3325495607}
        };
    }

    componentDidUpdate(){
        // if(this.state.setlocationmapvisible !== this.props.setlocationmapvisible){
        //     console.log('open location select map');
        // }
    }

    componentDidMount(){
        this.getCurrentLocation();
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
        return(
            <View>
                <PickupLocation 
                    pickupvisible={this.state.piskuplocationcontainerstate} 
                    goback={(state)=>this.setState({piskuplocationcontainerstate : state})}
                    setloactiononmap={(state)=>this.setState({setlocationmapvisible : state})}
                />
                <SetLocationOnMap
                    setlocationmapvisible={this.state.setlocationmapvisible} 
                    goback={(state)=>this.setState({setlocationmapvisible : state})}
                />
                <View style={[styles.container]}>
                    <View>
                        <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={this.state.mapregion}
                        >
                            <MapView.Marker
                                key={1}
                                coordinate={{latitude : this.state.userlocation.latitude, longitude : this.state.userlocation.longitude}}
                                image={Icons.UserMapIcon}
                            />
                        </MapView>
                    </View>
                    <View style={{position : 'absolute', bottom : 50, zIndex : 99, width : '100%', backgroundColor: 'transparent'}}>
                        <LocationSelect getpickuplocationbuttonstate={(state)=>this.setState({piskuplocationcontainerstate : state})}/>
                    </View>
                </View>
            </View>
        );
    }
}
export default Map