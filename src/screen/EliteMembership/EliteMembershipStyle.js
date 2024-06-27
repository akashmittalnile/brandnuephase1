import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        padding: 20,
    },
    registrationCard: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
    },
    registrationBody: {
        padding: 20,
    },
    buttonView: {
        padding: 20,
    },
    DropDownView:{
        marginVertical:5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderWidth:0.5,
        borderRadius:5,
        height:40,
        paddingHorizontal:10,
        padding:5,
    },
    dropDownText:{
        fontFamily:Fonts.REGULAR,
        color:Colors.GREY
    }
})