import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 10,
    },
    ImageTextView: {
        flexDirection: "row",
        alignItems: "center",
    },
    ImageStyle: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: Colors.LITEPINK,
        margin: 10,
        resizeMode: "cover"
    },
    TextView: {
        width:"50%",
        marginLeft: 20,
        margin: 10,
    },
    profileNameText: {
        fontFamily: Fonts.SEMI_BOLD,
        marginBottom: 5,
    },
    otherTextStyle: {
        fontSize:12,
        fontFamily: Fonts.SEMI_BOLD,
        color: Colors.GREY
    },
    ButtonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    }

})