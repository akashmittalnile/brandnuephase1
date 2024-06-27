import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    TabStyleView: {
        height:60,
        backgroundColor: Platform.OS == 'android' ? Colors.WHITE : Colors.WHITE,
    },
    TabItemView:{
        justifyContent:"center",
        alignItems:"center"
    },
    TabItemActiveText:{
        textAlign:"center",
        color:Colors.LITEGREEN,
        fontFamily:Fonts.REGULAR,
        fontSize:10,
    },
    TabItemInActiveText:{
        textAlign:"center",
        color:Colors.IN_ACTIVE_BOTTOM_TEXT,
        fontFamily:Fonts.REGULAR,
        fontSize:10,
    }
})