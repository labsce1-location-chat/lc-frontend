
import React, { Component, useState } from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { Platform, StyleSheet, Text, View, Button, Container } from 'react-native';



const HomeScreen = () => {
  const [count, setCount] = useState(0)
  return (
      <View>

        <Text>{count}</Text>
        <Button
          title="Go to Chat list"
          onPress={() => setCount(count + 1)}
        />
      </View>
      )



}

export default HomeScreen;


const styles = StyleSheet.create({
  continueButton: {
    fontSize: 60,
  }

})
