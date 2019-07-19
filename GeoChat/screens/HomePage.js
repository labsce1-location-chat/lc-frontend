import React from 'react';
import { StyleSheet, View, Image, AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import {  Text, Button, ThemeProvider  } from 'react-native-elements';

// Redux Imports
import {connect} from 'react-redux'
import {handleSignIn, createTestRooms, handleLogIn} from '../Redux/actions/index';
import styles from '../styles/homepageStyles'
import TempLogo from '../assets/TempLogo.png';
class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {
            coords : '',

            location:{},
            // switch this to false to actually find your location.
            development: false
        }
    }

    componentDidMount(){
        if(this.state.development) {
            this.setState({location: {lat: 40.7484, lon: -73.9857}})
            this.setState({coords: "X: 40.7484, Y: -73.9857"})
        }else {
            this.getUsersCoords()
            this.checkForSavedUser().then(res => {
                if(res){
                    console.log("saved user detected logging in", res)
                    this.props.handleLogIn(res, this.state.location);
                    this.props.history.push('/chat-list')
                }
            }).catch(err => {
                console.log("Error signing user in", err)
            })
        }
    }

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
        this.setState({location : {lat : position.coords.latitude, lon : position.coords.longitude }})
        console.log(position.coords.latitude, position.coords.longitude)
    }

    signInAnonymously = () => {
        firebase.auth().signInAnonymously().then(user => {
        if(user){
            this.props.handleSignIn(user, this.state.location);
            this.props.history.push("/chat-list");
        }
        else{
            console.log("user signed out")
        }
        })
        .catch(err => {
        console.log("Error signing in :", err)
        })

    }
    
    testRooms = () => {
      this.props.createTestRooms()
    }

    checkForSavedUser = async() =>{
        try {
            const retrievedItem =  await AsyncStorage.getItem("USER");
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return false;
    }


    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={TempLogo}
                    style={{width: 150, height: 150}} 
                />
                <Text h3>Welcome To GeoChat</Text>
                <Text style={styles.subText}>Chat with local people in your area anonymously and securely. </Text>
                <Text>{this.state.coords ? this.state.coords : "Loading Coordinates..."}</Text>
                <Button 
                    onPress={this.signInAnonymously} 
                    disabled={this.state.coords.length ? false : true} 
                    title="Continue Anonymously" 
                />
                <Button
                  onPress={this.testRooms}
                  title="Create temp chat rooms For testing only"
                />
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn
    };
};

export default connect(mapStateToProps, {handleSignIn, createTestRooms, handleLogIn})(HomePage);

