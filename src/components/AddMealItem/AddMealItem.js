//react components
import React from 'react';
import { 
    View, Text 
} from 'react-native';
//styles
import {styles} from "./AddMealItemStyle";
//svg 
import ArrowSvg from "../../assets/svg/ArrowBlack.svg";
import NonVegSvg from "../../assets/svg/non-sign.svg";
import VegSvg from "../../assets/svg/veg-sign.svg";


const AddMealItem = ({name,desc,isVeg}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>
                    {name}
                </Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        {/* {
                            isVeg?
                            <VegSvg/>
                            :
                            <NonVegSvg/>
                        } */}
                    <Text style={{...styles.descriptionText}}>
                    {desc}
                    </Text>
                </View>
            </View>
            {/* <View style={styles.iconView}>
                <ArrowSvg />
            </View> */}
        </View>
    )
}

export default AddMealItem
