/** @format */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  Animated,
  View,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors, Icons } from '@common';
import { Button } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

var SharedPreferences = require('react-native-shared-preferences');
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;

class PickupLocation extends React.Component{

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
            userlocation : {latitude : 7.50015162585, longitude : 80.3325495607}
        };
        this.goback = this.goback.bind(this);
        this.setloactiononmap = this.setloactiononmap.bind(this);
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

    onRegionChangecomplete(result){
        console.log(result)
    }

    componentDidUpdate(){
        
    }

    goback(state){
        this.props.goback(state);
    }

    setloactiononmap(state){
        this.props.setloactiononmap(state);
    }

    render(){
        return(
            <View>
            {this.props.setlocationmapvisible ?
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
                                <Button title={Languages.Confirm}/>
                        </View>
                    
                </Animated.View>:null}
            </View>
        );
    }
  
}

PickupLocation.propTypes = {
    goback: PropTypes.func,
    setloactiononmap: PropTypes.func,
};

export default PickupLocation;