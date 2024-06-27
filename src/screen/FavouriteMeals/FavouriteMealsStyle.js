import { Fonts } from "../../global";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mainView:{
        padding:20
    },
    noDataFound:{
        textAlign:"center",
        fontFamily:Fonts.SEMI_BOLD,
    }
})