
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';



const ChatListComponent = (props) => {
  console.log(props)
  return (
      <View style={styles.container}>
        <Text>{props.chatRooms.name}</Text>
      </View>
      )
}


export default ChatListComponent;


const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    marginLeft: "10%",
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  }

})
