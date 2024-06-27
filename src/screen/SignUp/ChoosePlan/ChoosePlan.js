//import : react components
import React, {useState} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import MyButton from 'components/MyButton/MyButton';
//import : utils
import {Colors, Fonts, MyIcon, ScreenNames} from 'global/index';
//import : styles
import {styles} from './ChoosePlanStyle';

const ChoosePlan = ({navigation}) => {
  //variables
  const data = [
    {
      id: 1,
      title: 'Program + Unlimited',
      img: require('assets/Images/plan1.png'),
      subText: '1:1 Coaching Sessions (virtual or in-office). $3277',
    },
    {
      id: 2,
      title: 'Program + 5 Visits',
      isPopular: true,
      img: require('assets/Images/plan1.png'),
      subText: 'to use at your discretion (virtual or in-office). $1427',
    },
    {
      id: 3,
      title: 'Program + Self-directed',
      img: require('assets/Images/plan1.png'),
      subText: 'with 24/7 Chat support. $977',
    },
  ];
  //function : nav function
  const gotoShippingAddress = () =>
    navigation.navigate(ScreenNames.SHIPPING_ADDRESS);
  //hook : states
  const [selectedPlan, setSelectedPlan] = useState({
    id: 1,
    title: 'Program + Unlimited',
    img: require('assets/Images/plan1.png'),
    subText: '1:1 Coaching Sessions (virtual or in-office). $3277',
  });
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Select Program'} />
      <View style={styles.mainView}>
        <Text style={styles.mainText}>
          We provide three distinct levels of coaching and support for your
          2-month program.
        </Text>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedPlan(item)}
                style={{
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 2,
                  backgroundColor: Colors.WHITE,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor:
                    selectedPlan.id == item.id ? Colors.ORANGE : Colors.GREY,
                }}>
                <Image source={item.img} />
                <View style={{marginLeft: 10, width: '55%'}}>
                  {item.isPopular && (
                    <View
                      style={{
                        backgroundColor: Colors.ORANGE,
                        alignSelf: 'flex-start',
                        padding: 5,
                        paddingHorizontal: 15,
                        borderRadius: 100,
                      }}>
                      <Text style={{color: Colors.WHITE}}>MOST POPULAR </Text>
                    </View>
                  )}
                  <Text style={{fontFamily: Fonts.BOLD}}>{item.title}</Text>
                  <Text>{item.subText}</Text>
                </View>
                <MyIcon.AntDesign
                  name="checkcircle"
                  size={24}
                  color={
                    selectedPlan.id == item.id ? Colors.ORANGE : Colors.GREY
                  }
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <MyButton
          ButtonTitle={'Continue'}
          backgroundColor={Colors.ORANGE}
          onPress={() => gotoShippingAddress()}
        />
      </View>
    </View>
  );
};

export default ChoosePlan;
