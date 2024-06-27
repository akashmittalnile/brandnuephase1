import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    TitleText:{
        fontFamily:Fonts.SEMI_BOLD,
    },
    TextInputView:{
        flexDirection: "row",
        justifyContent: "space-between",
        height:40,
    },
    TextInputStyle:{
        width: "48%",
        height:40,
        borderWidth: 0.5,
        marginVertical: 5,
        borderColor: Colors.GREY,
        fontFamily: Fonts.SEMI_BOLD,
        paddingLeft: 10,
        borderRadius: 5,
    },
    AMPMView:{
        flexDirection:"row",
        marginVertical:10,
    },
    AMPMItemView:{
        padding:10,
        height:40,
        marginHorizontal:3,
    },
    AMPMTextStyle:{

    },
    buttonView:{
        backgroundColor:Colors.LITEGREEN,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        padding:5,
        borderRadius:5,
    },
    buttonText:{
color:Colors.WHITE,
    },
})