import React from 'react';
import {Header, Icon, Overlay, Divider, Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import {Link, withRouter} from 'react-router-native';
import {connect} from 'react-redux';
import {handleLogOut} from '../../Redux/actions/index';

class NavBar extends React.Component{
    state = {
        open : false,
    }

    redirect = path => {
        this.setState({open : false});
        this.props.history.push(`/${path}`)
    }

    logout = () => {
        console.log("the props during logout", this.props)
        this.props.handleLogOut()
        this.props.history.push("/")
    }

    render(){
        if(this.props.location.pathname === '/'){
            return null;
        }
        return(
            <View>
                <Header
                    placement="left"
                    leftComponent={
                        <Icon 
                            onPress={()=>this.setState({open : true})} 
                            name="menu"
                            size={50}
                        />
                    }
                    centerComponent={{ text: 'GeoChat', style: { color: '#fff' } }}
                />

                <Overlay
                    isVisible={this.state.open}
                    onBackdropPress={() => this.setState({ open: false })}
                >
                    <View onPress={()=>this.setState({open : false})} style={{justifyContent : "space-between"}}>
                        <Link to="/chat-list">
                            <Button
                                icon={
                                    <Icon
                                    name="list"
                                    size={15}
                                    color="white"
                                    />
                                }
                                title="Chat List"
                                onPress={()=>this.redirect('chat-list')}
                            />
                        </Link>

                        <Divider/>

                        <Link to="/">
                            <Button
                                icon={
                                    <Icon
                                    name="home"
                                    size={15}
                                    color="white"
                                    />
                                }
                                title="Home"
                                onPress={()=>this.redirect('')}
                            />
                        </Link>

                        <Divider/>

                        <Link to="/settings">
                            <Button
                                    icon={
                                        <Icon
                                        name="settings"
                                        size={15}
                                        color="white"
                                        />
                                    }
                                    title="Settings"
                                    onPress={()=>this.redirect('settings')}
                                />
                        </Link>

                        <Button 
                            icon={
                                <Icon
                                name="report"
                                size={20}
                                color="red"
                                />
                            }
                            onPress={this.logout} 
                            title="Logout" 
                        />
                        <Button 
                            icon={
                                <Icon
                                name="add"
                                size={15}
                                color="white"
                                />
                            }
                            onPress={()=> this.redirect('create_chat_room')} 
                            title="New Chatroom" 
                        />
                    </View>

                </Overlay>
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

export default connect(mapStateToProps, {handleLogOut})(withRouter(NavBar));
