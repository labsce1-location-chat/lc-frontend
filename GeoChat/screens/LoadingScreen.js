import React from 'react';
import {View,  Image, ActivityIndicator, StyleSheet} from 'react-native';
import {  Text, Button, ThemeProvider  } from 'react-native-elements';
import TempLogo from '../assets/TempLogo.png'
import styles from '../styles/LoadingScreenStyles'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>
            <Image source={TempLogo} />
            <ActivityIndicator size="large" />
            <Text>Loading . . .</Text>
        </View>
    );
}

