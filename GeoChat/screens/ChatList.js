import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import {MapView} from 'expo';
import * as firebase from 'firebase';
import {test, setChatRooms} from '../Redux/actions/index';

class ChatList extends React.Component{
    constructor(){
        super();
        this.state = {
            chatrooms : [],
        }
    }

    initMap = location => {

    }

    getChatrooms = () => {
        console.log(this.props)
        const ref = firebase.database().ref('chatrooms');
        ref.once('value').then(snap => {
            this.props.setChatRooms(snap.val())
            this.setState({ chatrooms : snap.val() })
            console.log("Changed state boii", console.log(this.state.chatrooms))
        })
        .catch(err => {
            console.log(err);
        })
        // this.props.test();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>This is the ChatList Component</Text>
                <Text>User Id: {this.props.user.uid}</Text>
                <Text>{this.props.loggedIn ? "You are logged in" : "You are logged out"}</Text>

                <MapView
                    style={{height:400, width:400 }}
                    initialRegion={{
                    latitude: this.props.location.lat,
                    longitude: this.props.location.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    // showsUserLocation={true}
                    provider="google"
                >
                <MapView.Marker 
                    coordinate={{latitude : this.props.location.lat, longitude: this.props.location.lon}}
                    title="Current Location"
                    description="Your current location"
                    color="blue"
                />
                {this.state.chatrooms 
                    ? Object.keys(this.state.chatrooms).map(key => {
                        const room = this.state.chatrooms[key];
                        return(
                            <MapView.Marker 
                                description={room.description} 
                                title={room.name} 
                                coordinate={{latitude : room.lat, longitude: room.lon}}
                                key={key}
                            />
                        )
                    }) 
                    : null}
                </MapView>
                <Button onPress={this.getChatrooms} title="Get rooms" />
                <Button onPress={()=>console.log(this.state)} title="Console Log state" />
                <Text>Available Chatrooms</Text>
                {this.state.chatrooms 
                    ? Object.keys(this.state.chatrooms).map(key => {
                        const room = this.state.chatrooms[key];
                        return(
                            <View key={key}>
                                <Text>Name : {room.name}</Text>
                                <Text>Description : {room.description}</Text>
                            </View>
                        )
                    }) 
                    : <Text>No Chatrooms in your area</Text>}
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
        location : state.location,
        chatrooms : state.chatrooms,
    };
};

export default connect(mapStateToProps, {test, setChatRooms})(ChatList);
