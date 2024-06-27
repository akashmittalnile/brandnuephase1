import { StyleSheet } from "react-native";
import { Colors } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        padding: 20,
    },
    myViewStyle:{
        borderRadius:10,
        backgroundColor:Colors.WHITE,
    },
    FABButtonStyle: {
        position: 'absolute',
        borderRadius: 100,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.ORANGE,
        bottom: 20,
        right: 20,
    }
})