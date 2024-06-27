//react components
import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
//custom components
import TextIconItem from '../../../components/TextIconItem/TextIconItem';
import CustomLoader from '../../CustomLoader/CustomLoader';
//import : third parties
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//global
import {Colors, ScreenNames, Server} from '../../../global';
//styles
import {styles} from './MealQuantityStyle';
//svg
import CalendarSvg from '../../../assets/svg/calendar1.svg';
//third parties
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
//redux
import {connect} from 'react-redux';
import {useKeyboard} from '../../../hooks/isKeyBoardOpen';
import DateTimePicker from '@react-native-community/datetimepicker';

const MealQuantity = ({
  visible,
  setVisible,
  SelectedMealType,
  ItemName,
  userToken,
}) => {
  //variables
  const navigation = useNavigation();
  //data
  const data = [
    {
      id: 1,
      name: 'AM',
    },
    {
      id: 2,
      name: 'PM',
    },
  ];
  //custom hooks
  const isKeyBoardOpen = useKeyboard();
  //States
  const [showLoader, setshowLoader] = useState(false);
  const [selectedAMPM, setselectedAMPM] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [Quantity, setQuantity] = useState('');
  const [HH, setHH] = useState('');
  const [MM, setMM] = useState('');
  //function : imp function
  const validation = () => {
    if (SelectedMealType != 'Snack') {
      var reg = /[^0-9.]|\.(?=.*\.)/g;
      if (HH == '') {
        Alert.alert('Enter HH time');
        // Alert.alert('Enter HH time');
      } else if (HH > 24) {
        Alert.alert('wrong HH time format');
      } else if (MM == '') {
        Alert.alert('Enter MM time');
      } else if (MM > 59) {
        Alert.alert('Wrong MM time format');
      } else if (Quantity == '') {
        Alert.alert('Enter Quantity');
      } else if (reg.test(Quantity)) {
        Alert.alert('Wrong quantity format');
      } else {
        return true;
      }
    } else return true;
  };
  const getDataForPost = () => {
    if (SelectedMealType == 'Dinner') {
      return {
        track_date: moment(date).format(`MM/DD/YYYY`),
        meal_type: SelectedMealType,
        end_time: {
          hh: HH,
          mm: MM,
          ext: data[selectedAMPM].name,
        },
        food_type: {
          foodName: ItemName,
          Quantity: Quantity,
        },
      };
    } else {
      if (SelectedMealType == 'Snack') {
        return {
          track_date: moment(date).format(`MM/DD/YYYY`),
          meal_type: SelectedMealType,
          food_type: {
            foodName: ItemName,
            Quantity: Quantity,
            start_time: {
              hh: HH,
              mm: MM,
              ext: data[selectedAMPM].name,
            },
          },
        };
      } else {
        return {
          track_date: moment(date).format(`MM/DD/YYYY`),
          meal_type: SelectedMealType,
          start_time: {
            hh: HH,
            mm: MM,
            ext: data[selectedAMPM].name,
          },
          food_type: {
            foodName: ItemName,
            Quantity: Quantity,
          },
        };
      }
    }
  };
  //function : service function
  const Save = async () => {
    if (validation()) {
      const dataForPost = getDataForPost();
      try {
        setshowLoader(true);
        const resp = await Server.postApiWithToken(
          userToken,
          Server.ADD_MEAL,
          dataForPost,
        );
        if (resp.data.status) {
          Alert.alert('', `${resp.data.msg}`);
          closeModal();
          setshowLoader(false);
          navigation.navigate(ScreenNames.ADDED_MEALS);
        } else {
          Alert.alert('', `${resp.data.msg}`);
          setshowLoader(false);
        }
      } catch (error) {
        console.error('error in MealQuantity', error);
        setshowLoader(false);
      }
    }
  };
  //function :modal function
  const closeModal = () => {
    setVisible(false);
  };

  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform === 'ios' ? 'height' : 'height'}
        style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity onPress={closeModal} style={styles.blurView} />
          <View style={styles.mainView} onMagicTap={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollView>
              <Text style={styles.titleText}>
                Select your meal intake quantity
              </Text>
              <TextIconItem
                TitleText={moment(date).format(`dddd,MMM DD,YYYY`)}
                Svg={<CalendarSvg />}
                onPress={() => {
                  setOpen(true);
                }}
              />
               {Platform.OS=='ios' ? 
      open ?
      <View>
        <View style={{flexDirection:'row',justifyContent: 'space-between',width:'70%',alignSelf: 'center',}}>
        <Text style={{color:'#000',fontWeight:'600'}} onPress={()=>{
          setOpen(false)
          setDate(new Date());
          }}>Cancle</Text>
         <Text style={{color:'#000',fontWeight:'600'}} onPress={()=>{setOpen(false)}}>Confirm</Text>

          </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display="spinner"
          textColor="#000"
          onChange={
            (event, selectedDate) => {
              const currentDate = selectedDate;
             
              setDate(currentDate);
            }
        }
          
        /> 
        </View>
       
        : 
       null
     
    :
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
}
              <View style={styles.timeQuantityView}>
                <View style={styles.headerTitleTextView}>
                  <Text style={styles.headerTitleText}>{SelectedMealType}</Text>
                </View>
                <View style={styles.bottomSection}>
                  <Text>
                    {SelectedMealType}{' '}
                    {SelectedMealType == 'Dinner' ? 'End' : 'Start'} Time
                  </Text>
                  <View style={styles.TextInputArea}>
                    <TextInput
                      maxLength={2}
                      style={styles.TextInputStyles}
                      allowFontScaling={false}
                      onChangeText={text => setHH(text)}
                      placeholder="HH"
                      placeholderTextColor="gray"
                      keyboardType="number-pad"
                      keyboardAppearance="default"
                    />
                    <TextInput
                      maxLength={2}
                      style={styles.TextInputStyles}
                      allowFontScaling={false}
                      onChangeText={text => setMM(text)}
                      placeholder="MM"
                      placeholderTextColor="gray"
                      keyboardType="number-pad"
                      keyboardAppearance="default"
                    />
                  </View>
                  <View style={styles.AMPMView}>
                    {data.length > 0
                      ? data.map((item, index) => (
                          <TouchableOpacity
                            onPress={() => {
                              setselectedAMPM(index), Keyboard.dismiss();
                            }}
                            style={{
                              ...styles.highLightAreaView,
                              backgroundColor:
                                selectedAMPM == index ? Colors.LITEGREEN : null,
                              borderWidth: selectedAMPM == index ? null : 0.5,
                            }}
                            key={item.id}>
                            <Text
                              style={{
                                ...styles.AMPMTextStyle,
                                color:
                                  selectedAMPM == index
                                    ? Colors.WHITE
                                    : Colors.BLACK,
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        ))
                      : null}
                  </View>
                  <Text>Intake Quantity</Text>
                  <TextInput
                    style={{
                      ...styles.TextInputStyles,
                      width: '100%',
                      marginVertical: 10,
                    }}
                    keyboardType={
                      Platform.OS === 'ios' ? 'decimal-pad' : 'default'
                    }
                    allowFontScaling={false}
                    onChangeText={text => setQuantity(text)}
                    placeholder="Ounces"
                    placeholderTextColor="gray"
                  />
                  <Text style={styles.helpingText}>
                    Number in ounces with two decimal points(125.02)
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                disabled={showLoader}
                onPress={() => Save()}
                style={styles.ButtonStyle}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
          {showLoader ? <CustomLoader showLoader={showLoader} /> : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(React.memo(MealQuantity));
