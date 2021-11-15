import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TransitionPresets } from '@react-navigation/stack';

import { Colors, Constants } from '@common'

import {Splash} from '@screens';
import {Login} from '@screens';
import {CreateNewAccount} from '@screens';
import {Home} from '@screens';
import {ConfirmRide} from '@screens';

const Stack = createStackNavigator();

function App() {

  const Back = () => {
    return(
      <View>
        <Icon name={'chevron-left'} size={18}/>
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerStyle: { backgroundColor: '#fff', height: 50, elevation: 10} ,
        headerBackTitleVisible: false,
        animationEnabled : true,
        animationTypeForReplace : 'push',
        animationEnabled : true,
        ...TransitionPresets.SlideFromRightIOS ,
        headerTitleStyle : {fontFamily : Constants.bold, fontSize : 17},
        headerBackImage: ()=>(<Back/>)
      }}
      >
        <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>
        <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} options={{headerShown : true}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
        <Stack.Screen name="ConfirmRide" component={ConfirmRide} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;