/** @format */

import React, { useEffect, useState, useRef  } from 'react';
import { connect } from "react-redux";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  LogBox
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Images, Languages, Countries } from '@common';
import { Colors, Constants, Icons, Url } from '@common';
import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import { showMessage, hideMessage } from "react-native-flash-message";

var RNFS = require('react-native-fs');
const QueryString = require('query-string');
var SharedPreferences = require('react-native-shared-preferences');

const SetProfileImage = ({route}) => {

  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});
  const [singleFile, setSingleFile] = useState(null);
  const [image, setImage] = useState(Images.UserPlaceHolder);

  const [uploading, setuploading] = useState(false);
  const [erroralert, seterroralert] = useState(false);
  const [noimagealert, setnoimagealert] = useState(false);

  var userid = '';

  useEffect(() => {
    LogBox.ignoreAllLogs();
    SharedPreferences.getItem('userid', id => {
      userid = id;
    })
  })

  const showpopup = () => {
    showMessage({
      message: "Profile picture updated !",
      type: "success",
      icon : 'success',
      duration : 2500
    });
  }

  const uploadImage = async () => {
    console.log('Upolading')
    if(singleFile){
      setuploading(true);
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('userid', userid);
      data.append('file_attachment', fileToUpload);
      let res = await fetch(
        Url.imageuploadurl,
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      console.log(responseJson);
      if (responseJson.status == 1) {
        console.log(responseJson.filename);
        const photo = responseJson.filename;
        SharedPreferences.setItem("userPhoto",responseJson.filename +'');
        SharedPreferences.setItem('createaccountstep', 3+'');
        showpopup();
        setTimeout(() => {
          setuploading(false);
          navigation.replace('LocationSettings', {logged : 0});
        }, 1500)
      }else if(res.status == 0){
        setuploading(false);
        seterroralert(true);
      }else{
        setuploading(false);
        seterroralert(true);
      }
    }else{
      setnoimagealert(true);
    }
  }

  const SelectImageFunction = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      var selected = JSON.stringify(res);
      console.log('res : ' + JSON.stringify(res[0]));
      selected = JSON.stringify(res);
      setFilePath(selected);
      setSingleFile(res[0]);
      console.log(res[0].uri);
      setImage(res[0].uri);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  return(
    <View>
    <LoadingComponent visibility={uploading}/>
      <View style={[styles.container, {padding : 10}]}>
        <View style={[styles.placeholder]}>
          <Image style={[styles.image]} source={{uri: image}}/>
          <TouchableOpacity style={[styles.cameraiconcontainer]} onPress={()=>SelectImageFunction()}>
            <Icon name={'camera'} size={20} color={Colors.white}/>
          </TouchableOpacity>
        </View>
          <View style={[styles.button]}>
            <Button title={Languages.Update} action={uploadImage}/>
          </View>
      </View>

      {/* Something Went Wrong*/}
      <CustomAlert
        displayMode={'error'}
        displayMsg={Languages.SomethingWentWrong}
        displaymsgtitle={'Error'}
        visibility={erroralert}
        dismissAlert={seterroralert}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={'Ok'} theme={'error'} buttonaction={()=>seterroralert(false)}/>
          </>
        )}
      />

      {/* No Image Found Alert*/}
      <CustomAlert
        displayMode={'alert'}
        displayMsg={Languages.NoImageSelected}
        displaymsgtitle={'Alert'}
        visibility={noimagealert}
        dismissAlert={setnoimagealert}
        cancellable={true}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.Ok} theme={'inverse'} buttonaction={()=>setnoimagealert(false)}/>
          </>
        )}
      />


    </View>
  );
}
export default SetProfileImage;