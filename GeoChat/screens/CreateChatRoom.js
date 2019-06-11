import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react'
import styles from '../styles/createChatroomStyles'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
// import {MapView} from 'expo';
// import * as firebase from 'firebase';
import {test, createChatRoom} from '../Redux/actions/index';







class CreateChatRoom extends React.Component{
    constructor(){
        super();
        this.state = {
          roomName: "",

        }
    }



    newRoom = (userId) => {
      // console.log("newRoom function: ", this.props.user.uid, "chatroom name", this.state.roomName)
      console.log("location", this.props.location)
      this.props.createChatRoom("ChatRoomOWner", "avatar url", this.state.roomName, this.props.location)
    }

    handleChange = (e) => {

      this.setState({roomName: e})
      // console.log("", e)
      console.log("state change", this.state.roomName)
    }

    render(){
        return(

            <View style={styles.container}>
                <Text>This is where you create chat room</Text>
                <Text>User Id: {this.props.user.uid}</Text>
                <TextInput style={styles.textBox} placeholder="Chat room name" onChangeText={this.handleChange} value={this.state.roomName} maxLength={20} />
                <Button title="Submit" onPress={this.newRoom} />
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location
    };
};

export default connect(mapStateToProps, {test, createChatRoom})(CreateChatRoom);
