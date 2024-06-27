import { StyleSheet } from "react-native";
import { Colors } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView:{
        padding:20,
        flex:1,
        justifyContent:"flex-end",
    },
    textInputView:{
        padding:3,
        paddingHorizontal: 10,
        marginVertical:20,
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textInput:{
        width:"70%"
    },
    IconsView:{
        flexDirection: "row",
        alignItems:"center",
    },
    sendIconView:{
        backgroundColor:Colors.LEMONGREEN,
        height:40,
        width:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
        marginHorizontal:10,
    },
    chatBgImage:{
        position:"absolute",
        height:"100%",
        width:"100%",
        zIndex:-100,
        resizeMode:"cover"
    }
})