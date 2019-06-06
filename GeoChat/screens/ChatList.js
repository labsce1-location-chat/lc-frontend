import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import {MapView} from 'expo';
import {test, createChatRoom} from '../Redux/actions/index';
import {NativeRouter, Route, Link} from 'react-router-native';

class ChatList extends React.Component{
    constructor(){
        super();
    }

    initMap = location => {

    }

    filterChatrooms = () => {
        console.log(this.props)
        // const ref = firebase.database().ref('chatrooms');
        // ref.startAt(this.props.location.lat - 10).endAt(this.props.location.lat + 10).once('value').then(snap => {
        //     console.log(snap.val())
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        this.props.test();
    }

    newRoom = () => {
      // this.props.history.push("/create_chat_room")
      console.log('user id', this.props.history.push("/create_chat_room"))
      // this.props.createChatRoom(this.props.user.uid)
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
                />
                </MapView>
                <Button onPress={this.filterChatrooms} title="filter rooms" />
                <Link
                  to={"/create_chat_room"}
                  >
                    <Text>New Room</Text>
                 </Link>
                {/* new chatroom button should go to the chat room screen*/}
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

export default connect(mapStateToProps, {test, createChatRoom})(ChatList);
