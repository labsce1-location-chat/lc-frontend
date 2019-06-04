import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid } from 'react-native';
import {connect} from 'react-redux';
import TempLogo from '../assets/TempLogo.png'

class ChatList extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <View style={styles.container}>
                <ToolbarAndroid 
                    logo={TempLogo}
                    title="test toolbar"
                    actions={[{title : "Profile", showAlways : true}, {title : "Logout", showAlways : true}]}
                />
                <Text>This is the ChatList Component</Text>
                <Text>User Id: {this.props.user.uid}</Text>
                <Text>{this.props.loggedIn ? "You are logged in" : "You are logged out"}</Text>
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
});

const mapStateToProps = state => {
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn
    };
};

export default connect(mapStateToProps)(ChatList);