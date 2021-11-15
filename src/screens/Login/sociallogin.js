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
   Dimensions,
   TouchableOpacity
 } from 'react-native';
 import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import "@react-native-firebase/auth";
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images, Languages, Constants, Colors, Icons, Url, firebase } from '@common';
import { Button, LoadingComponent } from '@components';
import { useNavigation } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";

const screenwidth = Dimensions.get('screen').width;

const QueryString = require('query-string');
var SharedPreferences = require('react-native-shared-preferences');
 
 const App = () => {
   
  const navigation = useNavigation();
  const isFocused = useIsFocused();
 
   useEffect(()=>{

   }, [isFocused])

   const GoogleSignIn = async () => {
        GoogleSignin.configure({
            webClientId: '215881098039-5p0vdln3sh58e0169c6o41nnm7b7rdv1.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            profileImageSize: 160, 
        });
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('User Id : ', user.uid);
              CheckUser(user.uid, userInfo);
            }
          });
          return firebase.auth().signInWithCredential(googleCredential);
        } catch (error) {
          if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            showMessage({
                message: Languages.PlayServices,
                type: "danger",
                icon : 'danger',
                duration : 2500
            });
          } else {
            showMessage({
                message: Languages.SomethingwentWrong,
                type: "danger",
                icon : 'danger',
                duration : 2500
            });
          }
        }
   }

   const CheckUser = (id, userInfo) => {
    axios.post(Url.checkuserauthurl, 
        QueryString.stringify({
            auth_id : id,
        }), 
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
          console.log('Check User',response.data.status);
          if(response.data.status == 1){

          }else if(response.data.status == 0){
            CreateNewUser(userInfo, id);
          }
      }).catch(err =>  (console.log(err)))
   }

   const CreateNewUser = (userinfo, id) => {
       console.log(id)
       axios.post(Url.newaccounturl, 
        QueryString.stringify({
            fname : userinfo.user.givenName,
            lname : userinfo.user.familyName,
            authtype : 'GoogleAuth',
            authemail : userinfo.user.email,
            email : userinfo.user.email,
            photo : userinfo.user.photo,
            password : '',
            mobile : '',
            firebaseauthid : id
        }), 
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded",}
        }).then(response => {
          console.log(response.data);
          if(response.data.status == 1){
            SharedPreferences.setItem('email', userinfo.user.email);
            SharedPreferences.setItem('fname', userinfo.user.givenName);
            SharedPreferences.setItem('lname', userinfo.user.familyName);
            SharedPreferences.setItem('userphoto', userinfo.user.photo);
            SharedPreferences.setItem('userid', response.data.id+'');
  
            const fullname = `${userinfo.user.givenName} ${userinfo.user.familyName}`;
            SharedPreferences.setItem('username', fullname);
            SharedPreferences.setItem('logged', 1+'');
            showMessage({
              message: Languages.AccountCreated,
              type: "success",
              icon : 'success',
              duration : 2500
            });
          }else if(response.data.status == 2){
            showMessage({
              message: Languages.EmailAlready,
              type: "danger",
              icon : 'danger',
              duration : 2500
            });
          }
      }).catch(err =>  (alert(err)));
   }

   const SaveLoginData = (user) => {
    SharedPreferences.setItem('email', user.user.email);
    SharedPreferences.setItem('fname', user.user.givenName);
    SharedPreferences.setItem('lname', user.user.familyName);
    SharedPreferences.setItem('userphoto', user.user.photo);
   }

   return (
     <View>
        <View style={[styles.sociallogincontainer]}>
            <Text numberOfLines={1} style={[styles.subtitle, {fontFamily : Constants.medium}]}>{Languages.UseOtherMethods}</Text>
            <View style={{alignSelf : 'center', flexDirection : 'row', marginTop : 10}}>
                <TouchableOpacity onPress={GoogleSignIn}>
                    <Image source={Icons.GoogleLoginIcon} style={[styles.socialloginicon]}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Icons.FacebookLoginIcon} style={[styles.socialloginicon, {marginLeft : 30}]}/>
                </TouchableOpacity>
            </View>
        </View>
     </View>
   );
 };
 
 export default App;
 