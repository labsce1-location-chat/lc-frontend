
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
        width: "50%",
        marginLeft: "25%",
        marginTop: 7,
        marginBottom: 7,
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
      alignItems: "center",
    },

    listAndButton: {

    },

    scrollWindow : {
      width: "100%",
    },

    titleStyle: {
      fontSize: 22,
    },

  distanceTextStyle : {
    fontSize: 11,
  }
});


export default styles;
