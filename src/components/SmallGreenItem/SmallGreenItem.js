//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../global';
//styles
import {styles} from './SmallGreenItemStyle';
//svg
import SmallCrossSvg from '../../assets/svg/small-cross.svg';
const SmallGreenItem = ({Data, setData, id, name, removeButton}) => {
  //function : imp function
  const removeItem = () => {
    const filterData = Data.filter(e => e.id !== id);
    setData(filterData);
  };
  //UI
  return (
    <>
      {name != 'Others' ? (
        <View
          style={{
            ...styles.container,
            backgroundColor: removeButton ? Colors.WHITE : Colors.LEMONGREEN,
          }}>
          <Text style={styles.titleText}>{name}</Text>
          {removeButton ? (
            <TouchableOpacity onPress={removeItem} style={styles.iconView}>
              <SmallCrossSvg />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default React.memo(SmallGreenItem);
