//react components
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView,Platform} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import AddMealItem from '../../components/AddMealItem/AddMealItem';
//third parties
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//global
import {ScreenNames, Server} from '../../global';
//styles
import {styles} from './AddedMealsStyle';
//svg
import CalendarSvg from '../../assets/svg/calendar1.svg';
import PlusSvg from '../../assets/svg/plus.svg';
//redux
import {connect} from 'react-redux';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddedMeals = ({userToken, navigation}) => {
  //States
  const [showLoader, setShowLoader] = useState(false);
  const [AddedMealsData, setAddedMealsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  //function : navigation function
  const gotoDigitalLibrary = () =>
    navigation.navigate(ScreenNames.DIGITAL_LIBRARY);
  const gotoItemsListing = () => navigation.navigate(ScreenNames.ITEM_LISTING);
  //function : imp function
  //function : service function
  const getAllAddedMeal = async () => {
    setShowLoader(true);
    try {
      const SelectedDate = moment(date).format(`MM/DD/YYYY`);
      const endPoint = `${Server.ADDED_MEAL_LIST}${SelectedDate}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);
      if (resp.data.status) {
        setAddedMealsData(resp.data.data);
      }
    } catch (error) {
      console.log('error in getAllAddedMeal', error);
    }
    setShowLoader(false);
  };

  //useEffect
  useEffect(() => {
    getAllAddedMeal();
    return () => {};
  }, [date]);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Added Meals" />
      <View style={styles.mainView}>
        <View style={styles.dateSection}>
          <Text>{moment(date).format('dddd,LL')}</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <CalendarSvg />
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
        />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}>
          {AddedMealsData?.lunch
            ? AddedMealsData?.lunch?.food_type.map((item, index) => (
                <AddMealItem
                  key={index}
                  name={item.foodName}
                  desc={`Lunch-Intake Quantity: ${item.Quantity} Ounce`}
                  isVeg={false}
                />
              ))
            : null}
          {AddedMealsData?.dinner
            ? AddedMealsData?.dinner?.food_type.map((item, index) => (
                <AddMealItem
                  key={index}
                  name={item.foodName}
                  desc={`Dinner-Intake Quantity: ${item.Quantity} Ounce`}
                  isVeg={false}
                />
              ))
            : null}
          {AddedMealsData?.snack?.length > 0
            ? AddedMealsData?.snack?.map((item, index) => (
                <AddMealItem
                  key={index}
                  name={item.foodName}
                  desc={`Snack-Intake Quantity: ${item.Quantity} Ounce`}
                  isVeg={false}
                />
              ))
            : null}

          <TouchableOpacity
            onPress={() => gotoDigitalLibrary()}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Explore Digital Library</Text>
          </TouchableOpacity>
          <View style={{height: 100}} />
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => gotoItemsListing()}
        style={styles.FABbuttonStyle}>
        <PlusSvg />
      </TouchableOpacity>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(AddedMeals);
