
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
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
        width: "75%"
    },

  listText: {
    marginTop: 5,
    marginBottom: 5,

  },

    textView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "90%",
    },

    listStylesContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      paddingLeft: "2%",
      paddingRight: "2%",
    },
});


export default styles;
