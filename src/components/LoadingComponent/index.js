/** @format */

import React, { useEffect, useState, useRef  } from 'react';
import { connect } from "react-redux";
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import { Images, Languages, Countries } from '@common';
import { Colors, Constants, Icons } from '@common';
import { Button } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';

const QueryString = require('query-string');
var SharedPreferences = require('react-native-shared-preferences');

export default function LoadingComponent({
    visibility,
  }) {
    return (
      <>
        {visibility ? 
            <View style={[styles.overlay]}>
                <View style={[styles.indicatorholder]}>
                  <ActivityIndicator size={40} color={Colors.white} />
                  <Text style={[styles.text]}>{Languages.LoadingPleaseWait}</Text>
                </View>
            </View>:null
        }
      </>
    );
}