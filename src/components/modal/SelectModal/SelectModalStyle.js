import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../global/index";


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.BLACK+'66',
    },
    blurView:{
        flex:1,
    },
    mainView:{
        padding:20,
        margin:20,
        borderRadius:20,
        backgroundColor:Colors.WHITE
    },
    modalTitle:{
        fontSize:18,
        marginBottom:10,
        fontFamily:Fonts.SEMI_BOLD,
        textAlign:"center",
    },
    itemView:{
        padding:5,
        paddingVertical:10,
    },
    ItemTextStyle:{
        textAlign:"center",
        fontFamily:Fonts.REGULAR,
    }
})