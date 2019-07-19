import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navButtons: {
    marginTop: 5,
    marginLeft: "2.5%",
    width: "95%",
    padding: 5,


  },

  modalView: {
    justifyContent: "center",
    // alignItems: "center",
    width: "70%",
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: "100%",

  },

  closeMenu: {
  //added this to change the style of the close menu button.
    color: "red",
    marginTop: 5,
    marginLeft: "2.5%",
    width: "95%",
    padding: 5,
  }


})


export default styles
