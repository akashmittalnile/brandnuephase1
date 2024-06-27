import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    bottomSection:{
        backgroundColor:Colors.WHITE,
        borderRadius:10,
        marginVertical:5,
    },
    bottomSectionHeaderView:{
        padding:10,
        backgroundColor:Colors.LITEPINK,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    titleText:{
        fontFamily:Fonts.SEMI_BOLD,
    },
    bodyView:{
        padding: 10
    },
    listTextView:{
        backgroundColor: "#f8f8f8",
         padding: 5, 
         marginVertical: 3, 
    },
    listText:{
        fontFamily: Fonts.SEMI_BOLD,
         fontSize: 12,
    },
    iconTimeSection:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    iconTimeSectionView:{
        flexDirection: "row",
        alignItems:"center",
        borderWidth: 0.3,
        padding: 5,
        width: "80%"
    },
    startTimeText:{
        marginLeft:10,
    },
    AMPMView:{
        backgroundColor: Colors.LITEGREEN,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
    },
    AMPMText:{
        color: Colors.WHITE,
    }
})