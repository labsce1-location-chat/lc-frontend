import React from 'react';
import {Header, Icon, Overlay, Divider, Button} from 'react-native-elements';
import {View, Text, Modal} from 'react-native';
import {Link, withRouter} from 'react-router-native';
import {connect} from 'react-redux';
import  styles from '../../styles/NavbarStyles'
import {handleLogOut, changeScreen} from '../../Redux/actions/index';

class NavBar extends React.Component{
    state = {
        open : false,
    }

    keyValues = {
        "/chat-list" : "Choose a Chatroom",
        "/settings" : "Settings",
        "/create_chat_room" : "Create a New Chatroom"
    }

    redirect = (path, name) => {
        this.setState({open : false});
        this.props.history.push(`/${path}`)
        this.props.changeScreen({name : name})
    }

    logout = () => {
        // console.log("the props during logout", this.props)
        this.props.handleLogOut(this.props.user)
        this.props.history.push("/")
    }

    componentDidMount(){
        console.log("isTemp", this.isTemp)
    }

    // buttonStyle={
    //     width:"100%",
    // }

    render(){
        if(this.props.location.pathname === '/'){
            return null;
        }
        return(
            <View>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            onPress={()=>this.setState({open : true})} 
                            name="menu"
                            size={50}
                            title="Menu"
                            color="white"
                            backgroundColor="white"
                        />
                    }
                    centerComponent={{ 
                        // text: this.keyValues[this.props.location.pathname] ? this.keyValues[this.props.location.pathname] : "Chatting",
                        text : this.props.screen.name,
                        style: { color: '#fff' } 
                    }}
                    rightComponent={{
                        text : this.props.screen && this.props.screen.users ? this.props.screen.users.length : "",
                        style:{color : "#FFF"}
                    }}
                />

                <Modal
                    visible={this.state.open}
                    animationType="slide"
                    transparent={true}
                >
                    <View onPress={()=>this.setState({open : false})} style={styles.modalView}>
                        <Button 
                            onPress={()=> this.redirect('create_chat_room', "Create A Chatroom")} 
                            title="New Chatroom" 
                            // disabled={this.props.user.accountType === "temp"}
                            style={styles.navButtons}
                        />

                            <Button
                                title="Chats"
                                onPress={()=>this.redirect('chat-list', "Chatrooms")}
                                style={styles.navButtons}
                            />


                            <Button
                                    title={this.props.user.accountType === "temp" ? "Settings Only available for Signed in users" : "Settings"}
                                    onPress={()=>this.redirect('settings', "Settings")}
                                    disabled={this.props.user.accountType === "temp"}
                                    style={styles.navButtons}
                                />

                        <Button 
                            onPress={this.logout} 
                            title="Logout" 
                            style={styles.navButtons}
                        />

                        <Button
                            title="Close Menu"
                            onPress={()=>this.setState({open : false})}
                            style={styles.navButtons}
                        />

                    </View>

                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        test : state.test,
        chatrooms : state.chatrooms,
        user : state.user,
        screen : state.screen,
    };
};

export default connect(mapStateToProps, {handleLogOut, changeScreen})(NavBar);
