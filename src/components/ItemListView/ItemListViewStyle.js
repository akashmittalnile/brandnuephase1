import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.LITEGREEN,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    numberTextView:{
        flexDirection: "row",
         alignItems: "center",
    },
    numberView:{
        backgroundColor: Colors.WHITE,
        borderRadius: 100,
        padding: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    numberText:{
        color: Colors.LITEGREEN,
         fontFamily: Fonts.SEMI_BOLD
    },
    textStyle:{
        color: Colors.WHITE, 
        fontSize:12,
        fontFamily: Fonts.SEMI_BOLD, 
    }
})