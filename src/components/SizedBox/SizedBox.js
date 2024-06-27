import {View, Text} from 'react-native';
import React from 'react';

const SizedBox = ({height, width}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
      }}
    />
  );
};

export default SizedBox;
