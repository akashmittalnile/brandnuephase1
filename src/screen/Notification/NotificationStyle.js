import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        padding: 20,
    },
    CardView: {
        marginVertical: 5,
        padding: 5,
        elevation: 4,
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        borderBottomColor: Colors.LITEGREEN,
        borderBottomWidth: 4,
    },
    notificationIdView: {
        backgroundColor: Colors.LEMONGREEN,
        height: 30,
        width: 30,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    notificationIdText: {
        color: Colors.LITEGREEN,
        fontFamily: Fonts.SEMI_BOLD,
    },
    CardTextView: {
        padding: 5,
    },
    notificationTitleText: {
        fontSize: 11,
        fontFamily: Fonts.BOLD,
    },
    timeDateView: {
        flexDirection: "row",
        marginVertical:5,
        alignSelf:"flex-end"
    },
    timeDateText: {
        color: Colors.GREY,
        fontSize: 10,
        fontFamily: Fonts.SEMI_BOLD,
    },
    notificationDescText: {
        fontSize: 10
    },
    EmptyNotificationView: {
        padding: 20,
        alignItems: "center",
    },
    imageStyle: {
        height: 250,
        width: 250,
        resizeMode: "cover",
    },
    title: {
        marginTop: 20,
        fontFamily: Fonts.SEMI_BOLD,
        fontSize: 12,
    },
    description: {
        fontFamily: Fonts.REGULAR,
        fontSize: 10,
        textAlign: "center",
        marginVertical: 10,
        width: "80%",
    },
    buttonStyle: {
        backgroundColor: Colors.LITEGREEN,
        padding:10,
        borderRadius:20,
        width:"60%",
    },
    buttonText: {
        fontSize: 12,
        fontFamily: Fonts.SEMI_BOLD,
        color: Colors.WHITE,
        textAlign:"center",
    }

})