//react components
import React from 'react';
import {
    View, Text,
    TouchableOpacity,
} from 'react-native';
//styles
import { styles } from "./DigitalLibraryListItemStyle";
//svg
import RightArrowSvg from "../../assets/svg/arrow.svg";

const DigitalLibraryListItem = ({
    Svg,
    name,
    onPress = () => { },
}) => {

    //UI
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={styles.ListViewStyle}>
            <View style={styles.outerIconView} >
                {Svg}
            </View>
            <View style={styles.TextIconView}>
                <Text style={styles.textStyle}>{name}</Text>
                <View style={styles.innerIconView}>
                    <RightArrowSvg />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DigitalLibraryListItem;
