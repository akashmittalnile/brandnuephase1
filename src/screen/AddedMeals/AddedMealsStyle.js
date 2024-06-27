import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        padding: 20,
    },
    dateSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 10,
        elevation: 4,
        backgroundColor: Colors.WHITE,
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: Colors.LITEGREEN,
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.WHITE,
        fontFamily: Fonts.SEMI_BOLD,
        textAlign: "center",
    },
    FABbuttonStyle: {
        bottom:30,
        position:"absolute",
        right:30,
        height:50,
        width:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
        backgroundColor: Colors.ORANGE,
    }
})