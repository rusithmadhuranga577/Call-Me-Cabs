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
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Colors } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import SetLocationMap from './setlocationbutton';

var SharedPreferences = require('react-native-shared-preferences');
const screenheight = Dimensions.get('window').height;

class PickupLocation extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            containerheight: new Animated.Value(0),
            backstate : false,
            recentlocations : null,
            recentlocationsavailable : false,
            clearalert : false,
        };
        this.goback = this.goback.bind(this);
        this.setpickuploactiononmap = this.setpickuploactiononmap.bind(this);
    }

    componentDidMount(){
        AsyncStorage.getItem('recentlocations', (err, locations)=>{
            const x = JSON.parse(locations);
            this.setState({recentlocations : x});
            if(x != null){
                this.setState({recentlocations : x});
                this.setState({recentlocationsavailable : true});
            }else{
                this.setState({recentlocations : []});
                this.setState({recentlocationsavailable : false});
            }
        });
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

    closeClearlAert=()=>{
        this.setState({clearalert : false});
    }

    openClearAlert=()=>{
        this.setState({clearalert : true});
    }

    clearRecentSearchList=()=>{
        AsyncStorage.removeItem('recentlocations');
        this.setState({recentlocations : []});
        this.setState({recentlocationsavailable : false});
        this.closeClearlAert();
    }

    setpickuploactiononmap(state){
        this.goback(false);
        setTimeout(() => {
            this.props.setpickuploactiononmap(state);
        }, 500);
    }

    recentlocationItemOnPress=(item)=>{
        this.props.getselectedlocation(item);
        this.props.goback(false);
    }

    renderRecentPlaceItem=(item)=>{
        return(
            <TouchableOpacity onPress={()=>this.recentlocationItemOnPress(item)} style={[styles.recentsearchitem]}>
                <Icon name={'pin-outline'} size={25}/>
                <View>
                    <Text style={[styles.recentsearchtext]}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render(){
        const recentlocations = this.state.recentlocations;
        return(
            <>
                <Animated.View style={[styles.container, {transform: [{translateY : this.state.containerheight}]}]}>
                    <View style={[styles.topcard]}>
                        <Icon name={'arrow-back-outline'} size={30} style={{margin : 10}} color={Colors.primary} onPress={()=>this.goback(false)}/>
                        <Text style={[styles.pagetitle, {color : Colors.black}]}>{Languages.Enter} <Text  style={[styles.pagetitle]}>{Languages.PickupPoint}</Text></Text>
                    </View>
                    <SetLocationMap onpress={()=>this.setpickuploactiononmap(true)}/>
                    <View style={[styles.recentsearchcard]}>
                        <Text style={[styles.recentsearchtext]}>{Languages.RecentSearch}</Text>
                        {this.state.recentlocationsavailable ?
                        <TouchableOpacity onPress={this.openClearAlert}>
                            <Text style={[styles.cleartext]}>{Languages.Clear}</Text>
                        </TouchableOpacity> : null}
                    </View>
                    <FlatList
                        data={this.state.recentlocations}
                        renderItem={({ item })=>this.renderRecentPlaceItem(item)}
                    />
                </Animated.View>

                {/* Clear Recent Search alert */}
                <CustomAlert
                    displayMode={'alert'}
                    displayMsg={Languages.ClearRecentSearche}
                    displaymsgtitle={Languages.AreYouSure}
                    visibility={this.state.clearalert}
                    dismissAlert={this.closeClearlAert}
                    cancellable={true}
                    buttons={(
                    <>
                        <CustomAlertButton buttontitle={Languages.Clear} theme={'alert'} buttonaction={this.clearRecentSearchList}/>
                        <CustomAlertButton buttontitle={Languages.Cancel} theme={'inverse'} buttonaction={this.closeClearlAert}/>
                    </>
                    )}
                />
            </>
        );
    }
  
}

PickupLocation.propTypes = {
    goback: PropTypes.func,
    setloactiononmap: PropTypes.func,
};

export default PickupLocation;