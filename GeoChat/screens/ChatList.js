import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';

class ChatList extends React.Component{
    constructor(){
        super();
    }

    logOut() {
      console.log("logout button pressed")
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>This is the ChatList Component</Text>
                <Text>User Id: {this.props.user.uid}</Text>

                <Text>{this.props.loggedIn ? "You are logged in" : "You are logged out"}</Text>
                <Button
                  title="Log Out"
                  onPress={this.logOut} />


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
    console.log("chatlist user", state.user)
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn
        
    };
};

export default connect(mapStateToProps)(ChatList);
