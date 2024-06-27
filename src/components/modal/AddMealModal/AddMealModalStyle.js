import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK + '66',
    },
    blurView: {
        flex: 1,
    },
    mainView: {
        backgroundColor: Colors.WHITE,
        padding:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    titleStyle:{
        fontFamily:Fonts.SEMI_BOLD,
        marginVertical:5,
        marginBottom:10,
    },
    RadioButtonView:{
        borderWidth:0.5,
        marginVertical:5,
        flexDirection:"row",
        alignItems:"center",
        padding:10,
    },
    outerCircleView:{
        borderWidth:1,
        height:30,
        width:30,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
    },
    ItemText:{
        marginLeft:10,

    },
    innerCircleView:{
        height:20,
        width:20,
        borderRadius:100,
        backgroundColor:Colors.ORANGE,
    },
    ButtonView:{
        backgroundColor:Colors.LITEGREEN,
        padding:15,
        borderRadius:5,
    },
    ButtonText:{
        color:Colors.WHITE,
        fontFamily:Fonts.SEMI_BOLD,
        textAlign:"center",
    }
})      

