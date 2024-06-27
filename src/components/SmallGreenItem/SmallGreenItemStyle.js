import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        marginVertical:3,
        marginHorizontal:5,
        flexDirection: "row",
        alignItems: "center",
        borderColor: Colors.LITEGREEN,
        borderWidth: 0.5,
        borderRadius:5,
        padding:5,
    },
    titleText: {
        color: Colors.LITEGREEN,
        fontFamily: Fonts.SEMI_BOLD,
        fontSize: 11,
        marginRight:5,
    },
    iconView: {
        backgroundColor: Colors.LITEGREEN,
        padding:1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
})