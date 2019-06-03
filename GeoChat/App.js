import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { API_KEY } from 'react-native-dotenv'
import InitializeFirebase from './firebaseConfig';
import * as firebase from 'firebase'

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      coords : '',
    }
  }

  componentDidMount(){
    InitializeFirebase();
    this.getUsersCoords()
  }

  getUsersCoords = () => {
    if(navigator.geolocation){
      // console.log(navigator.geolocation.getCurrentPosition())
      navigator.geolocation.getCurrentPosition(this.parseCoords)
    }else{
      this.setState({coords : "could not find coords"})
    }
  }

  parseCoords = position => {
    this.setState({coords : `${position.coords.latitude} + ${position.coords.longitude}`})
    console.log(position.coords.latitude, position.coords.longitude)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Adding firebase</Text>
        <Text>{this.state.coords}</Text>
      </View>
    );
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
