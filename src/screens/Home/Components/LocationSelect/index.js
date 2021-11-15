import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {Business, Icons, Languages, Colors} from '@common';
import styles from "./styles";

class LocationSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pickupcontainerstate : true,
            showcontainer : true,
            pickuplocation : [],
            droplocation : []
        };
        this.getpickuplocationbuttonstate = this.getpickuplocationbuttonstate.bind(this);
        this.getdroplocationbuttonstate = this.getdroplocationbuttonstate.bind(this);
    }

    componentDidMount(){
    }

    componentDidUpdate(){
       // this.getpickuplocationbuttonstate(this.state.pickupcontainerstate);
    }

    setpickuplocationbuttonstate(state){
        this.setState({pickupcontainerstate : state});
        this.getpickuplocationbuttonstate(state);
    }

    getpickuplocationbuttonstate(state){
        this.props.getpickuplocationbuttonstate(state);
    }

    setdroplocationbuttonstate(state){
        this.setState({pickupcontainerstate : state});
        this.getdroplocationbuttonstate(state);
    }

    getdroplocationbuttonstate(state){
        this.props.getdroplocationbuttonstate(state);
    }

    renderlocationselectcontainer(pickupaddress, dropaddress){
        return(
            <View style={[styles.container]}>
                <TouchableOpacity onPress={()=>this.setpickuplocationbuttonstate(true)} activeOpacity={0.9} style={[styles.pickuplocationcontainer]}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <View style={[styles.dot ,{backgroundColor : Colors.green}]}/>
                        <Text style={[styles.placeholdertext]}>{pickupaddress == '' ? Languages.EnterPickupLocation : pickupaddress}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setdroplocationbuttonstate(true)} activeOpacity={0.9} style={[styles.droplocationcontainer]}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <View style={[styles.dot ,{backgroundColor : Colors.red}]}/>
                        <Text style={[styles.placeholdertext]}>{dropaddress == '' ? Languages.EnterDropLocation : dropaddress}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        let pickupaddress = this.props.pickupaddress;
        let dropaddress = this.props.dropaddress;
        return(
            <View>
                {this.state.showcontainer ? this.renderlocationselectcontainer(pickupaddress, dropaddress) : null}
            </View>
        );
    }
}

LocationSelect.propTypes = {
    getpickuplocationbuttonstate: PropTypes.func,
};

export default LocationSelect