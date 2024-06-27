import { StyleSheet } from "react-native";
import { Colors, Constant, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainView: {
        padding: 20,
    },
    ImageView:{
        width:Constant.windowWidth-40,
        marginVertical:10,
        height:200,
    },
    imageStyle: {
        height: "100%",
        width:"100%",
        resizeMode:"cover",
        borderRadius: 10,
    },
    titleText: {
        fontFamily: Fonts.SEMI_BOLD,
        marginVertical: 5,
        fontSize: 12,
    },
    descriptionText: {
        fontFamily: Fonts.REGULAR,
        fontSize: 10,
        marginVertical: 5,
    },
   



})