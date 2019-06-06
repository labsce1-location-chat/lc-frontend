import React from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import TempLogo from '../assets/TempLogo.png'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>
            <Image source={TempLogo} />
            <ActivityIndicator size="large" />
            <Text>Loading . . .</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        height:"100%",
        width : "100%",
        backgroundColor : "#00B3DA"
    }
})