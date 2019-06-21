import React from 'react';
import { StyleSheet, View,TextInput, Image, KeyboardAvoidingView} from 'react-native';
import {  Text, Button, ThemeProvider  } from 'react-native-elements';
import {FormLabel, FormInput, FormValidationMessage} from 'react'
import styles from '../styles/createChatroomStyles'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
// import {MapView} from 'expo';
import * as firebase from 'firebase';
import {test, createChatRoom} from '../Redux/actions/index';
import {Link} from 'react-router-native';
import {ImagePicker, Permissions, Constants} from 'expo';







class CreateChatRoom extends React.Component{
    constructor(){
        super();
        this.state = {
          roomName: "",
          roomDescription : "",
          roomAvatar : "",
        }
    }



    newRoom = (userId) => {
      const {userName, avatar, id} = this.props.user 
      this.props.createChatRoom(userName, avatar, id, this.state.roomName, this.props.location)
      this.props.history.push("/chat-list")
    }

    handleChange = (e) => {

      this.setState({[e.target.name] : e.target.value})
      // console.log("", e)
    }

    goBack = () => {
      this.props.history.push('/chat-list')
    }

    getPermission = async() => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    pickImage = async () => {
      this.getPermission();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ roomAvatar: result.uri });
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref('chatroom-avatars').child("testImage");
        ref.put(blob);
      }
    };

    render(){
        return(

            <View style={styles.container}>
                <Button title="Go back" onPress={this.goBack} />
                <TextInput name="roomName" style={styles.textBox} placeholder="Chat room name" onChangeText={this.handleChange} value={this.state.roomName} maxLength={20} />
                <TextInput name="roomDescription" style={styles.textBox} placeholder="Chat room name" onChangeText={this.handleChange} value={this.state.roomDescription} maxLength={200} />
                <Button title="Choose your chatroom Image" onPress={this.pickImage} />
                {this.state.roomAvatar ? <Image source={{uri : this.state.roomAvatar}} style={{width:200, height:200}}/> : null}
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
