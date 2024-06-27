//react components
import React from 'react';
import {
    View, Text,
    TouchableOpacity
} from 'react-native';
//styles
import { styles } from "./ItemsListStyle";
//svg
import ArrowSvg from "../../assets/svg/arrow.svg";

const ItemsList = ({ 
    name,
    onPress=()=>{},
 }) => {

    //UI
    return (
        <TouchableOpacity
        onPress={onPress}
            activeOpacity={0.5}
            style={styles.container}>
            <Text style={styles.textStyle}>
                {name}
            </Text>
            <View style={styles.iconView}>
                <ArrowSvg />
            </View>
        </TouchableOpacity>
    )
}

export default ItemsList;
