import React from 'react';
import {View, Text} from 'react-native';
import {MapView} from 'expo';
import {Overlay, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import TempLogo from '../../assets/TempLogo.png';
import {Link} from 'react-router-native';

class Map extends React.Component{
    constructor(){
        super();
        this.state = {
            chatroom : {

            },
            open : false,
        }
    }

    setChatroom = room => {
        this.setState({chatroom : room})
        this.setState({open : true})
    }
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
                            // removed to use default map pins
                            // Leaving it in for future image icons
                            // image={TempLogo}
                            onPress={() => this.setChatroom(room)}
                        />
                        )
                    :
                    null
                    }
                </MapView>

                <Overlay onBackdropPress={() => this.setState({ open: false })} isVisible={this.state.open}>
                    <View>
                        <Text>{this.state.chatroom.name}</Text>
                        <Text>{this.state.chatroom.description}</Text>
                        <Link to={`/chatroom/${this.state.chatroom.id}`}><Button title={`Join ${this.state.chatroom.name}`}/></Link>
                    </View>
                </Overlay>
                {/* <Overlay isVisible={this.state.open}>
                    <Text></Text>
                </Overlay> */}
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
