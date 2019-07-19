
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewBtns : {
        width:"100%",
        height:100,
        flexDirection : "column",
        justifyContent : "center",
        alignItems:"center"
    },
    viewBtn : {
        width:"50%",
        textAlign : "center"
    },
    selected : {
        width:"50%",
        borderBottomColor : "yellow",
        borderWidth: 0.5,
        textAlign : "center",
    },

    joinBtn : {
        color : "blue",
        fontSize : 20,
        width: "100%"
    },

  listText: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },

    textView: {
      display: "flex",
    },

    listStylesContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },

    scrollWindow : {
      width: "100%",
      borderWidth: 3,
    },

    titleStyle: {
    },

  distanceTextStyle : {
    fontSize: 11,
  }
});


export default styles;
