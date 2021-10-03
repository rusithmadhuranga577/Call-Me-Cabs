/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Images, Languages, Constants, Colors } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton, ImageUpload } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const QueryString = require('query-string');
var SharedPreferences = require('react-native-shared-preferences');

const CreateNewAccount =() => {

  const navigation = useNavigation();
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const [passwordvisible, setpasswordvisible] = useState(true);
  const [fieldsemptylert, setfieldsemptylert] = useState(false);
  const [erroralert, seterroralert] = useState(false);

  const RegisterFunction = () => {
    if(email == '' || password == '' || fname == '' || phone == ''){
      setfieldsemptylert(true);
    }else{
      setloading(true);
      axios.post(Store.baseurl + 'customers/userlogin', 
      QueryString.stringify({
        authmode : 'Email_Auth',
        fname : fname,
        lname : lname,
        phonenumber : phone,
        email : email,
        password : password
      }), 
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
      }).then(response => {
        console.log(response.data.status)
        if(response.data.status == 1){
          setloading(false);
          SharedPreferences.setItem('email', response.data.data[0].email);
          SharedPreferences.setItem('userid', response.data.data[0].id);
          SharedPreferences.setItem('fname', response.data.data[0].fname);
          SharedPreferences.setItem('lname', response.data.data[0].lname);
          SharedPreferences.setItem('phonenumber', response.data.data[0].phonenumber);
          SharedPreferences.setItem('address', response.data.data[0].def_address);
        }else if(response.data.status == 2){
          setloading(false);
          setnouseralert(true);
        }else{
          setloading(false);
          setloginfailederror(true);
        }
      })
    }
  }
  
  useEffect(() => {
  
  })

  const TextInputView = ({value, placeholder, title, icon, onChange, ...props}) => (
        <View style={{marginBottom: 15}}>
        <Text style={[styles.placeholdertitle]}>{title}</Text>
          <View style={[styles.inputcontainer]}>
          <View style={[styles.iconholder]}>
            <Icon name={icon} size={20}/>
          </View>
          <TextInput 
              value={value}
              placeholder={placeholder}
              onChangeText={onChange}
              style={[styles.input]}
              placeholderTextColor={'rgba(0,0,0,0.4)'}
          />
          </View>
        </View>
  );

  return(
    <ScrollView style={[styles.container, {padding: 10}]}>

      <ImageUpload/>
      <View style={{marginBottom: 15}}>
      <Text style={[styles.placeholdertitle]}>{Languages.FirstName}</Text>
        <View style={[styles.inputcontainer]}>
        <View style={[styles.iconholder]}>
          <Icon name={'user'} size={20}/>
        </View>
        <TextInput 
            value={fname}
            onChangeText={input => setfname(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
        </View>
      </View>

      <View style={{marginBottom: 15}}>
      <Text style={[styles.placeholdertitle]}>{Languages.LastName}</Text>
        <View style={[styles.inputcontainer]}>
        <View style={[styles.iconholder]}>
          <Icon name={'user'} size={20}/>
        </View>
        <TextInput 
            value={lname}
            onChangeText={input => setlname(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
        </View>
      </View>

      <View style={{marginBottom: 15}}>
      <Text style={[styles.placeholdertitle]}>{Languages.MobileNumber}</Text>
        <View style={[styles.inputcontainer]}>
        <View style={[styles.iconholder]}>
          <Icon name={'phone'} size={20}/>
        </View>
        <TextInput 
            value={phone}
            onChangeText={input => setphone(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
        </View>
      </View>

      <View style={{marginBottom: 50}}>
      <Text style={[styles.placeholdertitle]}>{Languages.Email}</Text>
        <View style={[styles.inputcontainer]}>
        <View style={[styles.iconholder]}>
          <Icon name={'at'} size={20}/>
        </View>
        <TextInput 
            value={email}
            onChangeText={input => setemail(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
        </View>
      </View>

      <View style={{marginBottom: 15}}>
      <Text style={[styles.placeholdertitle]}>{Languages.Password}</Text>
        <View style={[styles.inputcontainer]}>
        <View style={[styles.iconholder]}>
          <Icon name={'lock'} size={20}/>
        </View>
        <TextInput 
            value={password}
            secureTextEntry={passwordvisible}
            onChangeText={input => setpassword(input)}
            style={[styles.input]}
            placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
        </View>
      </View>

      <View style={{marginBottom: 5}}>
      <Text style={[styles.placeholdertitle]}>{Languages.ConfirmPassword}</Text>
        <View style={[styles.inputcontainer]}>
        <View style={[styles.iconholder]}>
          <Icon name={'lock'} size={20}/>
        </View>
        <TextInput 
            value={confirmpassword}
            secureTextEntry={passwordvisible}
            onChangeText={input => setconfirmpassword(input)}
            style={[styles.input]}
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
      
      <View style={{marginTop: 20, marginBottom: 20}}>
        {/* <Button title={Languages.Update} action={()=>navigation.navigate('LocationSettings', {logged : 0})}/> */}
        <Button title={Languages.Update} action={RegisterFunction}/>
      </View>

      {/* Alerts */}

      <CustomAlert
        displayMode={'alert'}
        displayMsg={Languages.SomeRequiredFieldsEmpty}
        displaymsgtitle={Languages.Alert}
        visibility={fieldsemptylert}
        dismissAlert={setfieldsemptylert}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.Ok} theme={'alert'} buttonaction={()=>setfieldsemptylert(false)}/>
          </>
        )}
      />


      <CustomAlert
        displayMode={'error'}
        displayMsg={Languages.SomethingWentWrong}
        displaymsgtitle={Languages.Error}
        visibility={erroralert}
        dismissAlert={seterroralert}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.Rerty} theme={'alert'} buttonaction={()=>seterroralert(false)}/>
          </>
        )}
      />
    </ScrollView>
  );
}
export default CreateNewAccount;