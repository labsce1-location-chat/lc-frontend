import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
// import {MapView} from 'expo';
// import * as firebase from 'firebase';
import {test, createChatRoom} from '../Redux/actions/index';

class CreatChatRoom extends React.Component{
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
                <Text>This is where you create chat room</Text>
                <Text>User Id: {this.props.user.uid}</Text>
                <Text>{this.props.loggedIn ? "You are logged in" : "You are logged out"}</Text>


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
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location
    };
};

export default connect(mapStateToProps, {test, createChatRoom})(CreateChatRoom);
