import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical:10,
    },
    imageTextView: {
        elevation: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        width: "92%",
        overflow: "hidden",
        backgroundColor: Colors.WHITE
    },
    imageStyle: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        borderRadius: 10
    },
    TextView: {
        width: "60%",
        marginLeft: 10
    },
    titleText: {
        fontSize: 12,
        fontFamily: Fonts.SEMI_BOLD
    },
    descriptionText: {
        fontSize: 10,
        fontFamily: Fonts.REGULAR
    },
    iconView: {
        elevation: 20,
        marginVertical: 25,
        width: "12%",
        marginLeft: -19,
        backgroundColor: Colors.WHITE,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    }
})