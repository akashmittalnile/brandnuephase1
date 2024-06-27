//react components
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Touchable} from 'react-native';
import {Colors} from '../../global';
import MyButton from '../MyButton/MyButton';
//styles
import {styles} from './FoodTimeItemStyle';

const FoodTimeItem = ({
  FoodTime,
  setHH,
  setMM,
  HHPlaceHolder,
  MMPlaceholder,
  AMPM_Data,
  selectedAMPMValue,
  setselectedAMPMValue,
  onPress = () => {},
  editable = true,
}) => {
  //UI
  return (
    <View>
      <Text style={styles.TitleText}>
        {FoodTime} {FoodTime == 'Dinner' ? 'End' : 'Start'} Time
      </Text>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.TextInputStyle}
          placeholder={HHPlaceHolder}
          allowFontScaling={false}
          onChangeText={text => setHH(text)}
          keyboardType="number-pad"
          editable={editable}
          maxLength={2}
          placeholderTextColor="#000000"
        />
        <TextInput
          style={styles.TextInputStyle}
          allowFontScaling={false}
          placeholder={MMPlaceholder}
          onChangeText={text => setMM(text)}
          keyboardType="number-pad"
          maxLength={2}
          editable={editable}
          placeholderTextColor="#000000"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={styles.AMPMView}>
          {AMPM_Data.length > 0
            ? AMPM_Data.map((item, index) => (
                <TouchableOpacity
                  key={item.id.toString()}
                  disabled={!editable}
                  onPress={() => setselectedAMPMValue(index)}
                  style={{
                    ...styles.AMPMItemView,
                    backgroundColor:
                      selectedAMPMValue == index
                        ? Colors.LITEGREEN
                        : Colors.WHITE,
                    borderWidth: selectedAMPMValue == index ? null : 0.5,
                  }}>
                  <Text
                    style={{
                      ...styles.AMPMTextStyle,
                      color:
                        selectedAMPMValue == index
                          ? Colors.WHITE
                          : Colors.BLACK,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))
            : null}
        </View>
        <TouchableOpacity onPress={onPress} style={styles.buttonView}>
          <Text style={styles.buttonText}>Set Time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(FoodTimeItem);
