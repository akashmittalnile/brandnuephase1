import { StyleSheet } from "react-native";
import { Colors } from "../../global";
import { windowHeight, windowWidth } from "../../global/Constant";

export  const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.ORANGE,
    },
    FirstBorder:{
        height:200,
        width:200,
        backgroundColor:Colors.ORANGE,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:5,
        borderColor:"#f8982a",
        borderRadius:100,
    },
    secondBorder:{
        height:190,
        width:190,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:5,
        borderColor:"#fab661",
        borderRadius:100,
    },
    thirdBorder:{
        backgroundColor:Colors.WHITE,
        height:180,
        width:180,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#ffd19d",
        borderWidth:5,
        borderRadius:100,
    },
    logoStyle:{
        height:"95%",
        width:"95%",
        resizeMode:"contain",
    }
});