import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
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
            <View style={mapsStyles.container}>
              <MapView 
               style={{height: 400, width: 400}} 
               initialRegion={{
                 latitude: this.props.location.lat, 
                 longitude: this.props.location.lon,
                 latitudeDelta: 0.0822,
                 longitudeDelta: 0.0321,
               }}
               provider={"google"}
              >
              <Marker 
                coordinate={{latitude : this.props.location.lat, longitude: this.props.location.lon}}
                pinColor={"green"}
              />
              {this.props.chatrooms ?
                this.props.chatrooms.map(room => 
                  <Marker
                    coordinate={{latitude: room.lat, longitude: room.lon}}
                    title={room.lat}
                    description={room.description}
                    key={room.id}
                  />
                )
                  : null

              
              }

              </MapView>
            </View>
        );
    }
}

const mapsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }


})

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
