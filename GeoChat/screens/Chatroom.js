import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'
import {View,  TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, ActivityIndicator, Image} from 'react-native';
import {  Text, Button, ThemeProvider, ListItem, Input, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from '../styles/ChatroomStyles'
import {connect} from 'react-redux';
import moment from 'moment';
import CustomLoad from '../assets/TempLogo.gif'
import {ImagePicker, Constants, Permissions} from 'expo';
import {withRouter} from 'react-router-native';

class Chatroom extends React.Component{

    constructor(){
        super();
        this.state = {
            chatroom : {},
            messages : [],
            newMessage : "",
            error : '',
            typing : false,
            uploadingImage : false,
        }
    }

    componentDidMount(){
        this.getChatroomDetails();
        this.messageListener();
        this.chattingListener();
        this.typingOffListener();
    }

    sendMessage = () => {
        Keyboard.dismiss();
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
            loadedMessages.push(snap.val());
            this.setState({messages : loadedMessages})
            setTimeout(()=>this.scrollToBottom(), 0);
            // this.scrollToBottom()
        })
        // setTimeout(()=>this.scrollToBottom(), 0);
    }

    componentDidUpdate(){
        this.scrollToBottom();
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

    scrollToBottom() {
        this.scrollView.scrollToEnd();
    }

    getPermission = async() => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    pickImage = async () => {
        this.getPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            base64 : true,
            quality : 0.1,
            allowsEditing : true
        });
    
        // console.log("RESULT",result);
    
        if (!result.cancelled) {
            this.uploadImage(result.base64)
        }
    };

    uploadImage = async base => {
        this.setState({uploadingImage : true})
        console.log("BASE : ", base)
        await fetch('https://geochat-node-backend.herokuapp.com/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: base,
            }),
        }).then(async res => {
            // console.log(res);
            let parsed = await JSON.parse(res._bodyText);
            // console.log("parsed", parsed);
            console.log(parsed.url)
            const key = firebase.database().ref('/messages/' + this.props.match.params.id).push().key;
            firebase.database().ref('/messages/' + this.props.match.params.id).child(key).update({
                image : parsed.url,
                timestamp : Date.now(),
                user : {
                    avatar : this.props.user.avatar,
                    userName : this.props.user.userName
                }
            });
        })
        .catch(err => {
            console.log(err)
        })
        this.setState({uploadingImage : false})
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{flexDirection : "row", width : "100%", justifyContent : "space-between"}}>
                    <Text>{this.state.chatroom ? this.state.chatroom.name : "Loading..."}</Text>
                    <Text>{this.state.chatroom ? this.state.chatroom.description : "Loading..."}</Text>
                    <Button title="Scroll To Most Recent" onPress={()=>this.scrollToBottom()} />
                </View>
                {/* <Button onPress={this.scrollToBottom} title="scroll to bottom" /> */}
                <ScrollView style={{height: "90%"}} ref={(scrollView) => { this.scrollView = scrollView }}>
                    <View style={{ flexGrow: 1 }}>
                            <GiftedChat
                              message={this.state.messages}
                            />
                        {/*this.state.messages.length ? this.state.messages.map((message, i) => 
                            <GiftedChat
                              message={message.content}
                            />
                        ) : <ActivityIndicator size="large" />i */}
                    </View>
                </ScrollView>

                <Text>{this.state.typing ? `Someone is typing` : ""}</Text>
                <Input
                    style={styles.input}
                    placeholder='Your Message'
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => this.handleChange(text)} 
                    value={this.state.newMessage} 
                    rightIcon={<Icon type="font-awesome" name="upload" onPress={this.pickImage}/>}
                />
                <Text>{this.state.error}</Text>
                <Button 
                    onPress={this.sendMessage} 
                    title={this.state.uploadingImage 
                        ? "Uploading Image..."
                        : "Send Message"} 
                    disabled={this.state.uploadingImage}
                />
            </KeyboardAvoidingView>
        );
    }


}



const mapStateToProps = state => {
    console.log("user info: ", state.user)
    return {
        user : state.user,
        loggedIn : state.loggedIn,
        location : state.location,
        chatrooms : state.chatrooms,
    };
};

export default connect(mapStateToProps)(withRouter(Chatroom));

