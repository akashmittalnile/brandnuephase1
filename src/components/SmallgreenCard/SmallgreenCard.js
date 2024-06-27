//react components
import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
//styles
import {styles} from './SmallgreenCardStyle';
//svg
import CrossSvg from '../../assets/svg/x.svg';

const SmallgreenCard = ({
  id,
  Data,
  setData,
  TitleName,
  FirstTextInputPlaceholder,
  SecondTextInputPlaceHolder,
  BottomInputText,
  setStartTime,
  editable = true,
  maxLength = 1000,
  keyboardType = 'default',
}) => {
  //function : imp function
  const removeItem = () => {
    const filterData = Data?.filter(e => e.id !== id);
    setData(filterData);
    if (filterData.length === 0 && setStartTime) {
      setStartTime({});
    }
  };
  const setFirstInputText = text => {
    setTimeout(() => {
      const index = Data.findIndex(e => e.id == id);
      const newArray = [...Data];
      newArray[index] = {...newArray[index], mm: text};
      setData(newArray);
    }, 1000);
  };
  // const setSecondInputText=(text)=>{
  //     const index=Data.findIndex(e=>e.id==id);
  //     const newArray=[...Data];
  //     newArray[index]={...newArray[index],ss:text}
  //     setData(newArray)
  // }
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.TitleIconView}>
        <Text style={styles.TitleText}>{TitleName}</Text>
        <TouchableOpacity onPress={removeItem} style={styles.IconView}>
          <CrossSvg />
        </TouchableOpacity>
      </View>
      {FirstTextInputPlaceholder ? (
        <View style={styles.TextInputView}>
          <TextInput
            style={{...styles.TextInputStyle, width: '100%'}}
            placeholder={FirstTextInputPlaceholder}
            onChangeText={text => setFirstInputText(text)}
            editable={editable}
            maxLength={maxLength}
            keyboardType={keyboardType}
            placeholderTextColor="#000000"
          />

          {/* {
                            SecondTextInputPlaceHolder
                                ?
                                <TextInput
                                    style={styles.TextInputStyle}
                                    placeholder={SecondTextInputPlaceHolder}
                                    onChangeText={(text)=>setSecondInputText(text)}
                                    maxLength={maxLength}
                                    keyboardType={keyboardType}
                                    placeholderTextColor="#000000"
                                />
                                :
                                null
                        } */}
        </View>
      ) : null}
      {BottomInputText ? (
        <Text style={styles.bottomInputText}>{BottomInputText}</Text>
      ) : null}
    </View>
  );
};

export default React.memo(SmallgreenCard);
