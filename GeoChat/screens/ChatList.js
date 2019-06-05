import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux';
import {handleSignOut} from '../Redux/actions/index';
import faker from 'faker'
// faker example. faker.internet.userName() <= Creates a random username
// import * as firebase from 'firebase';



class ChatList extends React.Component{
    constructor(){
        super();
    }

    logOut() {
      this.props.handleSignOut(this.props.user)
      // this tests writing data
      // firebase.database().ref("hello").set({thing: "world"})

    }


    render(){
        return(
            <View style={styles.container}>
                <Text>This is the ChatList Component</Text>
                <Text>User Id: {this.props.user.uid}</Text>

                <Text>{this.props.loggedIn ? "You are logged in" : "You are logged out"}</Text>
                <Button
                  title="Log Out"
                  disabled={this.props.loggedIn ? false: true}
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
    return {
        test : state.test,
        user : state.user,
        loggedIn : state.loggedIn,
        
    };
};

export default connect(mapStateToProps)(ChatList);
