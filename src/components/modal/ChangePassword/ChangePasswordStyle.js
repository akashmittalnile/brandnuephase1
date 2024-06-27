import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../global";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.BLACK+'66',
    },
    blurView:{
        flex:1,
    },
    mainView:{
        backgroundColor:Colors.WHITE,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        padding:20,
    },
    modalTitle:{
        fontSize:16,
        fontFamily:Fonts.BOLD,
        textAlign:"center",
        marginBottom:15,
    }


})