//import : react components
import React, {useState} from 'react';
import {View, Switch, Text, Image, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
//import : styles
import {styles} from './MemberShipSignUpStyle';
import {Colors, Fonts, MyIcon, ScreenNames} from 'global/index';

const MemberShipSignUp = ({navigation}) => {
  //hook : states
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //function : nav func
  const gotoChoosePlan = () => navigation.navigate(ScreenNames.CHOOSE_PLAN);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Membership Plan'} />
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={{fontFamily: Fonts.BOLD, marginRight: 10}}>
            Bill Monthly
          </Text>
          <Switch
            trackColor={{false: Colors.ORANGE, true: Colors.LITEGREEN}}
            thumbColor={isEnabled ? Colors.GREEN : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{fontFamily: Fonts.REGULAR}}>Bill Annualy</Text>
        </View>
        <View style={styles.planCard}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image source={require('assets/Images/taj.png')} />
            <View
              style={{
                marginLeft: 10,
                // flexDirection: 'row',
              }}>
              <Text style={styles.titleText}>Premium</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.normalText}>$</Text>
                <Text style={styles.titleText}>{isEnabled ? '200' : '19'}</Text>
                <Text style={styles.normalText}>
                  /{isEnabled ? 'yearly' : 'month'}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.subText}>
            Reference site about Lorem Ipsum, giving information on its origins,
            as well as a random Lipsum generator.
          </Text>
          <View style={styles.listView}>
            <MyIcon.AntDesign name="check" color={Colors.WHITE} size={16} />
            <Text style={styles.listText}>2 months</Text>
          </View>
          <View style={styles.listView}>
            <MyIcon.AntDesign name="check" color={Colors.WHITE} size={16} />
            <Text style={styles.listText}>All products included</Text>
          </View>
          <View style={styles.listView}>
            <MyIcon.AntDesign name="check" color={Colors.WHITE} size={16} />
            <Text style={styles.listText}>Guides/Manuals/Resources</Text>
          </View>
          <View style={styles.listView}>
            <MyIcon.AntDesign name="check" color={Colors.WHITE} size={16} />
            <Text style={styles.listText}>
              Coaching and support based on your preference!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => gotoChoosePlan()}
            style={styles.buttonView}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MemberShipSignUp;
