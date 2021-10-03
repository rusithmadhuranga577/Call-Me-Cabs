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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';
import SetLocationMap from './setlocationbutton';

var SharedPreferences = require('react-native-shared-preferences');
const screenheight = Dimensions.get('window').height;

class PickupLocation extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            containerheight: new Animated.Value(0),
            backstate : false
        };
        this.goback = this.goback.bind(this);
        this.setloactiononmap = this.setloactiononmap.bind(this);
    }

    animateIn = () => {
        Animated.timing(this.state.containerheight, {
          toValue: 0,
          duration: 300
        }).start();
      };
    
    animateOut = () => {
        Animated.timing(this.state.containerheight, {
          toValue: screenheight,
          duration: 200
        }).start();
    };

    componentDidUpdate(){
        if(this.props.pickupvisible == true){
            console.log('animate in')
            this.animateIn();
        }else if(this.props.pickupvisible == false){
            console.log('animate out')
            this.animateOut();
        }
    }

    goback(state){
        this.props.goback(state);
    }

    setloactiononmap(state){
        this.goback(false);
        setTimeout(() => {
            this.props.setloactiononmap(state);
        }, 500);
    }

    render(){
        return(
            <>
                <Animated.View style={[styles.container, {transform: [{translateY : this.state.containerheight}]}]}>
                    <View style={[styles.topcard]}>
                        <Icon name={'arrow-back-outline'} size={30} style={{margin : 10}} color={Colors.primary} onPress={()=>this.goback(false)}/>
                        <Text style={[styles.pagetitle, {color : Colors.black}]}>{Languages.Enter} <Text  style={[styles.pagetitle]}>{Languages.PickupPoint}</Text></Text>
                    </View>
                    <SetLocationMap onpress={()=>this.setloactiononmap(true)}/>
                    <View style={[styles.recentsearchcard]}>
                        <Text style={[styles.recentsearchtext]}>{Languages.RecentSearch}</Text>
                    </View>
                </Animated.View>
            </>
        );
    }
  
}

PickupLocation.propTypes = {
    goback: PropTypes.func,
    setloactiononmap: PropTypes.func,
};

export default PickupLocation;