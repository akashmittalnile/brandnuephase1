//React components
import React from 'react';
import {
    View, Text,
    TouchableOpacity
} from 'react-native';
import { Colors } from '../../global';
//styles
import { styles } from "./MyButtonStyle";

const MyButton = ({
    ButtonTitle,
    onPress = () => { },
    backgroundColor,
    disabled=false,
    width,
    alignSelf,
    height
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={{...styles.ButtonView,
                width:width,
                height:height,
                alignSelf:alignSelf,
                backgroundColor:backgroundColor?backgroundColor:Colors.LITEGREEN}}
            onPress={onPress}
        >
            <Text style={styles.ButtonText}>
                {ButtonTitle}
            </Text>
        </TouchableOpacity>
    )
}

export default MyButton;
