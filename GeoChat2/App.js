import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route} from 'react-router-native';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import getEnvVars from './config'
import NavBar from './components/NavBar'
import ChatList from './screens/ChatList'
import CreateChatRoom from './screens/CreateChatRoom'
import HomeScreen from './screens/HomeScreen'
    // {console.log("Dot env file", getEnvVars("__DEV__"))}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  List: {screen: ChatList}
})

const App = createAppContainer(MainNavigator) 
  // return (
  //     <View>
  //     <Button style={styles.continueButton} title="Continue"/>
  //     <Text>Here's the homescreen</Text>
  //     </View>
  //     )





export default App;

// export default class App extends Component {
//   render() {
//     return (
//       <NativeRouter>
//         <View style={styles.container}>
//           < App1 />
//           <Route path = {"/chat-list"} ChatList />
//           <Route path = {"/create-chat-room"} CreateChatRoom />
//         </View>
//       </NativeRouter>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
