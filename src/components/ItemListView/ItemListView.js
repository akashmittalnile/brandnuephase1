//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//styles
import {styles} from './ItemListViewStyle';
//svg
import RightArrowSvg from '../../assets/svg/Right-Arrow.svg';

const ItemListView = ({
  number,
  text,
  icon,
  backgroundColor,
  onPress = () => {},
  disabled = false,
}) => {
  //UI
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <View style={styles.numberTextView}>
        {number ? (
          <View style={styles.numberView}>
            <Text style={{...styles.numberText, color: backgroundColor}}>
              {number < 10 ? `0${number}` : number}
            </Text>
          </View>
        ) : (
          <>{icon ? icon : null}</>
        )}
        <Text
          style={{...styles.textStyle, marginLeft: number || icon ? 20 : 0}}>
          {text}
        </Text>
      </View>
      <View>
        <RightArrowSvg />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ItemListView);
