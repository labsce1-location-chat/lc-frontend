import React from 'react';
import {View,  TextInput, StyleSheet, ScrollView} from 'react-native';
import {  Text, Button, ThemeProvider, ListItem, Input  } from 'react-native-elements';
import * as firebase from 'firebase';
import {Link} from 'react-router-native';
import styles from '../styles/ChatroomStyles'
import {connect} from 'react-redux';
import moment from 'moment'


class Chatroom extends React.Component{

    constructor(){
        super();
        this.state = {
            chatroom : {},
            messages : [],
            newMessage : "",
            error : '',
            typing : false,
        }
    }

    componentDidMount(){
        this.getChatroomDetails();
        this.messageListener();
        this.chattingListener();
        this.typingOffListener();
        }

    sendMessage = () => {
        if(this.state.newMessage.length === 0){
            this.setState({error : 'Please input a message'});
            setTimeout(()=>{this.setState({error : ""})}, 2500);
            return;
        }
        const key = firebase.database().ref('/messages/' + this.props.match.params.id).push().key;
        firebase.database().ref('/messages/' + this.props.match.params.id).child(key).update({
            content : this.state.newMessage,
            timestamp : Date.now(),
            user : {
                avatar : this.props.user.avatar,
                userName : this.props.user.userName
            }
        });
        this.setState({newMessage : ""});
        firebase.database().ref('/typing/'+ this.props.match.params.id).child("Drew Johnson").remove();
    }

    messageListener = () => {
        const loadedMessages = [];
        firebase.database().ref('messages').child(this.props.match.params.id).on('child_added', snap => {
            loadedMessages.push(snap.val())
            this.setState({messages : loadedMessages});
        })
    }

    chattingListener = () => {
        firebase.database().ref('/typing/' + this.props.match.params.id).on('child_added', snap=>{
            console.log("Someone is typing");
            this.setState({ typing : true })
        })
    }

    typingOffListener = () => {
        firebase.database().ref('/typing/' + this.props.match.params.id).on('child_removed', snap=>{
            console.log("Someone is not typing");
            this.setState({typing : false})
        })
    }

    componentWillUnmount(){
        firebase.database().ref('/typing/'+ this.props.match.params.id).child("Drew Johnson").remove();
        firebase.database().ref('messages').child(this.props.match.params.id).off()
        firebase.database().ref('/typing/' + this.props.match.params.id).off();
    }

    getChatroomDetails = () => {
        firebase.database().ref('/chatrooms/' + this.props.match.params.id).once('value').then(snap => {
            console.log("Get chatroom details snap", snap.val());
            this.setState({chatroom : snap.val()});
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChange = text => {
        this.setState({newMessage : text});
        const key = "Drew Johnson";

        if(text.length > 0){
            firebase.database().ref('/typing/' + this.props.match.params.id).child(key).set(true)
        }

        else if(text.length === 0){
            firebase.database().ref('/typing/'+ this.props.match.params.id).child(key).remove();
        }
    }

    timeFromNow = (timestamp) => {
        return moment(timestamp).fromNow()
    }

    render(){
        return(
            <View style={styles.container}>
                <Link to="/chat-list"><Text>Back to chat list</Text></Link>
                <Text>{this.state.chatroom ? this.state.chatroom.name : "Loading..."}</Text>
                <Text>{this.state.chatroom ? this.state.chatroom.description : "Loading..."}</Text>
                <ScrollView style={{height: "90%"}}>
                    {this.state.messages ? this.state.messages.map((message, i) => 
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: message.user.avatar } }}
                            title={message.user.userName}
                            subtitle={message.content}
                            rightTitle={this.timeFromNow(message.timestamp)}
                        />
                    ) : <Text>Loading Messages... or no messages</Text>}
                </ScrollView>
                <Text>{this.state.typing ? `Someone is typing` : ""}</Text>
                {/* <TextInput 
                    style={styles.input}
                    value={this.state.newMessage} 
                    onChangeText={(text) => this.handleChange(text)} 
                    placeholder="Your Message" 
                /> */}
                <Input
                    style={styles.input}
                    placeholder='Your Message'
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => this.handleChange(text)} 
                    value={this.state.newMessage} 
                />
                <Text>{this.state.error}</Text>
                <Button onPress={this.sendMessage} title="Send Message" />
            </View>
        );
    }


}



const mapStateToProps = state => {
    return {
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location,
        chatrooms : state.chatrooms,
    };
};

export default connect(mapStateToProps)(Chatroom);

