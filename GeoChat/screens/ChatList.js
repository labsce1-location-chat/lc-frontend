import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import {MapView} from 'expo';

class ChatList extends React.Component{
    constructor(){
        super();
    }

    initMap = location => {

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
                  coordinate={{latitude : this.props.location.lat - 1, longitude: this.props.location.lon - 1}}
                  title="Not you"
                  description="A ways away from you"
                />
                <MapView.Marker 
                    coordinate={{latitude : this.props.location.lat, longitude: this.props.location.lon}}
                    title="Current Location"
                    description="Your current location"
                />
                </MapView>
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

export default connect(mapStateToProps)(ChatList);
