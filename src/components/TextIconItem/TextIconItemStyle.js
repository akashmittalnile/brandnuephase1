import { StyleSheet } from "react-native";
import { Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderRadius:5,
        padding: 10,
        marginVertical: 5,
    },
    TextStyle: {
        fontFamily: Fonts.SEMI_BOLD,
        fontSize: 12,
    },

})