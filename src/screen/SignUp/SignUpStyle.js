import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainView: {
        padding: 20,
    },
    textStyle:{
        fontFamily:Fonts.SEMI_BOLD,
    },
    GenderView: {
        marginVertical:5,
    },
    primaryView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    uploadPictureView: {
        marginVertical:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.GREY,
        borderRadius: 0.5,
        borderStyle: 'dashed',
        paddingHorizontal: 10,
        zIndex: 0
    },
    uploadPictureText: {
        color: Colors.GREY,
        fontFamily:Fonts.SEMI_BOLD,
        fontSize:10,
        padding: 10,
        paddingVertical: 15,
    },
    LoaderStyle:{
        zIndex:100,
        alignSelf:"center",
    }
   
})