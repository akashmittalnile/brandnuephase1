//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//styles
import {styles} from './ItemHeaderStyle';
const ItemHeader = ({HeaderTitle, LinkText, onPress = () => {}}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.TitleText}>{HeaderTitle}</Text>
      {LinkText ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.linktext}>{LinkText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ItemHeader;
