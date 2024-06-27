import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { windowWidth } from "../../global/Constant";

export const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        paddingVertical:20,
    },
    mainView:{
        padding:20,
    },
    logoStyle:{
        height:100,
        width:windowWidth/2,
        alignSelf:"center",
        resizeMode:"contain"
    },
    bottomView:{
        flex:1,
        padding:20,
        justifyContent:"flex-end",
    },
    tcTextStyles:{
        color:Colors.ORANGE,
        fontFamily:Fonts.REGULAR,  
        textAlign:"center",
        marginTop:20,
    },
})