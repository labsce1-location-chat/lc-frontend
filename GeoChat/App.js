import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { API_KEY } from 'react-native-dotenv'
import InitializeFirebase from './firebaseConfig';
// import * as firebase from 'firebase';
// Redux Imports
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer} from './Redux/reducers/index';
import Test from './components/test';

const store = createStore(
  reducer,
  applyMiddleware(thunk,logger)
)

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
      // gets users current coordinates and passes it to parse coords
      navigator.geolocation.getCurrentPosition(this.parseCoords)
    }else{
      this.setState({coords : "Please allow this app to use your location"})
    }
  }

  parseCoords = position => {
    this.setState({coords : `${position.coords.latitude} + ${position.coords.longitude}`})
    console.log(position.coords.latitude, position.coords.longitude)
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Welcome To GeoChat</Text>
          <Text>{this.state.coords ? this.state.coords : "Loading Coordinates..."}</Text>
          <Button 
            onPress={this.getUsersCoords} 
            disabled={this.state.coords.length ? false : true} 
            title="Continue Anonymously" 
          />
          <Text>{this.props.test}</Text>
          <Test />
        </View>
      </Provider>
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

// const mapStateToProps = state => {
//   return {
//     test : state.test
//   };
// };

// export default connect(mapStateToProps)(App);

