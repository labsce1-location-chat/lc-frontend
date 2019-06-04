import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import InitializeFirebase from './firebaseConfig';
import * as firebase from 'firebase';
// Redux Imports
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer} from './Redux/reducers/index';
// React Router and Component Imports
import {NativeRouter, Route} from 'react-router-native';
import HomePage from './screens/HomePage';

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
  }

  render() {
    return (
      <NativeRouter>
        <Provider store={store}>
          <Route exact path="/" render={(props) => <HomePage {...props}/>} />
          <Route path="/chat-list" render={() => <View><Text>Test</Text></View>} />
        </Provider>
      </NativeRouter>
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

