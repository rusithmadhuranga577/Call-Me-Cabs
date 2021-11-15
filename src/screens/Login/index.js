/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState, useRef } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   TextInput,
   Text,
   Image,
   useColorScheme,
   View,
   Animated,
   Dimensions
 } from 'react-native';
 import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import "@react-native-firebase/auth";
import CheckBox from '@react-native-community/checkbox';
import firebase from "@react-native-firebase/app";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';
import SocialLogin from './sociallogin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images, Languages, Constants, Colors, Icons, Url } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";

const screenwidth = Dimensions.get('screen').width;

const QueryString = require('query-string');
var SharedPreferences = require('react-native-shared-preferences');
 
 const App = () => {
   
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [passwordvisible, setpasswordvisible] = useState(false);
  const [loginfailed, setloginfailed] = useState(false);
  const isFocused = useIsFocused();

  const [loading, setloading] = useState(false);

  const rightitemsposition = useRef(new Animated.Value(200)).current;
  const titlepsition = useRef(new Animated.Value(-200)).current;
 
   useEffect(()=>{
    imagein();
   }, [isFocused])

  const imagein = () => {
    Animated.timing(rightitemsposition, {
      toValue: 0,
      duration: 400
    }).start();

    Animated.timing(titlepsition, {
      toValue: 10,
      duration: 400
    }).start();
  };

  const LoginFunction = () => {
    setloading(true);
    axios.post(Url.loginurl, 
      QueryString.stringify({
        email : email,
        password : password,
      }), 
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      }).then(response => {
        console.log(response.data.status);
        if(response.data.status == 1){
          SharedPreferences.setItem('email', response.data.email);
          SharedPreferences.setItem('phonenumber', response.data.phonenumber);
          SharedPreferences.setItem('fname', response.data.f_name);
          SharedPreferences.setItem('lname', response.data.l_name);
          SharedPreferences.setItem('userphoto', response.data.photo);
          SharedPreferences.setItem('userid', response.data.customer_id);
          SharedPreferences.setItem('city', response.data.city);

          const fullname = `${response.data.f_name} ${response.data.l_name}`;
          SharedPreferences.setItem('username', fullname);
          SharedPreferences.setItem('logged', 1+'');
          showMessage({
            message: Languages.UserLogged,
            type: "success",
            icon : 'success',
            duration : 2500
          });
          navigation.push('Home')
          setloading(false);
        }else{
          setloading(false);
          setloginfailed(true);
        }
    }).catch(err =>  (console.log(err)))
  }

   return (
     <View>
      <LoadingComponent visibility={loading}/>
      <View style={[styles.container]}>
        <Animated.Image source={Images.LoginVector} style={[styles.vector, {transform: [{translateX: rightitemsposition}]}]}/>
        <Animated.View style={{transform: [{translateX: titlepsition}], width : '100%'}}>
          <Text numberOfLines={3} style={[styles.title]}>{Languages.Login}</Text>
        </Animated.View>
        <Animated.View style={{transform: [{translateX: titlepsition}], width : '100%'}}>
          <Text numberOfLines={3} style={[styles.subtitle, {alignSelf : 'flex-start'}]}>{Languages.LoginPageSubTitle}</Text>
        </Animated.View>

          <View style={{width : '100%',}}>
            <View style={[styles.textinputviewrow, {marginTop : 30}]}>
              <View style={[styles.iconholder]}>
                <Icon name={'at'} size={25}/>
              </View>
              <TextInput 
                value={email}
                placeholder={Languages.Emailplaceholder}
                onChangeText={text => setemail(text)}
                style={[styles.input, {fontFamily: Constants.light, width: '90%'}]}
                placeholderTextColor={'rgba(0,0,0,0.4)'}
              />
            </View>
          </View>

          <View style={{width : '100%',}}>
            <View style={[styles.textinputviewrow, {marginTop : 20}]}>
              <View style={[styles.iconholder]}>
                <Icon name={'lock'} size={25}/>
              </View>
              <TextInput 
                value={password}
                secureTextEntry = {!passwordvisible}
                placeholder={Languages.PasswordPlaceholder}
                onChangeText={text => setpassword(text)}
                style={[styles.input, {fontFamily: Constants.light, width: '90%'}]}
                placeholderTextColor={'rgba(0,0,0,0.4)'}
              />
            </View>
          </View>

          <View style={[styles.checkboxcontainer]}>
            <CheckBox
              disabled={false}
              value={passwordvisible}
              tintColors={{ true: Colors.primary, false: 'black' }}
              onValueChange={(newValue) => setpasswordvisible(newValue)}
            />
            <Text style={[styles.checkboxcontainertext]}>{Languages.ShowHidePassword}</Text>
          </View>

          <View style={{marginTop : 20, width : '100%'}}>
            <Button action={LoginFunction} title={Languages.Login}/>
          </View>
          <Text numberOfLines={3} style={[styles.registertext]}>{Languages.DontHaveAnAccount} <Text onPress={()=>navigation.push('CreateNewAccount')} style={[styles.registerclicktext]}>{Languages.Register}</Text></Text>
          <View style={{alignSelf : 'center', width : '100%'}}>
           <SocialLogin/>
          </View>
      </View>
      <CustomAlert
        displayMode={'alert'}
        displayMsg={Languages.InvalidUserName}
        displaymsgtitle={Languages.LoginFailed}
        visibility={loginfailed}
        dismissAlert={setloginfailed}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.Retry} theme={'alert'} buttonaction={()=>setloginfailed(false)}/>
          </>
        )}
      />
     </View>
   );
 };
 
 export default App;
 