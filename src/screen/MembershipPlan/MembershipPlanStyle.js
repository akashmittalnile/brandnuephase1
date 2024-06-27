import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { widthToDp, windowHeight, windowWidth } from "../../global/Constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.LITEGREEN,
    },
    mainView: {
        padding:10,
    },
    parentView: {
        width:windowWidth,
        margin:3,
        marginRight:10,
        marginVertical:30,
        backgroundColor: "#789310",
        borderRadius: 20,
        alignItems: "center",
        width: windowWidth/1.1,
    },
    planTitle: {
        color: Colors.WHITE,
        padding: 10,
        fontSize: 18,
    },
    childView: {
        backgroundColor: Colors.WHITE,
        width: windowWidth/1.3,
        padding: 10,
        margin:20,
        borderRadius: 20,
    },
    priceView: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 20,
    },
    dollarText: {
        color: Colors.GREY,
        marginTop: -10,
        fontSize: 16,
        fontWeight: "bold",
    },
    priceText: {
        fontSize: widthToDp(2.5),
        fontFamily: Fonts.BOLD,
    },
    lineStyle: {
        marginBottom: 10,
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 0.5,
    },
    planDisc: {
        fontSize: widthToDp(1.7),
        color: Colors.GREY,
        marginBottom: 10,
    },
    planIncludeViewStyle: {
        flexDirection: "row",
        marginVertical: 5,
    },
    planIncludeTextStyle: {
        fontSize: widthToDp(1.2),
        color: Colors.GREY,
        marginLeft:10,
    },
    planView: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
    },
    planTextStyle: {
        fontSize: widthToDp(1.1),
        fontFamily:Fonts.SEMI_BOLD,
        marginLeft: 10,
    },
    radioButtonOuterCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 0.5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.LITEGREEN,
    },
    radioButtonInnerCircle: {
        height: 13,
        width: 13,
        borderRadius: 100,
        backgroundColor: Colors.LITEGREEN,
    },
    buttonView: {
        marginTop: 20,
        width: "40%",
        justifyContent:"center",
        alignSelf:"center",
        backgroundColor: Colors.WHITE,
        borderRadius: 50,
    },
    buttonText: {
        padding: 5,
        paddingVertical: 15,
        fontSize:widthToDp(1.6) ,
        textAlign: "center",
        color: Colors.LITEGREEN
    },
    slidableBottomDotStyle:{
        flex:1,
        justifyContent:"flex-end",
    },
    slidableDotView:{
        flexDirection: "row",
         justifyContent: "center"
    },
    slidableDotStyle:{
        height: 10,
        width: 10,
        marginHorizontal: 2,
        borderRadius: 10,
        marginTop: -20,
    },
    bottomSectionView:{
        padding:10,
        backgroundColor:Colors.GRASS_GREEN,
        justifyContent:"center",
        alignItems:"center"
    },
    selectButtonView:{
        backgroundColor:Colors.LITEGREEN,
        width:"50%",
        padding:10,
        borderRadius:10,
    },
    buttonTextStyle:{
        fontFamily:Fonts.SEMI_BOLD,
        fontSize:16,
        color:Colors.WHITE,
        textAlign:"center",
    }
})