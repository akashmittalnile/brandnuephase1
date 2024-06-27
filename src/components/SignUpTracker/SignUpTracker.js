import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {Colors, MyIcon} from 'global/index';

const SignUpTracker = ({value = 1}) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const CHECK_CIRCLE = 14;
  const PLAN_CIRCLE = 16;
  const LINE_WIDTH = 23;
  const MARGIN_HOR = -6;
  //UI
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
      }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{height: 45}}>
                {value == item ? (
                  <Image source={require('assets/Images/manrunning.png')} />
                ) : (
                  <View style={{height: '100%'}} />
                )}
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {value >= item ? (
                  <MyIcon.AntDesign
                    name="checkcircle"
                    color={Colors.LITEGREEN}
                    size={CHECK_CIRCLE}
                  />
                ) : (
                  <MyIcon.FontAwesome
                    name="circle"
                    color={Colors.GREY}
                    size={PLAN_CIRCLE}
                  />
                )}

                <MyIcon.Ionicons
                  name="remove-outline"
                  color={value >= item ? Colors.LITEGREEN : Colors.GREY}
                  size={LINE_WIDTH}
                  style={{
                    marginHorizontal: MARGIN_HOR,
                  }}
                />
                <MyIcon.Ionicons
                  name="remove-outline"
                  color={value >= item + 1 ? Colors.LITEGREEN : Colors.GREY}
                  size={LINE_WIDTH}
                  style={{
                    marginHorizontal: MARGIN_HOR,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SignUpTracker;
