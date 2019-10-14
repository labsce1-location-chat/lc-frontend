import React, { useState } from 'react';
import { Button, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import ChatListComponent from './ChatListComponent'



const ChatList = () => {
  //So we can put state callse here.

  const [chatRooms, setChatrooms] = useState([{id: 1, name: "taco", distance: 1}, {id: 2, name: 'thing', distance: 2}, {id: 3, name: "home", distance: 3}])

  getChatrooms = () => {
    setChatrooms([...chatRooms, {id: 4, name: "New room", distance: 4}])

  }
  return (
      <View style={styles.container}>
      <ScrollView>
        {chatRooms.map((item, idx) => (
              <ChatListComponent chatRooms={item} key={item.id} />
        ))}
      </ScrollView>
      <Button title="Add new Chatroom" onPress={()=> getChatrooms()} />
      </View>
      )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: "10%",
    marginRight: "10%",

  },


})

export default ChatList;
