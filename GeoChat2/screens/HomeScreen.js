
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, Container } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'



const HomeScreen = (props) => {
  login = () => {
    const {navigate} = props.navigation
    console.log("do some logging in to the DB.")
    navigate("ChatList")

  }
    return (
        <View style={styles.container}>
          <Text>Welcome To GeoChat</Text>
          <Button style={styles.continueButton} title="Continue" onPress={() => this.login()}/>
        </View>
        )
}
export default HomeScreen




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    fontSize: 60,
  }
})
