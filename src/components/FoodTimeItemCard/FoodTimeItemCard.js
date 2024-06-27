//react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//custom components
import SmallgreenCard from '../../components/SmallgreenCard/SmallgreenCard';
import ItemHeader from '../../components/ItemHeader/ItemHeader';
import TypeFoodItem from '../../components/TypeFoodItem/TypeFoodItem';
import FoodTimeItem from '../../components/FoodTimeItem/FoodTimeItem';
//styles
import {styles} from './FoodTimeItemCardStyle';
//redux
import {connect, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {Server} from '../../global';
import {CustomAlertAction} from '../../redux/actions/actions';

const FoodTimeItemCard = ({
  Data,
  setData,
  startTime,
  setStartTime,
  FoodTime,
  bodyMsg,
  userToken,
}) => {
  const timeIndex = () => {
    if (startTime) {
      if (startTime?.ext == 'AM') {
        return 0;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  };
  const dispatch = useDispatch();
  //states
  const [foodName, setfoodName] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [FoodList, setFoodList] = useState([]);
  const [HH, setHH] = useState(0);
  const [MM, setMM] = useState(0);
  const [selectedAMPMValue, setselectedAMPMValue] = useState(timeIndex());
  const [editable, seteditable] = useState(true);
  const [showLoader, setshowLoader] = useState(false);
  //data

  const AMPM_Data = [
    {
      id: 1,
      name: 'AM',
    },
    {
      id: 2,
      name: 'PM',
    },
  ];
  //function : imp function
  const searchFoodByName = async text => {
    setfoodName(text);
    try {
      setshowLoader(true);
      const endPoint = `${Server.SEARCH_MEAL}${text}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);
      if (resp?.data?.status) {
        setFoodList(resp?.data?.data);
        setshowLoader(false);
      }
    } catch (error) {
      console.error('error in searchFoodByName', error);
      setshowLoader(false);
    }
  };
  const AddFood = () => {
    var numReg = /[^0-9.]|\.(?=.*\.)/g;
    var reg = /[^0-9.]/g;
    if (foodName != '') {
      if (Quantity != '') {
        if (!numReg.test(Quantity)) {
          if (!reg.test(Quantity)) {
            const data = {
              id: Data.length + 1,
              foodName: foodName,
              Quantity: Quantity,
            };
            setData([...Data, data]);
            setfoodName('');
            setQuantity('');
            setFoodList([]);
          } else
            dispatch(
              CustomAlertAction.showToast('Enter valid value in ounces'),
            );
        } else
          dispatch(CustomAlertAction.showToast('Enter valid value in ounces'));
      } else dispatch(CustomAlertAction.showToast('Enter value in ounces'));
    } else dispatch(CustomAlertAction.showToast('Enter Food name'));
  };
  const addFoodTime = () => {
    if (HH != undefined && HH != 0) {
      if (MM != undefined) {
        if (HH <= 24) {
          if (MM <= 59) {
            const timeData = {
              hh: HH,
              mm: MM,
              ext: AMPM_Data[selectedAMPMValue].name,
            };
            setStartTime(timeData);
            seteditable(false);
            dispatch(
              CustomAlertAction.showToast(`${FoodTime} time set successfully`),
            );
          } else
            dispatch(
              CustomAlertAction.showToast('Enter Minutes in 60 minutes'),
            );
        } else dispatch(CustomAlertAction.showToast('Enter time in 24 hours'));
      } else dispatch(CustomAlertAction.showToast('Enter MM field'));
    } else dispatch(CustomAlertAction.showToast('Enter HH field'));
  };
  // //function : render function
  // const foodListRender=({item,index})=>{
  //     return(

  //     )
  // }
  //UI
  return (
    <View style={styles.CardStyle}>
      <ItemHeader HeaderTitle={FoodTime} />
      <View style={styles.cardBody}>
        <TypeFoodItem
          onPress={AddFood}
          FoodName={foodName.toString()}
          setFoodName={searchFoodByName}
          Quantity={Quantity.toString()}
          setQuantity={setQuantity}
        />
        {FoodList.length > 0 ? (
          FoodList.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => setfoodName(item.meal_title)}
              style={{...styles.FoodListView, borderBottomWidth: 0.5}}>
              <Text style={styles.foodlistText}>{item?.meal_title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator
            animating={showLoader}
            size="large"
            color="#f39322"
          />
        )}
        {/* <FlatList
                data={FoodList}
                renderItem={foodListRender}
                keyExtractor={item=>item.id}
                /> */}
        {bodyMsg ? (
          <Text style={styles.BodyMsgTextStyle}>No Foods Added</Text>
        ) : (
          <>
            {Data?.length > 0
              ? Data?.map((item, index) => (
                  <SmallgreenCard
                    key={item.id}
                    id={item.id}
                    Data={Data}
                    setData={setData}
                    TitleName={item.foodName}
                    FirstTextInputPlaceholder={item.Quantity}
                    editable={false}
                    setStartTime={setStartTime}
                    BottomInputText="Number in ounces with two decimal points(125.02)"
                  />
                ))
              : null}
            <FoodTimeItem
              setHH={setHH}
              setMM={setMM}
              FoodTime={FoodTime}
              AMPM_Data={AMPM_Data}
              HHPlaceHolder={
                startTime?.hasOwnProperty('hh')
                  ? startTime?.hh.toString()
                  : 'HH'
              }
              MMPlaceholder={
                startTime?.hasOwnProperty('mm')
                  ? startTime?.mm.toString()
                  : 'MM'
              }
              selectedAMPMValue={selectedAMPMValue}
              setselectedAMPMValue={setselectedAMPMValue}
              onPress={addFoodTime}
              editable={editable}
            />
          </>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(React.memo(FoodTimeItemCard));
