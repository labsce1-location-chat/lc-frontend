import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import {MapView} from 'expo';
import * as firebase from 'firebase';
import {test, createChatRoom} from '../Redux/actions/index';

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

    newRoom = (userId) => {
      // console.log('user id', userId)
      this.props.createChatRoom("user id")
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
                <Button onPress={this.newRoom} title="New Room" />
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
