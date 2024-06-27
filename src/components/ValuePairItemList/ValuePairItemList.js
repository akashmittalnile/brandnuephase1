//react components
import React,{Fragment} from 'react';
import {
    View, Text
} from 'react-native';
//styles
import { styles } from "./ValuePairItemListStyle";

const ValuePairItemList = ({
    HeaderName,
    name,
    value,
    isBorder
}) => {
    return (
        <Fragment>
            {
                HeaderName ?
                    <View style={styles.titleTextView}>
                        <Text style={styles.titleTextStyle}>
                            Average Fasting
                        </Text>
                    </View>
                    :
                    null
            }
            {
                    <View  style={{
                        ...styles.listSectionView,
                        borderBottomWidth:isBorder? 0.5:0,
                    }}>
                        <Text style={styles.listSectionTitleText}>{name} :</Text>
                        <Text style={styles.listSectionText}>{value}</Text>
                    </View>
            }
        </Fragment>
    )
}

export default ValuePairItemList;
