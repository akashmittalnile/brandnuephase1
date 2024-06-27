//react components
import React from 'react';
import { 
    View, Text ,
    TouchableOpacity,
} from 'react-native';
//global
import { Colors } from '../../global';
//styles
import {styles} from "./MyRadioButtonStyle";

const MyRadioButton = ({
    radioData,
    selectedRadioValue,
    setSelectedRadioValue,
}) => {
    return (
        <View style={styles.radioTextView}>
        {
            radioData.length > 0
                ?
                radioData.map((item, index) => (
                    <View style={styles.radioItemView} key={item.id}>
                        <TouchableOpacity
                            onPress={() => setSelectedRadioValue(index)}
                            style={{
                                ...styles.radioOuterCircle,
                                borderColor: selectedRadioValue == index ? Colors.ORANGE : Colors.GREY
                            }}>
                            {
                                selectedRadioValue == index
                                    ?
                                    <View style={styles.radioInnerCircle} />
                                    :
                                    null
                            }
                        </TouchableOpacity>
                        <Text style={styles.radioText}>
                            {item.name}
                        </Text>
                    </View>
                ))
                :
                null
        }
    </View>
    )
}

export default MyRadioButton;
