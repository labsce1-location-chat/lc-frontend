import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Sidebar(){
    return(
        <View style={styles.container}>
            <Text>This is the side menu</Text>
            <Text>Profile</Text>
            <Text>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        height:"100%",
    }
})