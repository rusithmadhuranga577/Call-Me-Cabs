import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {Business, Icons, Languages, Colors} from '@common';
import styles from "./styles";

class CarTypeSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pickuplocation : [],
            droplocation : []
        };
    }

    componentDidMount(){
    }

    render(){
        return(
            <View style={[styles.container]}>

            </View>
        );
    }
}
export default CarTypeSelection