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
    FoodListView:{
        marginVertical:5,
        paddingBottom:3,
    },
    foodlistText:{
        fontFamily:Fonts.SEMI_BOLD,
    },
    BodyMsgTextStyle:{
        textAlign:"center",
        fontFamily:Fonts.SEMI_BOLD,
        padding:30,
    }
})