import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: 5,
        elevation: 4,
        backgroundColor: Colors.WHITE,
        padding: 5,
        borderRadius: 5,
    },
    titleText: {
        fontFamily: Fonts.SEMI_BOLD,
        fontSize: 12,
    },
    descriptionText: {
        fontFamily: Fonts.REGULAR,
        fontSize: 8,
        marginVertical: 10,
    },
    iconView: {
        backgroundColor: "#f8f8f8",
        elevation: 3,
        padding: 4,
        borderRadius: 100,
    }
})