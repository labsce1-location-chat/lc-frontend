
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Container } from 'react-native';


const HomeScreen = () => {
  return (
      <View>
        <Button style={styles.continueButton} title="Continue"/>
        <Text>Here's the homescreen</Text>
      </View>
      )

}


export default HomeScreen;


const styles = StyleSheet.create({
  continueButton: {
    fontSize: 60,
  }

})
