import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ChatListComponent from './ChatListComponent'



const ChatList = () => {
  //So we can put state callse here.
  const rooms = [{name: "taco"}, {name: 'thing'}, {name: "home"}]
  return (
      <View>
      {rooms.map((item, idx) => (
            <ChatListComponent chatRooms={item} key={idx} />
      ))}
      </View>
      )
}


export default ChatList;
