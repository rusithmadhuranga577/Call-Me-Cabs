/** @format */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text,
  Animated,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';

var SharedPreferences = require('react-native-shared-preferences');
const screenheight = Dimensions.get('window').height;

class SetLocationMap extends React.Component{

    render(){
        return(
            <TouchableOpacity onPress={this.props.onpress} activeOpacity={0.5} style={[styles.setlocationbutton]}>
                <View style={[styles.pinmarkerholder]}>
                    <Icon name={'location'} size={25}/>
                </View>
                <Text style={[styles.buttontitle]}>{Languages.SetLocationOnMap}</Text>
            </TouchableOpacity>
        );
    }
  
}

export default SetLocationMap;