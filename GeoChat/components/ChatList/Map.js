import React from 'react';
import {View, Text} from 'react-native';
import {MapView, Overlay} from 'expo';
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
                            onPress={() => {this.setState({chatroom : room})}}
                        />
                        )
                    :
                    null
                    }
                </MapView>
                {this.state.chatroom 
                ?
                    <View style={{flex : 1, justifyContent:"center", alignItems:"center", width:"100%"}}>
                        <Text>Chatroom Details</Text>
                        <Text>{this.state.chatroom.name}</Text>
                        <Text>{this.state.chatroom.description}</Text>
                        <Link to={`/chatroom/${this.state.chatroom.id}`}><Text>Join {this.state.chatroom.name}</Text></Link>
                    </View>
                :
                    null
                }
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