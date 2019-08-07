import React from 'react';
import {  View, TextInput, ActivityIndicator, ScrollView, Alert } from 'react-native';
import {  Text, Button, ThemeProvider, ButtonGroup, ListItem, Slider } from 'react-native-elements';
import styles from '../styles/chatListStyles'
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import * as firebase from 'firebase';

import {test, setChatRooms, createChatRoom, handleLogOut, updateUserChatroom, updateChatlist, changeScreen} from '../Redux/actions/index';


import Map from '../components/ChatList/Map'
import {NativeRouter, Route, Link} from 'react-router-native';

class ChatList extends React.Component{
    constructor(){
        super();
        this.state = {
            view : "list",
            loading : true,
            distanceFilter : 10,
            filteredRooms : [],
            filtering : false,
            noResults : false,
        }
    }

    getChatrooms = () => {
        this.props.setChatRooms(true, this.props.location);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.chatrooms !== this.props.chatrooms && !this.props.chatrooms.length){
            this.setState({noResults : true})
        }
    }

    filterChatrooms = () => {
        this.setState({filtering : true, noResults : false})
        let copy;
        firebase.database().ref('chatrooms').once('value').then(snap => {
            copy = Object.values(snap.val());
            const final = copy.filter(room => {
                if(this.distance(room.lat, room.lon, this.props.location.lat, this.props.location.lon) < this.state.distanceFilter){
                    return room
                }
            })
            console.log(final)
            this.setState({filtering : false})
            if(final.length === 0){
                this.setState({noResults : true});
            }
            this.props.updateChatlist(final);
        }).catch(err => {
            Alert.alert("Error getting the chatrooms")
        })
    }

    componentDidMount(){
        this.getChatrooms();
    }

    newRoom = () => {
        this.props.history.push('/create_chat_room')
    }

    goToRoom = (roomID, roomName) => {
        this.props.history.push(`/chatroom/${roomID}`)
        this.props.changeScreen({name : roomName})
        this.props.updateUserChatroom(roomID, this.props.user.id)
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
            // return dist < 10 ? Math.round(100*dist)/100 : Math.floor(dist);
            // I think this is a more useful metric. This is conversational.
            return dist <= 1 ? "less than 1" : Math.floor(dist);
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
                <ButtonGroup 
                    buttons={[{element : this.btn2}, {element : this.btn1}]}
                    selectedIndex={this.state.view === "list" ? 0 : 1}
                />
                <Text>{this.state.distanceFilter} miles</Text>
                <Slider 
                    maximumValue={10} 
                    minimumValue={1} 
                    step={1} 
                    value={this.state.distanceFilter} 
                    onValueChange={value => this.setState({distanceFilter : value})}
                    style={{width : "80%"}}
                    onSlidingComplete={this.filterChatrooms}
                />

                <ScrollView style={styles.scrollWindow}>
                {!this.props.chatrooms.length 
                    ? this.state.noResults && !this.state.filtering 
                        ? <View style={{width: "100%", justifyContent:"center", alignItems:"center"}}><Text>No Results</Text></View> 
                        : this.state.filtering ? null :<ActivityIndicator size="large" color="#0000ff" /> 
                    : null
                }
                {this.state.view === "list" 
                ?
                this.props.chatrooms 
                    ? 
                    this.state.filtering ?
                        <View>
                            <ActivityIndicator size="large" color="red" />
                            <Text>Filtering Chatrooms</Text>
                        </View>
                        :
                        this.props.chatrooms.map(room => 
                            {
                            return <View  style={styles.listAndButton}key={room.id}>
                            <ListItem 
                                            style={styles.listStylesContainer}
                                            key={room.id}
                                            leftIcon={{name: "chat"}}
                                            title={room.name}
                                            titleStyle={styles.titleStyle}
                                            rightTitle={`${this.distance(this.props.location.lat,this.props.location.lon, room.lat, room.lon)}  Miles`}
                                            rightTitleStyle={styles.distanceTextStyle}
                                            containerStyle={{width:300}}
                                            bottomDivider={true}
                                            topDivider={true}
                                    />
                                    <Button style={styles.joinBtn} onPress={() => this.goToRoom(room.id, room.name)} title="Join" />
                                    </View>
                            }
                        )
                    : 
                    <Text style={{width: "100%"}}>No Chatrooms in your area</Text>
                :
                <Map />
                }
                </ScrollView>

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

export default connect(mapStateToProps, {test, setChatRooms, createChatRoom,handleLogOut, updateUserChatroom, updateChatlist, changeScreen})(ChatList);
