import React from 'react';
// Firebase Imports
import InitializeFirebase from './firebaseConfig';
// Redux Imports
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer} from './Redux/reducers/index';
// React Router and Component Imports
import {NativeRouter, Route} from 'react-router-native';
import HomePage from './screens/HomePage';
import ChatList from './screens/ChatList';

const store = createStore(
  reducer,
  applyMiddleware(thunk,logger)
)

// The goal of this component is to set up routes, the redux store, and initialize firebase
export default class App extends React.Component {

  componentDidMount(){
    InitializeFirebase();
  }

  render() {
    return (
      // Routing Component
      <NativeRouter>
        {/* Provider for the redux store */}
        <Provider store={store}>
          {/* Setting up routes here, will add more edge cases and routes later */}
          <Route exact path="/" render={(props) => <HomePage {...props}/>} />
          <Route path="/chat-list" render={() => <ChatList />} />
        </Provider>
      </NativeRouter>
    );
  }
}

