//react components
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
//styles
import {styles} from './TypeFoodItemStyle';
//svg
import PlusSvg from '../../assets/svg/plus.svg';
import NonVegSvg from '../../assets/svg/non-sign.svg';
import VegSvg from '../../assets/svg/veg-sign.svg';
import DownSvg from '../../assets/svg/chevron-down.svg';
import {Colors} from '../../global';

const TypeFoodItem = ({
  FoodName,
  setFoodName,
  Quantity,
  setQuantity,
  onPress = () => {},
}) => {
  //data
  const foodType = [
    {id: 1, name: 'Veg'},
    {id: 2, name: 'Non-veg'},
  ];
  //states
  const [selectedType, setselectedType] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  //UI
  return (
    <View>
      <View style={styles.flexRowStyle}>
        <Text style={{...styles.TitleText, width: '60%'}}>Type Food Name</Text>
        {/* <Text style={{...styles.TitleText, width: '15%'}}>Type</Text> */}
        <Text style={{...styles.TitleText, width: '20%'}}>Ounces</Text>
        <View style={{width: '10%'}} />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          value={FoodName}
          autoCorrect={false}
          allowFontScaling={false}
          numberOfLines={1}
          onChangeText={text => setFoodName(text)}
          placeholderTextColor="gray"
          style={{...styles.TextInputstyle, paddingLeft: 10}}
          // placeholder={FoodName}
        />
        {/* <View style={styles.dropdownStyle}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setIsOpen(true)}>
            {selectedType != '' ? (
              <>{selectedType == 'Veg' ? <VegSvg /> : <NonVegSvg />}</>
            ) : null}
            <DownSvg />
          </TouchableOpacity> */}
        {/* {isOpen ? (
            <View style={styles.vegNonvegView}>
              {foodType.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIsOpen(false);
                      setselectedType(item.name);
                    }}
                    style={{
                      padding: 4,
                      borderBottomWidth: foodType.length - 1 == index ? 0 : 1,
                    }}>
                    {item.name == 'Veg' ? <VegSvg /> : <NonVegSvg />}
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null} */}
        {/* </View> */}

        <TextInput
          value={Quantity}
          onChangeText={text => setQuantity(text)}
          allowFontScaling={false}
          placeholder="0"
          placeholderTextColor="gray"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'default'}
          style={{...styles.TextInputstyle, textAlign: 'center', width: '20%'}}
        />
        <TouchableOpacity onPress={onPress} style={styles.iconView}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(TypeFoodItem);
