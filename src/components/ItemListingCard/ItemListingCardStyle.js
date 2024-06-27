import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 4,
        padding: 10,
        marginBottom:10,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
    },
    imageTextView:{
        flexDirection: "row"
    },
    ImageStyle:{
        height: 60,
         width: 60, 
         resizeMode: "cover",
          borderRadius: 10 
    },
    TextView:{
        marginLeft: 10,
        width:"70%"
    },
    title:{
        fontSize: 12,
         fontFamily: Fonts.SEMI_BOLD
    },
    buttonView:{
        flexDirection: "row",
         marginTop: 10 
    },
    ButtonStyle:{
        backgroundColor: Colors.ORANGE,
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonText:{
        fontSize: 10, 
        fontFamily: Fonts.SEMI_BOLD,
         color: Colors.WHITE
    }
})