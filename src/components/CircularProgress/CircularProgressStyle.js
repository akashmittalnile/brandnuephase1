import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
const size=200;
const border_width=10;
export const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      backgroundColor:"#faf2ef",
      borderWidth: border_width,
      borderRadius: 100,
      borderColor: "#fcecdd",
      justifyContent: 'center',
      alignItems: 'center'
    },
    firstProgressLayer: {
      width: size,
      height: size,
      borderWidth: border_width,
      borderRadius: 100,
      position: 'absolute',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: Colors.ORANGE,
      borderTopColor:Colors.ORANGE,
      transform:[{rotateZ: '-135deg'}]
    },
    secondProgressLayer:{
      width: size,
      height: size,
      position: 'absolute',
      borderWidth: border_width,
      borderRadius: 100,
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: Colors.ORANGE,
      borderTopColor: Colors.ORANGE,
      transform: [{rotateZ: '45deg'}]
    },
    offsetLayer: {
      width: size,
      height: size,
      position: 'absolute',
      borderWidth: border_width,
      borderRadius: 100,
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: "#fcecdd",
      borderTopColor: "#fcecdd",
      transform:[{rotateZ: '-135deg'}]
    },
    display: {
      position: 'absolute',
      fontSize: 30,
      color:Colors.ORANGE,
      fontFamily:Fonts.BOLD,
    },
    sixHourText:{
        position: 'absolute',
        right:-30,
        fontSize: 20,
        color:Colors.ORANGE,
        fontFamily:Fonts.BOLD,
    },
    twelveHourText:{
        position: 'absolute',
        bottom:-40,
        fontSize: 20,
        color:Colors.ORANGE,
        fontFamily:Fonts.BOLD,
    },
    eighteenHourText:{
        position: 'absolute',
        left:-40,
        fontSize: 20,
        color:Colors.ORANGE,
        fontFamily:Fonts.BOLD,
    },
    twentyFourHourText:{
        top:-40,
        position: 'absolute',
        fontSize: 20,
        color:Colors.ORANGE,
        fontFamily:Fonts.BOLD,
    },
  });