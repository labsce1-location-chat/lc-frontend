import React from 'react';
import { StyleSheet, View,TextInput, Image, KeyboardAvoidingView} from 'react-native';
import {  Text, ThemeProvider, Button  } from 'react-native-elements';
import {FormLabel, FormInput, FormValidationMessage} from 'react'
import  {styles, cancelButton} from '../styles/createChatroomStyles'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
// import {MapView} from 'expo';
import * as firebase from 'firebase';
import {test, createChatRoom} from '../Redux/actions/index';
import {Link} from 'react-router-native';
import {ImagePicker, Permissions, Constants} from 'expo';


const theme = {
  Button: {

    backgroundColor: 'red',
  }
}



class CreateChatRoom extends React.Component{
    constructor(){
        super();
        this.state = {
          roomName: "",
          roomAvatar : "",
        }
    }



    newRoom = (userId) => {
      const {userName, avatar, id} = this.props.user 
      this.props.createChatRoom(userName, avatar, id, this.state.roomName, this.props.location)
      this.props.history.push("/chat-list")
    }

    handleChange = (field, value) => {
      // console.log("field: ", field, "value: ", value)
      this.setState({[field]: value})
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
  
      // console.log(result);
  
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
                <TextInput name="roomName" style={styles.textBox} placeholder="Chat room name" onChangeText={this.handleChange.bind(this, "roomName")} value={this.state.roomName} maxLength={20} />
                <Button style={styles.normalButton} title="Choose your chatroom Image" onPress={this.pickImage} />
                {this.state.roomAvatar ? <Image source={{uri : this.state.roomAvatar}} style={{width:200, height:200}}/> : null}
                <Button style={styles.normalButton}title="Submit" onPress={this.newRoom} />
                <ThemeProvider theme={cancelButton}>
                  <Button  title="Cancel" onPress={this.goBack} />
                </ThemeProvider> 
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
