import { StyleSheet } from "react-native";
import { Colors } from "../../../global";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK + '66',
    },
    blurView: {
        flex: 1,
    },
    childContainer: {
        backgroundColor: Colors.WHITE,
        margin:20,
        borderRadius:20,
        padding:20,
    },
    headerContainer: {

    },
    modalTitle:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:5,
    },
    TextInputTitle:{
        marginBottom:10,
        textAlign:"center",
    },
    TextInputView:{
        borderRadius:5,
        marginBottom:20,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingLeft:10,
    },
    textInput:{
        borderWidth:1,
        borderColor:Colors.LITEGREEN,
        textAlign:"center",
        width:"15%",
        margin:5,
        height:40,
    }
});