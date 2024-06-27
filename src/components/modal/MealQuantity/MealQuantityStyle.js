import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK + '66',
      
    },
    blurView: {
        flex: 1,
    },
    mainView: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    titleText: {
        fontFamily: Fonts.SEMI_BOLD,
    },
    timeQuantityView: {
        elevation: 50,
        marginVertical: 20,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
    },
    headerTitleTextView: {
        backgroundColor: Colors.LITEPINK,
        padding: 10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        paddingHorizontal: 20,
    },
    headerTitleText: {
        fontFamily: Fonts.SEMI_BOLD,
    },
    bottomSection: {
        padding: 10,
        paddingHorizontal: 20,
    },
    TextInputArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        marginBottom: 20,
    },
    TextInputStyles: {
        paddingHorizontal: 10,
        borderWidth: 0.5,
        width: "48%",
        height: 40,
    },
    AMPMView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    highLightAreaView: {
        padding: 10,
        marginHorizontal: 2,
    },
    helpingText: {
        fontFamily: Fonts.REGULAR,
        fontSize: 10,
    },
    AMPMTextStyle: {

    },
    ButtonStyle: {
        backgroundColor: Colors.LITEGREEN,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 5,
        marginBottom:20
    },
    buttonText: {
        fontFamily: Fonts.SEMI_BOLD,
        textAlign: "center",
        color: Colors.WHITE,
    },


})