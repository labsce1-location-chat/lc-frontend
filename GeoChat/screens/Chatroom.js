import React from 'react';
import {View,  TextInput, StyleSheet} from 'react-native';
import {  Text, Button, ThemeProvider  } from 'react-native-elements';
import * as firebase from 'firebase';
import {Link} from 'react-router-native';
import styles from '../styles/ChatroomStyles'

export default class Chatroom extends React.Component{

    constructor(){
        super();
        this.state = {
            messages : [],
            newMessage : "",
            error : ''
        }
    }

    componentDidMount(){
        this.messageListener();
    }

    sendMessage = () => {
        if(this.state.newMessage.length === 0){
            this.setState({error : 'Please input a message'});
            setTimeout(()=>{this.setState({error : ""})}, 2500);
            return;
        }
        const key = firebase.database().ref('/messages/' + this.props.match.params.id).push().key;
        firebase.database().ref('/messages/' + this.props.match.params.id).child(key).update({
            content : this.state.newMessage
        });
        this.setState({newMessage : ""});
    }

    messageListener = () => {
        const loadedMessages = [];
        firebase.database().ref('messages').child(this.props.match.params.id).on('child_added', snap => {
            loadedMessages.push(snap.val())
            this.setState({messages : loadedMessages});
        })
    }


    render(){
        return(
            <View style={styles.container}>
                <Link to="/chat-list"><Text>Back to chat list</Text></Link>
                {this.state.messages ? this.state.messages.map((message, index) => 
                    <View key={index}>
                        <Text>{message.content}</Text>
                    </View>
                ) : <Text>Loading Messages... or no messages</Text>}
                
                <TextInput 
                    style={styles.input}
                    value={this.state.newMessage} 
                    onChangeText={(text) => this.setState({newMessage : text})} 
                    placeholder="Your Message" 
                />
                <Text>{this.state.error}</Text>
                <Button onPress={this.sendMessage} title="Send Message" />
            </View>
        );
    }


}

