import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    upperBodySection:{
        borderRadius:10,
        backgroundColor:Colors.WHITE,
    },
    titleTextView:{
        padding:15,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:Colors.LITEPINK,
    },
    titleTextStyle:{
     fontFamily:Fonts.BOLD,
     color:Colors.ORANGE, 
     fontSize:16,
     textAlign:"center",  
    },
    listSectionView:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        paddingVertical:10,
       
    },
    listSectionTitleText:{
        fontFamily:Fonts.SEMI_BOLD,
        fontSize:10,
    },
    listSectionText:{
        fontFamily:Fonts.SEMI_BOLD,
        fontSize:10,
        color:Colors.GREY,
    },
   
})