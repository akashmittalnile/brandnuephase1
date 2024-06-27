//import : react components
import React from 'react';
import {View, Text} from 'react-native';
//import : styles
import {styles} from './ShippingAddressStyle';
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import TextInputArea from 'components/TextInputArea/TextInputArea';
import MyButton from 'components/MyButton/MyButton';
import {Colors, ScreenNames} from 'global/index';

const ShippingAddress = ({navigation}) => {
  //function : nav func
  const gotoPlanPreview = () => navigation.navigate(ScreenNames.PLAN_PREVIEW);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <View style={styles.mainView}>
        <Text style={styles.titleText}>
          Where Should We Send Your Products?
        </Text>
        <Text style={styles.subText}>Enter details to sign up</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInputArea
            placeholder={'First name'}
            placeholderTextColor="gray"
            TextInputWidth={'48%'}
            hasViewBorder
          />
          <TextInputArea
            placeholder={'Last name'}
            placeholderTextColor="gray"
            TextInputWidth={'48%'}
            hasViewBorder
          />
        </View>
        <TextInputArea placeholder={'Address 1'} hasViewBorder />
        <TextInputArea placeholder={'Address 2'} hasViewBorder />
        <TextInputArea placeholder={'City'} hasViewBorder />
        <TextInputArea placeholder={'Uttar Pradesh'} hasViewBorder />
        <TextInputArea placeholder={'Zip code'} hasViewBorder />
        <Text style={styles.warningText}>Products arrive within 7 days.</Text>
        <MyButton
          ButtonTitle={'Continue'}
          backgroundColor={Colors.ORANGE}
          onPress={() => gotoPlanPreview()}
        />
      </View>
    </View>
  );
};

export default ShippingAddress;
