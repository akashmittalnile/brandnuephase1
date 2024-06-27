import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK + '66',
    },
    blurView: {
        flex: 1,
    },
    mainView: {
        backgroundColor: Colors.WHITE,
        margin:10,
        padding:20,
        borderRadius:20,
    },
    ButtonView:{
        paddingHorizontal:20,
    }
})