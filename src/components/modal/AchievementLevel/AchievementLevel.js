//react components
import React from 'react';
import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../../global';
//custom components
import MyButton from '../../MyButton/MyButton';
//styles
import {styles} from './AchievementLevelStyle';
//svg
import TwentyPercSvg from '../../../assets/svg/achievement/20-goal.svg';
import FortyPercSvg from '../../../assets/svg/achievement/40-goal.svg';
import SixtyPercSvg from '../../../assets/svg/achievement/60-goal.svg';
import EightyPercSvg from '../../../assets/svg/achievement/80-goal.svg';
import HundredPercSvg from '../../../assets/svg/achievement/100-goal.svg';
import TwentyWhiteSvg from '../../../assets/svg/achievement/20-white.svg';
import FortyWhiteSvg from '../../../assets/svg/achievement/40-white.svg';
import SixtyWhiteSvg from '../../../assets/svg/achievement/60-white.svg';
import EightyWhiteSvg from '../../../assets/svg/achievement/80-white.svg';
import HundredWhiteSvg from '../../../assets/svg/achievement/100-white.svg';

const AchievementLevel = ({
  visible = false,
  setVisible = () => {},
  Data,
  MyPercentage,
}) => {
  //DATA
  // const MyPercentage = 40;
  //function : modal function
  const closeModal = () => {
    setVisible(false);
  };
  //function : render function
  const achievementRenderFuction = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      key={item.id}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor:
                item.percentage <= MyPercentage
                  ? Colors.LITEGREEN
                  : Colors.WHITE,
              height: 70,
              width: 70,
              marginHorizontal: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              borderWidth: 5,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              borderColor: Colors.WHITE,
            }}>
            {item.percentage == 20 ? (
              <>{item.status ? <TwentyWhiteSvg /> : <TwentyPercSvg />}</>
            ) : null}
            {item.percentage == 40 ? (
              <>{item.status ? <FortyWhiteSvg /> : <FortyPercSvg />}</>
            ) : null}
            {item.percentage == 60 ? (
              <>{item.status ? <SixtyWhiteSvg /> : <SixtyPercSvg />}</>
            ) : null}
            {item.percentage == 80 ? (
              <>{item.status ? <EightyWhiteSvg /> : <EightyPercSvg />}</>
            ) : null}
            {item.percentage == 100 ? (
              <>{item.status ? <HundredWhiteSvg /> : <HundredPercSvg />}</>
            ) : null}
          </View>
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontFamily: Fonts.SEMI_BOLD,
                color: Colors.LITEGREEN,
              }}>
              {item.percentage}% to goal
            </Text>
            <Text
              style={{
                fontFamily: Fonts.SEMI_BOLD,
                color: Colors.GREY,
                fontSize: 18,
              }}>
              {item.title}
            </Text>
          </View>
        </View>
        {index == Data.length - 1 ? (
          <View style={{height: 30}} />
        ) : (
          <View
            style={{
              left: 32,
              width: 6,
              height: 40,
              backgroundColor:
                item.percentage <= MyPercentage
                  ? Colors.LITEGREEN
                  : Colors.GRASS_GREEN,
            }}
          />
        )}
      </View>
    </View>
  );
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View style={styles.mainView}>
          {Data?.length > 0 ? (
            <FlatList
              data={Data}
              renderItem={achievementRenderFuction}
              keyExtractor={item => item.id}
            />
          ) : null}
          <View style={styles.ButtonView}>
            <MyButton ButtonTitle="Close" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(AchievementLevel);
