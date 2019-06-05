import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';
import {handleSignOut, createChatRoom} from '../Redux/actions/index';
import faker from 'faker'


class ChatList extends React.Component{
    constructor(){
        super();
    }

    logOut() {
      this.props.handleSignOut(this.props.user)
    }

    newRoom() {
      if (this.props) {
      console.log("new room button pressed line 24 chatlist.js")
      this.props.createChatRoom(this.props.user)

      } else {
        console.log("No props at this time. =>", this.props)
      }
    }


    render(){
        return(
            <View style={styles.container}>
                <Text>This is the ChatList Component</Text>
                <Text>User Id: {this.props.user.uid}</Text>

                <Text>{this.props.loggedIn ? "You are logged in" : "You are logged out"}</Text>
                <Button
                  title="Log Out"
                  disabled={this.props.loggedIn ? false: true}
                  onPress={this.logOut} />
                <Button
                  title="New Chatroom"
                  onPress={this.newRoom} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => {
  console.log("state in chatlist", state)
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        chatroom: state.chatroom
    };
};

export default connect(mapStateToProps,{createChatRoom})(ChatList);


