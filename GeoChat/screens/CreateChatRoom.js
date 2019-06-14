import React from 'react';
import { StyleSheet, View,TextInput, Image} from 'react-native';
import {  Text, Button, ThemeProvider  } from 'react-native-elements';
import {FormLabel, FormInput, FormValidationMessage} from 'react'
import styles from '../styles/createChatroomStyles'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
// import {MapView} from 'expo';
// import * as firebase from 'firebase';
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
      // console.log("newRoom function: ", this.props.user.uid, "chatroom name", this.state.roomName)
      this.props.createChatRoom(userName, avatar, id, this.state.roomName, this.props.location)
      //
      // this down here is  reference to send the user to the chatroom they just created
       // rightSubtitle={<Link to={`/chatroom/${room.id}`}><Text style={styles.joinBtn}>Join</Text></Link>}
      // this.props.history.push(new chatroom)
      // we have to go to the new chatroom.
    }

    handleChange = (e) => {

      this.setState({roomName: e})
      // console.log("", e)
      console.log("state change", this.state.roomName)
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
      }
    };

    render(){
        return(

            <View style={styles.container}>
                <Button title="Go back" onPress={this.goBack} />
                <TextInput style={styles.textBox} placeholder="Chat room name" onChangeText={this.handleChange} value={this.state.roomName} maxLength={20} />
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
