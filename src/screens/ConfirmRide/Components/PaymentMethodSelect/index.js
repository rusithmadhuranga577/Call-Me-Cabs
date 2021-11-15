import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, Dimensions, Image} from 'react-native';

import {Business, Icons, Languages, Colors} from '@common';
import Geocoder from 'react-native-geocoding';
import { Button } from '@components';
import RadioButton from './RadioButton';
import styles from "./styles";

Geocoder.init(Business.mapsapi);
const height = Dimensions.get('screen').height;
const bottom = height/3

class PaymentMethodSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentmethod : 0,
            paymentoptions : [{id : 0, label : Languages.CashPayment, image : Icons.CashPaymentIcon, data : 'CASH'}, {id : 1, label : Languages.CardPayment, image : Icons.CardPaymentIcon, data : 'CARD'}],
        };
        this.closePopup = this.closePopup.bind(this);
        this.getPaymentMethod = this.getPaymentMethod.bind(this);
    }

    closePopup = () => {
        this.props.closePopup(true);
    }

    getPaymentMethod = (e) => {
        this.props.getPaymentMethod(e);
    }

    onChange = (e) => {
        console.log('close')
        this.getPaymentMethod(e);
    }

    render(){
        let daf_state = this.props.defstate;
        return(
            <TouchableOpacity onPress={()=>this.closePopup()} activeOpacity={1} style={[styles.overlay]}>
                <View style={[styles.container]}>
                    <Text style={[styles.containertitle]}>{Languages.SelectPaymentMethod}</Text>
                    <RadioButton
                        data={this.state.paymentoptions}
                        initial={daf_state == 0 ? 1 : 2}
                        box = {false}
                        selectedBtn={(e) => this.onChange(e)}            
                        animationTypes= {['pulse']}
                    />
                    <TouchableOpacity onPress={()=>this.closePopup()} style={[styles.donebuttonborder]}>
                        <Text style={[styles.donetext]}>{Languages.Done}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}
export default PaymentMethodSelector