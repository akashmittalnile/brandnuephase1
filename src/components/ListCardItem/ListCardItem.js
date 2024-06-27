//react components
import React from 'react';
import {
    View, Text,
    Image, TouchableOpacity,
} from 'react-native';
//styles
import { styles } from "./ListCardItemStyle";
//svg
import RightArrowSvg from "../../assets/svg/arrow.svg";

const ListCardItem = ({
    imageUrl,
    TitleName,
    Description,
    onPress = () => { }
}) => {


    //UI
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.container}>
            <View style={styles.imageTextView}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.imageStyle}
                />
                <View style={styles.TextView}>
                    <Text style={styles.titleText}>{TitleName}</Text>
                    <Text numberOfLines={4} style={styles.descriptionText} >
                        {Description}
                    </Text>
                </View>
            </View>
            <View style={styles.iconView}>
                <RightArrowSvg />
            </View>
        </TouchableOpacity>
    )
}

export default ListCardItem;
