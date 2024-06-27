import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LITEGREEN,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    textStyle: {
        color: Colors.WHITE,
        fontFamily: Fonts.SEMI_BOLD,
    },
    iconView: {
        backgroundColor: Colors.LEMONGREEN,
        borderRadius: 100,
        padding: 2,
    }
})