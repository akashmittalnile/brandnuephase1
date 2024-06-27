import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mainView:{
        flex:1,
        padding:20,
        justifyContent:"center",
        alignItems:"center",
    },
    imageStyle:{
        resizeMode:"contain",
        paddingHorizontal:50,
        height:"50%",
    },
    primaryText:{
        fontFamily:Fonts.SEMI_BOLD,
        marginVertical:20,
        fontSize:16,
    },
    secondaryText:{
        fontFamily:Fonts.REGULAR,
        fontSize:12,
        marginVertical:10,
        color:Colors.GREY,
    },
    buttonStyles:{
        backgroundColor:Colors.LITEGREEN,
        padding:15,
        paddingHorizontal:50,
        borderRadius:100,
    },
    buttonText:{
        color:Colors.WHITE,
        fontFamily:Fonts.SEMI_BOLD,
    }
})