import { StyleSheet } from "react-native";
import { Colors } from "../../global";

export const styles = StyleSheet.create({
    audioPlayerView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 5,
        justifyContent: "space-between",
        marginVertical:10,
    },
    audioTimeDurationView:{
        width: "50%",
        justifyContent: "center",
    },
    audioProgressView:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    audioActiveProgress:{
        height: 5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        backgroundColor: Colors.LITEGREEN,
    },
    audioInAtiveProgress:{
        height: 5,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        backgroundColor: Colors.GREY,
    },
    audioActiveDotView:{
        height: 15,
        width: 15,
        position: "absolute",
        borderRadius: 100,
        backgroundColor: Colors.LITEGREEN,
    },
})