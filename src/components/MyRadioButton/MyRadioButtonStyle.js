import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    radioTextView:{
        marginVertical:10,
        flexDirection:"row",
    },
    radioItemView:{
        flexDirection:"row",
        alignItems:"center",
    },
    radioOuterCircle:{
        borderWidth:0.5,
        height:25,
        width:25,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
        marginRight:5,
    },
    radioInnerCircle:{
        height:15,
        width:15,
        borderRadius:100,
        backgroundColor:Colors.ORANGE,
    },
    radioText:{
        marginRight:10,
        fontFamily:Fonts.SEMI_BOLD,
        fontSize:12,
    },
})