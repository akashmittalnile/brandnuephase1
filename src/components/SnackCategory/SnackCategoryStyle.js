import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    CardStyle:{
        backgroundColor:Colors.WHITE,
        borderRadius:10,
        marginVertical:5,
    },
    cardBody:{
        padding: 10,
        paddingHorizontal: 20,
    },
    flexRowStyle:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    TitleText: {
        fontFamily: Fonts.SEMI_BOLD,
        color:Colors.BLACK,
    },
    nullBodyText:{
        fontFamily: Fonts.SEMI_BOLD,
        color:Colors.BLACK,
        textAlign:"center",
        marginVertical:20,
    },
    ItemsSectionView:{
        backgroundColor:Colors.LEMONGREEN,
        padding:10,
        borderRadius:5,
        marginVertical:5,
    },
    FoodListView:{
        marginVertical:5,
        paddingBottom:3,
    },
    IconView: {
        backgroundColor: Colors.RED,
        padding:2,
        borderRadius: 100
    },
});