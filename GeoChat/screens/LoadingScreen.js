import React from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import TempLogo from '../assets/TempLogo.png'
import styles from '../styles/LoadingScreen'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>
            <Image source={TempLogo} />
            <ActivityIndicator size="large" />
            <Text>Loading . . .</Text>
        </View>
    );
}

