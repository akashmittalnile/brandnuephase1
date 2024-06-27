//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//styles
import {styles} from './TextIconItemStyle';

const TextIconItem = ({
  TitleText,
  Svg,
  onPress = () => {},
  disabled = false,
}) => {
  //UI
  return (
    <View style={styles.container}>
      <Text style={styles.TextStyle}>{TitleText}</Text>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        {Svg}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TextIconItem);
