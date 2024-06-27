//react components
import React,{useState} from 'react';
import {
    View, Text,
    TouchableOpacity
} from 'react-native';
//global
import { Colors } from '../../global';
//styles
import { styles } from "./GenderWithIconStyle";

const GenderWithIcon = ({
    item,
    index,
    selectedIndex,
    setSelectedIndex
}) => {

    //UI
    return (
        <TouchableOpacity
            onPress={() => setSelectedIndex(index)}
            style={{
                ...styles.genderSectionView,
                borderWidth: selectedIndex == index ? 1 : null,
                borderColor: selectedIndex == index ? Colors.LITEGREEN : null,
            }}
        >
            {item.svg}
            <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default GenderWithIcon
