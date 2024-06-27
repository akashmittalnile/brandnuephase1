import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    ButtonView: {
        marginVertical: 10,
        padding: 15,
        borderRadius:5,
    },
    ButtonText: {
        textAlign: "center",
        fontFamily: Fonts.SEMI_BOLD,
        color: Colors.WHITE,
    }
})