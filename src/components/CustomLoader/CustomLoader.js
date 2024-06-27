//react components
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
//global
import {Colors, Fonts} from '../../global';

const CustomLoader = ({showLoader, color = Colors.WHITE}) => {
  return (
    <>
      {showLoader ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.BLACK + 'bb',
            position: 'absolute',
            right: 0,
            top: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <View style={{backgroundColor: Colors.BLACK, padding: 20}}> */}
          <Text
            style={{
              fontFamily: Fonts.BOLD,
              fontSize: 16,
              color: Colors.WHITE,
              marginBottom: 10,
            }}>
            Loading...
          </Text>
          <ActivityIndicator
            animating={showLoader}
            size="large"
            color={color}
          />
          {/* </View> */}
        </View>
      ) : null}
    </>
  );
};

export default CustomLoader;
