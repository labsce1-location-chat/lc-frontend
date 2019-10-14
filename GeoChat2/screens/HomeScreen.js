
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Container } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'



const HomeScreen = (props) => {
  login = () => {
    const {navigate} = props.navigation
    console.log("do some logging in to the DB.")
    navigate("ChatList")

  }
    return (
        <View>
          <Button style={styles.continueButton} title="Continue" onPress={() => this.login()}/>
          <Text>Here's the homescreen</Text>
        </View>
        )
}
export default HomeScreen




const styles = StyleSheet.create({
  continueButton: {
    fontSize: 60,
  }

})
