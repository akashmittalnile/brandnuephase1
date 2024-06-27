//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//styles
import {styles} from './MemberShipCardStyle';
//svg
import CheckSvg from '../../assets/svg/check_all.svg';
import {Colors} from '../../global';
const MemberShipCard = ({item, index, onPress = () => {}}) => {
  return (
    <View key={index} style={styles.parentView}>
      <Text style={styles.planTitle}>{item.name.toUpperCase()}</Text>
      {item.name.toUpperCase() == 'STANDARD' ? null : (
        <Text style={styles.planTypeText}>
          {item.subscription_interval == 1 ? '(Monthly)' : '(Yearly)'}
        </Text>
      )}
      <View style={styles.childView}>
        <View style={styles.priceView}>
          {item?.name?.includes('Elite') ? null : (
            <Text style={styles.dollarText}>$</Text>
          )}
          <Text style={styles.priceText}>
            {item?.name?.includes('Elite') ? 'Contact Us' : item.price}
          </Text>
        </View>
        <View style={styles.lineStyle} />
        {item.description.length > 0
          ? item.description.map((item, index) => {
              return (
                <View key={index} style={styles.planIncludeViewStyle}>
                  <CheckSvg />
                  <Text style={styles.planIncludeTextStyle}>{item}</Text>
                </View>
              );
            })
          : null}
      </View>
      <TouchableOpacity onPress={onPress} style={styles.buttonView}>
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberShipCard;
