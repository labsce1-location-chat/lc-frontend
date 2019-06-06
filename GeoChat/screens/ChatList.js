import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png';
import * as firebase from 'firebase';
import {test, setChatRooms} from '../Redux/actions/index';
import Map from '../components/ChatList/Map'

class ChatList extends React.Component{
    constructor(){
        super();
        this.state = {
            chatrooms : [],
            loading : true,
            view : "list"
        }
    }

    initMap = location => {

    }

    getChatrooms = () => {
        this.setState({loading : true})
        console.log(this.props)
        const ref = firebase.database().ref('chatrooms');
        ref.once('value').then(snap => {
            this.props.setChatRooms(snap.val())
            this.setState({ chatrooms : snap.val() })
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
                    ? Object.keys(this.state.chatrooms).map(key => {
                        const room = this.state.chatrooms[key];
                        return(
                            <View key={key}>
                                <Text>Name : {room.name}</Text>
                                <Text>Description : {room.description}</Text>
                            </View>
                        )
                    }) 
                    : 
                    <Text>No Chatrooms in your area</Text>
                :
                <Map />
                }
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

export default connect(mapStateToProps, {test, setChatRooms})(ChatList);
