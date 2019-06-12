import React from 'react';
import {  View, TextInput, ActivityIndicator } from 'react-native';
import {  Text, Button, ThemeProvider  } from 'react-native-elements';
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
            chatrooms : [],
            loading : true,
            view : "list"
        }
    }

    getChatrooms = () => {
        this.setState({loading : true})
        console.log(this.props)
        const ref = firebase.database().ref('chatrooms');
        ref.once('value').then(snap => {
            this.props.setChatRooms(Object.values(snap.val()))
            this.setState({ chatrooms : Object.values(snap.val()) })
            console.log("Changed state boii", console.log(this.state.chatrooms))
            this.setState({loading : false});
        })
        .catch(err => {
            console.log(err);
        })
        // this.props.test();
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

    render(){
        return(
            <View style={styles.container}>
                <Button title="To Array test" onPress={this.filterChatrooms} />
                <Button onPress={()=>console.log(this.state)} title="Console Log state" />
                <Text h3>Join a Chat Room</Text>
                <TextInput 
                    value="Search by zipcode"
                />
                <Text>{this.props.user.userName}</Text>

                <View style={styles.viewBtns}>


                    <Button
                      onPress={() => this.setState({view : "map"})}
                      style={this.state.view === "map" ? styles.selected : styles.viewBtn } 
                      title="Map View"
                    />
                    <Button
                      onPress={() => this.setState({view : "list"})}
                      style={this.state.view === "list" ? styles.selected : styles.viewBtn } 
                      title="List View"
                    />
                </View>

                { this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null }
                {this.state.view === "list" 
                ?
                this.state.chatrooms 
                    ? this.state.chatrooms.map(room => 
                        <View key={room.id}>
                            <Text>{room.name}</Text>
                            <Text>{room.description}</Text>
                            <Link to={`/chatroom/${room.id}`}><Text style={styles.joinBtn}>Join</Text></Link>
                        </View>
                    )
                    : 
                    <Text>No Chatrooms in your area</Text>
                :
                <Map />
                }
                <Button onPress={this.filterChatrooms} title="filter rooms" />
                <Button onPress={this.newRoom} title="New Chatroom" />
                <Button onPress={this.logout} title="Logout" />

            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("state from chatlist ", state)
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location,
        chatrooms : state.chatrooms,
    };
};

export default connect(mapStateToProps, {test, setChatRooms, createChatRoom,handleLogOut})(ChatList);
