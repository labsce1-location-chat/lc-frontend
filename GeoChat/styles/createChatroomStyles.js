
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "40%",
    },
  textBox: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: "95%",
    height: 75,
    marginTop: 10,
    marginBottom: 10,
  },

  normalButton : {
    marginTop: 5,
    marginBottom: 5,
    width: "95%",
  },
});

const cancelButton = {
  Button: {
    buttonStyle: {
      backgroundColor: 'red',
    }
  }

}






export {styles, cancelButton};
