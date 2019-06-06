import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage} from 'react'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
// import {MapView} from 'expo';
// import * as firebase from 'firebase';
import {test, createChatRoom} from '../Redux/actions/index';







class CreateChatRoom extends React.Component{
    constructor(){
        super();
    }



    newRoom = (userId) => {
      console.log('user id', this.props.user.uid)
      this.props.createChatRoom(this.props.user.uid)
    }

    render(){
        return(

            <View style={styles.container}>
            {console.log("props on create chat room page", this.props)}
                <Text>This is where you create chat room</Text>
                <Text>User Id: {this.props.user.uid}</Text>
                <TextInput style={styles.textBox} placeholder="Chat room name" />




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
  textBox: {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    width: "100%",
    height: 50,
  }
});

const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location
    };
};

export default connect(mapStateToProps, {test, createChatRoom})(CreateChatRoom);
