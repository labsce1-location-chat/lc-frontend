import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as firebase from 'firebase';
// Redux Imports
import {connect} from 'react-redux'
import {handleSignIn} from '../Redux/actions/index';
import TempLogo from '../assets/TempLogo.png';

class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {
            coords : '',
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
        this.setState({coords : `X : ${position.coords.latitude} Y : ${position.coords.longitude}`})
        console.log(position.coords.latitude, position.coords.longitude)
    }

    signInAnonymously = () => {
        firebase.auth().signInAnonymously().then(user => {
        if(user){
            // console.log("user", user);
            console.log("Signing the user in")
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
                <Image 
                    source={TempLogo}
                    style={{width: 150, height: 150}} 
                />
                <Text style={styles.header}>Welcome To GeoChat</Text>
                <Text style={styles.subText}>Chat with local people in your area anonymously and securely. </Text>
                <Text>{this.state.coords ? this.state.coords : "Loading Coordinates..."}</Text>
                <Button 
                    onPress={this.signInAnonymously} 
                    disabled={this.state.coords.length ? false : true} 
                    title="Continue Anonymously" 
                />
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
    header : {
        fontSize : 30
    },
    subText : {
        fontSize : 12,
        width : 200,
        textAlign : "center",
    }
});

const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn
    };
};

export default connect(mapStateToProps, {handleSignIn})(HomePage);

