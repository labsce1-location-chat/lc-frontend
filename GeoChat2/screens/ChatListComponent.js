
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'



const ChatListComponent = (props) => {
  return (
      <View style={styles.container}>
        <Text style={styles.chatTitle}>{props.chatRooms.name}</Text>
        <Text style={styles.chatTitle}>{props.chatRooms.distance}</Text>
        <Icon name="chevron-right" size={38} color='red' />
      </View>
      )
}


export default ChatListComponent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: "5%",
    marginRight: "5%",
  },
  chatTitle: {
    fontSize: 20,
  }

})
