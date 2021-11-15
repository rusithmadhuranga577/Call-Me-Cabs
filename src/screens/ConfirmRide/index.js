import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, Dimensions, Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import {Business, Icons, Languages, Colors} from '@common';
import Geocoder from 'react-native-geocoding';
import { Button } from '@components';
import PaymentMethodSelector from "./Components/PaymentMethodSelect/index";
import AddNote from "./Components/AddNote/index";
import styles from "./styles";

Geocoder.init(Business.mapsapi);
const height = Dimensions.get('screen').height;
const bottom = height/3

class ConfirmRide extends React.Component {

    constructor(props) {
        super(props);
        this.map = React.createRef();

        this.state = {
            paymentmethod : 0,
            paymentmethodselector : false,
            addnotecontainer : false,
            note : '',
        };
    }

    componentDidUpdate(){
       
    }

    componentDidMount(){
        setTimeout(() => {
            this.map.fitToSuppliedMarkers(['mk1','mk2'],{ edgePadding:{top: 10, right: 10, bottom: 10, left: 10}})
        }, 200);
        console.log(this.props.route.params)
    }

    confirmFunction=()=>{
        console.log(this.props.route.params);
        console.log(this.state);
    }

    closePaymentMethodSelector=()=>{
        this.setState({paymentmethodselector : false});
    }

    OptionRowItem=(iconname, title, type)=>{
        return(
            <TouchableOpacity onPress={()=> type == 'payment' ? this.setState({paymentmethodselector : true}) : this.setState({addnotecontainer : true})} style={[styles.rideoptionbuttonrow]}>
                <Image source={iconname} style={[styles.paymenticonholder]}/>
                <Text style={[styles.paymentmethodtext]}>{title}</Text>
            </TouchableOpacity>
        );
    }

    SelectedCabDetailsColumn=()=>{
        const cab_image = this.props.route.params.cabtypedata.model_icon;
        const max_passengers = this.props.route.params.cabtypedata.max_passengers_count;
        const cab_type_name = this.props.route.params.cabtypedata.model_name;
        return(
            <View style={[styles.cabdetailsrow]}>
                <Text style={[styles.paymentmethodtext]}>{cab_type_name}</Text>
                <Image source={{uri : cab_image}} style={[styles.cabicon]}/>
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Icon name={'people-outline'} size={20}/>
                    <Text style={[styles.paymentmethodtext, {fontSize : 15, marginLeft : 5}]}>{max_passengers}</Text>
                </View>
            </View>
        );
    }

    ChargeForRideContainer=()=>{
        const total_charge = this.props.route.params.totalcharge;
        const distance = this.props.route.params.distance;
        const cab_type_name = this.props.route.params.cabtypedata.model_name;
        return(
            <View style={[styles.chargedetailsrow]}>
                <Text style={[styles.pricetext]}>{Languages.Rs} {Number(total_charge).toFixed(2)}</Text>
                <Text style={[styles.distancetext]}>{Number(distance)} {Languages.Km}</Text>
            </View>
        );
    }

    renderBottomContainer(){
        const paymentmethod = this.state.paymentmethod;
        return(
            <View style={[styles.bottomcontainer]}>
                <View style={[styles.paymentmethodrow]}>
                    {this.OptionRowItem(paymentmethod == 0 ? Icons.CashPaymentIcon : Icons.CardPaymentIcon, paymentmethod == 0 ? Languages.Cash : Languages.Card, 'payment')}
                    {this.OptionRowItem(Icons.AddNoteIcon, Languages.AddNote, 'note')}
                </View>
                <View style={{width : '100%', flexDirection : 'row'}}>
                    {this.SelectedCabDetailsColumn()}
                    {this.ChargeForRideContainer()}
                </View>
                <View style={[styles.buttonholder]}>
                    <Button title={Languages.Confirm} action={this.confirmFunction}/>
                </View>
            </View>
        );
    }

    render(){
        let pickupaddress = this.props.route.params.locationdata.pickuplocationaddress;
        let dropaddress = this.props.route.params.locationdata.droplocationaddress;

        let pickuplocation_lat = this.props.route.params.locationdata.pickuplocation.latitude;
        let pickuplocation_lan = this.props.route.params.locationdata.pickuplocation.longitude;
        let droplocation_lat = this.props.route.params.locationdata.droplocation.latitude;
        let droplocation_lan = this.props.route.params.locationdata.droplocation.longitude;
        return(
            <View>
                <View style={[styles.container]}>
                    <View>
                        <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={map => {this.map = map}}
                        style={styles.map}
                        showsUserLocation={true}
                        region={this.state.mapregion}
                        >
                            <MapView.Marker
                                key={1}
                                coordinate={{latitude : pickuplocation_lat, longitude : pickuplocation_lan}}
                                image={Icons.PickupLocationIcon}
                                identifier={'mk1'}
                            />
                            <MapView.Marker
                                key={1}
                                coordinate={{latitude : droplocation_lat, longitude : droplocation_lan}}
                                image={Icons.DropLocationIcon}
                                identifier={'mk2'}
                            />
                            <MapViewDirections
                                origin={{latitude : pickuplocation_lat, longitude : pickuplocation_lan}}
                                destination={{latitude : droplocation_lat, longitude : droplocation_lan}}
                                apikey={Business.mapsapi}
                                strokeWidth={3}
                                strokeColor="#000"
                            />
                        </MapView>
                        {this.renderBottomContainer()}
                    </View>
                </View>
                {this.state.paymentmethodselector ?
                <PaymentMethodSelector defstate={this.state.paymentmethod} closePopup={(state)=>state ? this.closePaymentMethodSelector() : null} getPaymentMethod={(data)=>this.setState({paymentmethod : data.id})}/>
                :null}
                {this.state.addnotecontainer ?
                <AddNote closePopup={(state)=>state ? this.setState({addnotecontainer : false}) : null} setnote={(data)=>this.setState({note : data})}/>
                :null}
            </View>
        );
    }
}
export default ConfirmRide