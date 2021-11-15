import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Text, Dimensions, Image, TextInput} from 'react-native';

import {Business, Icons, Languages, Colors} from '@common';
import Geocoder from 'react-native-geocoding';
import { Button } from '@components';
import styles from "./styles";

Geocoder.init(Business.mapsapi);
const height = Dimensions.get('screen').height;
const bottom = height/3

class AddNote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            note : '',
        };
        this.closePopup = this.closePopup.bind(this);
        this.setnote = this.setnote.bind(this);
    }

    closePopup = () => {
        this.props.closePopup(true);
    }

    setNoteState = (data) => {
        this.setState({note : data});
    }

    setnote = () => {
        this.props.setnote(this.state.note);
        this.closePopup();
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>this.closePopup()} activeOpacity={1} style={[styles.overlay]}>
                <View style={[styles.container]}>
                    <Text style={[styles.containertitle]}>{Languages.AddNote}</Text>
                    <TextInput
                        multiline={true}
                        placeholder={Languages.AddNoteHere}
                        textAlignVertical={'top'}
                        style={[styles.textboxstyle]}
                        onChangeText={(text)=>this.setNoteState(text)}
                    ></TextInput>
                    <TouchableOpacity onPress={()=>this.setnote()} style={[styles.donebuttonborder]}>
                        <Text style={[styles.donetext]}>{Languages.SetNote}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}
export default AddNote