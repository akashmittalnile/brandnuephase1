//react components
import React, {useState} from 'react';
import {View, Text, Keyboard, TouchableOpacity,Platform} from 'react-native';
//custom components
import ItemHeader from '../ItemHeader/ItemHeader';
import TypeFoodItem from '../TypeFoodItem/TypeFoodItem';
//third parties components
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//global
import {Colors, Server} from '../../global';
//styles
import {styles} from './SnackCategoryStyle';
//svg
import ClockSvg from '../../assets/svg/time.svg';
import CrossSvg from '../../assets/svg/x.svg';
//redux
import {connect, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {CustomAlertAction} from '../../redux/actions/actions';
import DateTimePicker from '@react-native-community/datetimepicker';

const SnackCategory = ({
  Data,
  setData,
  userToken,
  routeFlag,
  onPress = () => {},
}) => {
  const dispatch = useDispatch();
  //states
  const [date, setDate] = useState(new Date());
  const [foodName, setFoodName] = useState('');
  const [value, setValue] = useState(0);
  const [showLoader, setshowLoader] = useState(false);
  const [FoodList, setFoodList] = useState([]);
  //function :imp function
  const addSnack = () => {
    var reg = /[^0-9.]/g;
    var numReg = /[^0-9.]|\.(?=.*\.)/g;
    if (foodName != '') {
      if (!numReg.test(value)) {
        if (!reg.test(value)) {
          const data = {
            id: Data.length + 1,
            foodName: foodName,
            Quantity: value,
          };
          setData([...Data, data]);
          Keyboard.dismiss();
          setFoodName('');
          setFoodList([]);
          setValue(0);
        } else
          dispatch(
            CustomAlertAction.showToast('Please enter valid value in ounces'),
          );
      } else
        dispatch(
          CustomAlertAction.showToast('Please enter valid value in ounces'),
        );
    } else dispatch(CustomAlertAction.showToast(`Please enter Snack`));
  };
  //function : service function
  const searchFoodByName = async text => {
    setFoodName(text);
    try {
      setshowLoader(true);
      const endPoint = `${Server.SEARCH_MEAL}${text}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);
      if (resp?.data?.status) {
        setFoodList(resp?.data?.data);
        setshowLoader(false);
      }
    } catch (error) {
      console.log('error in searchFoodByName', error);
      setshowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.CardStyle}>
      <ItemHeader
        HeaderTitle="Snack"
        LinkText="See Guidelines"
        onPress={onPress}
      />
      <View style={styles.cardBody}>
        <TypeFoodItem
          FoodName={foodName.toString()}
          setFoodName={searchFoodByName}
          Quantity={value}
          setQuantity={setValue}
          onPress={addSnack}
        />
        {FoodList.length > 0 ? (
          FoodList.map((item, index) => (
            <TouchableOpacity
              onPress={() => setFoodName(item.meal_title)}
              key={index}
              style={{...styles.FoodListView, borderBottomWidth: 0.5}}>
              <Text style={styles.TitleText}>{item?.meal_title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator
            animating={showLoader}
            size="large"
            color={Colors.ORANGE}
            style={{marginVertical: 10}}
          />
        )}
        {Data.length > 0 ? (
          Data.map((Item, index) => {
            return (
              <SnackList
                key={index}
                Id={Item.id}
                Title={Item?.foodName}
                Value={Item?.Quantity}
                Time={Item?.start_time}
                Data={Data}
                setData={setData}
                routeFlag={routeFlag}
              />
            );
          })
        ) : (
          <Text style={styles.nullBodyText}>No Foods Added</Text>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(SnackCategory);

//snack listing components
export const SnackList = ({
  Id,
  Title,
  Value,
  Time,
  Data,
  setData,
  routeFlag,
}) => {
  //states
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  //function : imp function
  const setFoodTime = time => {
    const foodTime = {
      hh: moment(time).format('hh'),
      mm: moment(time).format('mm'),
      ext: moment(time).format('a'),
    };
    const index = Data.findIndex(e => e.id == Id);
    const newArray = [...Data];
    newArray[index] = {...newArray[index], start_time: foodTime};
    setData(newArray);
    setSelectedDate(time);
  };
  const removeItem = () => {
    const data = Data.filter(e => e.id != Id);
    setData(data);
  };
  //UI
  return (
    <View style={styles.ItemsSectionView}>
      <View style={styles.flexRowStyle}>
        <Text style={{...styles.TitleText, fontSize: 16}}>{Title}</Text>
        <Text style={styles.TitleText}>{Value} Ounces</Text>
        <TouchableOpacity onPress={removeItem} style={styles.IconView}>
          <CrossSvg />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.flexRowStyle,
          backgroundColor: Colors.WHITE,
          marginVertical: 10,
          padding: 5,
        }}>
        {routeFlag == 0 ? (
          <Text style={styles.TitleText}>
            {selectedDate == undefined
              ? 'Select Time'
              : moment(date).format('LT')}
          </Text>
        ) : (
          <Text style={styles.TitleText}>
            {Time == undefined
              ? 'Select Time'
              : `${Time?.hh}:${Time?.mm} ${Time?.ext}`}
          </Text>
        )}

        <TouchableOpacity onPress={() => setOpen(true)}>
          <ClockSvg />
        </TouchableOpacity>
      </View>
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
          mode={'time'}
          display="spinner"
          textColor="#000"
          onChange={
            (event, selectedDate) => {
              const currentDate = selectedDate;
              setFoodTime(currentDate);
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
        open={open}
        mode="time"
        date={date}
        onConfirm={date => {
          setOpen(false);
          setFoodTime(date);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      }
    </View>
  );
};
