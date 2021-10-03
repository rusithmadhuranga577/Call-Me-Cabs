/** @format */

import React, { useEffect, useState, useRef  } from 'react';
import { connect } from "react-redux";
import {
  View,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
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
                <ActivityIndicator size={80} color={Colors.white} />
            </View>:null
        }
      </>
    );
}