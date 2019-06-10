import React from 'react';
import {View} from 'react-native';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import TempLogo from '../../assets/TempLogo.png'

class Map extends React.Component{
    render(){
        return(
            <View>
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
                    {this.props.chatrooms
                    ?
                    this.props.chatrooms.map(room => 
                        <MapView.Marker
                            description={room.description} 
                            title={room.name} 
                            coordinate={{latitude : room.lat, longitude: room.lon}}
                            key={room.id}
                            image={TempLogo}
                        />
                        )
                    :
                    null
                    }
                </MapView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location,
        chatrooms : state.chatrooms,
    };
};

export default connect(mapStateToProps)(Map);