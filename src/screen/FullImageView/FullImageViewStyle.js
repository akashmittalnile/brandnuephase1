import { StyleSheet } from "react-native";
import { Colors, Constant } from "../../global";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        // backgroundColor:Colors.LEMONGREEN,
        padding: 20
    },
    headerStyle: {
        // position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        right: 0, left: 0, height: 50,
        elevation: 4,
        alignItems:"center",
        paddingHorizontal:10,
        backgroundColor: Colors.WHITE
    },
    imageStyle: {
        width: Constant.windowWidth,
        height: 500,
    }
})