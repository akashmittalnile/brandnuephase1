import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Fonts, MyIcon} from 'global/index';
import Slider from '@react-native-community/slider';

const CustomSlider = ({
  title,
  minValue = 0,
  value,
  maxValue = 100,
  unit = 'cm',
  setValue = () => {},
  pointValue = 2,
}) => {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={styles.title}>{title}</Text>
        {/* {value && (
          <Text style={styles.value}>{`${parseFloat(value).toFixed(
            2,
          )} ${unit}`}</Text>
        )} */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <MyIcon.Ionicons name="man-outline" size={16} />
        <MyIcon.Ionicons name="man-outline" size={24} />
      </View>
      <Slider
        style={{width: '100%', marginVertical: -10, height: 40}}
        value={value}
        minimumValue={minValue}
        maximumValue={maxValue}
        thumbTintColor={Colors.LITEGREEN}
        minimumTrackTintColor={Colors.LITEGREEN}
        maximumTrackTintColor="#000000"
        onValueChange={value => setValue(value)}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: Colors.GREY,
          }}>{`${
          value ? parseFloat(value).toFixed(pointValue) : minValue
        } ${unit}`}</Text>
        <Text
          style={{
            color: Colors.GREY,
          }}>{`${maxValue} ${unit}`}</Text>
      </View>
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 16,
  },
  value: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 14,
  },
});
