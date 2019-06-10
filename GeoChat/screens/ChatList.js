import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import * as firebase from 'firebase';
import {test, setChatRooms, createChatRoom} from '../Redux/actions/index';
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
      // this.props.createChatRoom(this.props.user.uid)
    }

    render(){
        return(
            <View style={styles.container}>
                <Button title="To Array test" onPress={this.filterChatrooms} />
                <Button onPress={()=>console.log(this.state)} title="Console Log state" />
                <Text>Join a Chat Room</Text>
                <TextInput 
                    value="Search by zipcode"
                />

                <View style={styles.viewBtns}>

                    <Text 
                        style={this.state.view === "list" ? styles.selected : styles.viewBtn } 
                        onPress={() => this.setState({view : "list"})}
                    >List
                    </Text>

                    <Text 
                        onPress={() => this.setState({view : "map"})}
                        style={this.state.view === "map" ? styles.selected : styles.viewBtn } 
                    >Map
                    </Text>
                </View>

                { this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null }
                {this.state.view === "list" 
                ?
                this.state.chatrooms 
                    ? this.state.chatrooms.map(room => 
                        <View key={room.id}>
                            <Text>{room.name}</Text>
                            <Text>{room.description}</Text>
                            <Link to="/chatroom/:id"><Text style={styles.joinBtn}>Join</Text></Link>
                        </View>
                    )
                    : 
                    <Text>No Chatrooms in your area</Text>
                :
                <Map />
                }
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
    viewBtns : {
        width:"100%",
        height:100,
        flexDirection : "row",
        justifyContent : "center",
        alignItems:"center"
    },
    viewBtn : {
        width:"50%",
        textAlign : "center"
    },
    selected : {
        width:"50%",
        borderBottomColor : "yellow",
        borderWidth: 0.5,
        textAlign : "center",
    },
    joinBtn : {
        backgroundColor : "red",
        fontSize : 20,
    }
});

const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location,
        chatrooms : state.chatrooms,
    };
};

export default connect(mapStateToProps, {test, setChatRooms, createChatRoom})(ChatList);
