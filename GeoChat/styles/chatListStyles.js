
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
        backgroundColor : "red",
        fontSize : 20,
    }

});


export default styles;