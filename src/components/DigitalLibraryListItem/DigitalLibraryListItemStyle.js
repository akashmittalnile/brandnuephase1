import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    ListViewStyle:{
        flexDirection: "row",
         marginVertical: 10,
    },
    outerIconView:{
        width: "10%",
        elevation: 4,
        marginVertical:5,
        justifyContent: "center",
        alignItems: "center",
        zIndex:100,
        borderRadius: 100,
        marginRight: -10,
        backgroundColor: Colors.WHITE
    },
    TextIconView:{
        flexDirection: "row",
        width: "90%",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        alignItems: "center",
        backgroundColor: Colors.LITEGREEN,
        justifyContent: "space-between"
    },
    textStyle:{
        color: Colors.WHITE,
         fontFamily: Fonts.BOLD,
         fontSize:12,
    },
    innerIconView:{
        backgroundColor: Colors.LEMONGREEN,
         borderRadius: 100,
          padding: 2,
    }
})