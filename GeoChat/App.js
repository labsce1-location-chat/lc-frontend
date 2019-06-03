import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { API_KEY } from 'react-native-dotenv'
import * as firebase from 'firebase'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Adding firebase</Text>
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
