import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
// Redux Imports
import {Provider, connect} from 'react-redux'
import Test from '../components/test';
import {handleSignIn, createChatRoom} from '../Redux/actions/index';
import { Redirect } from 'react-router'

class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {
            coords : '',
            chatroom: [] 
        }
    }

    componentDidMount(){
        this.getUsersCoords()
    }

    getUsersCoords = () => {
        if(navigator.geolocation){
        // console.log(navigator.geolocation.getCurrentPosition())
        // gets users current coordinates and passes it to parse coords
        navigator.geolocation.getCurrentPosition(this.parseCoords)
        }else{
        this.setState({coords : "Please allow this app to use your location"})
        }
    }

    parseCoords = position => {
        this.setState({coords : `${position.coords.latitude} + ${position.coords.longitude}`})
        console.log(position.coords.latitude, position.coords.longitude)
    }

    testButton = () => {
      this.props.createChatRoom(this.state)
      console.log('state afte button press', this.state.chatroom)


    }

    signInAnonymously = () => {
        firebase.auth().signInAnonymously().then(user => {
        if(user){
            // console.log("user", user);
            console.log("Signing the user in", this.props)
            this.props.handleSignIn(user);
            this.props.history.push("/chat-list")
        }
        else{
            console.log("user signed out")
        }
        })
        .catch(err => {
        console.log("Error signing in :", err)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome To GeoChat</Text>
                <Text>{this.state.coords ? this.state.coords : "Loading Coordinates..."}</Text>
                <Button 
                    onPress={this.signInAnonymously} 
                    disabled={this.state.coords.length ? false : true} 
                    title="Continue Anonymously" 
                />
                <Button 
                    onPress={this.testButton} 
                    disabled={this.state.coords.length ? false : true} 
                    title="Create Chatroom" 
                />
                <Test />
            </View>
        );
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
        chatroom: state.chatroom
    };
};

export default connect(mapStateToProps, {handleSignIn, createChatRoom})(HomePage);

