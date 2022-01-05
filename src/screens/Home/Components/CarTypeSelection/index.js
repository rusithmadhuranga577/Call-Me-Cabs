import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import {getDistance, getPreciseDistance} from 'geolib';
import Icon from "react-native-vector-icons/Ionicons";

import {Business, Icons, Languages, Colors, Url} from '@common';
import { Button, CustomAlert, CustomAlertButton  } from '@components';
import styles from "./styles";

class CarTypeSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pickuplocation : [],
            droplocation : [],
            cabtypes : [],
            selectedlocationdistance : 0,
            selectedcartypeid : null,
            totalchargeforride : 0,
            locationdata : [],
            selectedcabdata : [],
            nocabmodelalert : false
        };
        this.getSelectedCar = this.getSelectedCar.bind(this);
    }

    componentDidMount(){
        fetch(Url.getcabtypesurl)
        .then((response) => response.json())
        .then((data) => this.setState({cabtypes : data.data}))
        .catch((error) => console.error(error))

        this.calculateDistance();
    }

    getSelectedCar(state){
        this.props.getSelectedCar(state);
    }

    setCarType = (data) => {
        const charge = Number(data.model_charge);
        this.calculateDistance(data.model_charge);
        this.setState({selectedcartypeid : data.cab_model_id});
        this.setState({selectedcabdata : data});
    }

    calculateDistance = (charge) => {
        const pickuplocationarray = this.props.state.pickuplocation;
        const droplocationarray = this.props.state.droplocation;

        var dis = getDistance(
          {latitude: pickuplocationarray.latitude, longitude: pickuplocationarray.longitude},
          {latitude: droplocationarray.latitude, longitude: droplocationarray.longitude},
        );
        const distance = dis/1000;
        this.setState({selectedlocationdistance : distance});
        const distancecharge = Number(charge);
        this.setState({totalchargeforride : Math.round(distance)*distancecharge});
    };

    rendercontainer({item}){
        const distance = Number(this.state.selectedlocationdistance);
        const selectedid = this.state.selectedcartypeid;
        return(
            <TouchableOpacity onPress={()=>this.setCarType(item)} style={[styles.carcontainer, {backgroundColor : selectedid == item.cab_model_id ? Colors.gray : Colors.white}]}>
                <View style={[styles.imagecontainer]}>
                    <Image source={{uri : item.model_icon}} style={[styles.image]}/>
                </View>
                <Text numberOfLines={1} style={[styles.cartypetext]}>{item.model_name}</Text>
                {item.max_passengers_count == null ? null : 
                <View style={[styles.maxpersonsinfocontainer]}>
                    <Icon name={'people-outline'} size={15}/>
                    <Text style={[styles.maxpersonstext]}>{item.max_passengers_count}</Text>
                </View>}
                <Text style={[styles.chargeforkmtext]}>{Languages.Rs}{(Number(item.model_charge)*Math.round(distance)).toFixed(2)}</Text>
            </TouchableOpacity>
        );
    }

    nextFunction=()=>{
        const { navigation } = this.props;
        const locationpoindata = this.props.state;
        const selectedcabdata = this.state.selectedcabdata;
        console.log(selectedcabdata == '')
        
        if(selectedcabdata == ''){
            this.openNoCabAlert();
        }else{
            navigation.navigate('ConfirmRide', {locationdata : locationpoindata, cabtypedata : this.state.selectedcabdata, totalcharge : this.state.totalchargeforride, distance : this.state.selectedlocationdistance});
        }
        // navigation.navigate('ConfirmRide', {locationdata : locationpoindata, cabtypedata : this.state.selectedcabdata, totalcharge : this.state.totalchargeforride, distance : this.state.selectedlocationdistance});
    }

    closeNoCablAert=()=>{
        this.setState({nocabmodelalert : false});
    }

    openNoCabAlert=()=>{
        this.setState({nocabmodelalert : true});
    }

    render(){
        return(
            <View style={[styles.container]}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.cabtypes}
                    renderItem={(item)=>this.rendercontainer(item)}
                    keyExtractor={item => item.cab_model_id}
                />
                <View style={[styles.buttonholder]}>
                    <Button title={Languages.Next} action={this.nextFunction}/>
                </View>

                {/* Clear Recent Search alert */}
                <CustomAlert
                    displayMode={'alert'}
                    displayMsg={Languages.PleaseSelectCabType}
                    displaymsgtitle={Languages.NoCabType}
                    visibility={this.state.nocabmodelalert}
                    dismissAlert={this.closeNoCablAert}
                    cancellable={true}
                    buttons={(
                    <>
                        <CustomAlertButton buttontitle={Languages.Ok} theme={'inverse'} buttonaction={this.closeNoCablAert}/>
                    </>
                    )}
                />
            </View>
        );
    }
}

CarTypeSelection.propTypes = {
    getSelectedCar: PropTypes.func,
};

export default function(props){
    const navigation = useNavigation();
    return <CarTypeSelection {...props} navigation={navigation} />;
} 
