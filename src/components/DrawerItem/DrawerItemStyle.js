import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { widthToDp } from "../../global/Constant";

export const styles = StyleSheet.create({
    drawerItemView:{
        marginVertical:5,
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:20,
        padding:5,
        borderRadius:5,
        backgroundColor:Colors.WHITE,
    },
    drawerItemIcon:{
        padding:5,
            backgroundColor:Colors.LEMONGREEN,
            borderRadius:100,
    },
    drawerItemTextStyle:{
        color:Colors.LITEGREEN,
        fontSize:12,
        fontFamily:Fonts.BOLD,
    },  
    countView:{
        padding:5,
        backgroundColor:Colors.LEMONGREEN,
        borderRadius:100,
        marginLeft:10,
    }
})