import React from 'react';
import {  View, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import {  Text, Button, ThemeProvider, ButtonGroup, ListItem } from 'react-native-elements';
import styles from '../styles/chatListStyles'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import * as firebase from 'firebase';

import {test, setChatRooms, createChatRoom, handleLogOut} from '../Redux/actions/index';


import Map from '../components/ChatList/Map'
import {NativeRouter, Route, Link} from 'react-router-native';

class ChatList extends React.Component{
    constructor(){
        super();
        this.state = {
            view : "list"
        }
    }

    getChatrooms = () => {
        this.props.setChatRooms()
    }

    filterChatrooms = () => {
      console.log(Object.values(this.state.chatrooms))
    }

    componentDidMount(){
        this.getChatrooms();
    }

    newRoom = () => {
      // this.props.history.push("/create_chat_room")
        console.log('user id', this.props.history.push("/create_chat_room"))
        this.props.history.push('/create_chat_room')
      // this.props.createChatRoom(this.props.user.uid)
    }

    logout = () => {
        console.log("the props during logout", this.props)
        this.props.handleLogOut()
        this.props.history.push("/")
    }

    distance(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            return dist < 10 ? Math.round(100*dist)/100 : Math.floor(dist);
        }
    }

    btn1 = () => <Text
        onPress={() => this.setState({view : "map"})} 
    >Map View</Text>

    btn2 = () => <Text
        onPress={() => this.setState({view : "list"})} 
    >List View</Text>

    render(){
        return(
            <View style={styles.container}>
                <Text h3>Join a Chat Room</Text>
                <TextInput 
                    value="Search by zipcode"
                />
                <Text>{this.props.user.userName}</Text>

                <ButtonGroup 
                    buttons={[{element : this.btn2}, {element : this.btn1}]}
                    selectedIndex={this.state.view === "list" ? 0 : 1}
                />

                { this.props.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null }
                <ScrollView>
                {this.state.view === "list" 
                ?
                this.props.chatrooms 
                    ? this.props.chatrooms.map(room => 
                        <ListItem 
                            key={room.id}
                            leftIcon={{name: "chat"}}
                            title={room.name}
                            subtitle={room.description}
                            rightTitle={`${this.distance(this.props.location.lat,this.props.location.lon, room.lat, room.lon)} Miles`}
                            rightSubtitle={<Link to={`/chatroom/${room.id}`}><Text style={styles.joinBtn}>Join</Text></Link>}
                            containerStyle={{width:300}}
                            bottomDivider={true}
                            topDivider={true}
                        />
                    )
                    : 
                    <Text>No Chatrooms in your area</Text>
                :
                <Map />
                }
                </ScrollView>
                <Button onPress={this.filterChatrooms} title="filter rooms" />
                <Button onPress={this.newRoom} title="New Chatroom" />
                <Button onPress={this.logout} title="Logout" />

            </View>
        )
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

export default connect(mapStateToProps, {test, setChatRooms, createChatRoom,handleLogOut})(ChatList);
