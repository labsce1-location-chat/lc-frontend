import React from 'react';
import {Header, Icon, Overlay, Divider, Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import {Link, withRouter} from 'react-router-native';


class NavBar extends React.Component{
    state = {
        open : false,
    }

    redirect = path => {
        this.setState({open : false});
        this.props.history.push(`/${path}`)
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
                    <View onPress={()=>this.setState({open : false})}>
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
                    </View>

                </Overlay>
            </View>
        )
    }
}

export default withRouter(NavBar);