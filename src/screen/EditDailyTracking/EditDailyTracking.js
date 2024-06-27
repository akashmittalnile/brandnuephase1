//react components
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
//cutsom compnents
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import TextInputArea from '../../components/TextInputArea/TextInputArea';
import SmallGreenItem from '../../components/SmallGreenItem/SmallGreenItem';
import ItemHeader from '../../components/ItemHeader/ItemHeader';
import MyRadioButton from '../../components/MyRadioButton/MyRadioButton';
import SnackCategory from '../../components/SnackCategory/SnackCategory';
import TextIconItem from '../../components/TextIconItem/TextIconItem';
import SmallgreenCard from '../../components/SmallgreenCard/SmallgreenCard';
import FoodTimeItemCard from '../../components/FoodTimeItemCard/FoodTimeItemCard';
import MyButton from '../../components/MyButton/MyButton';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//third parties
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
//modal
import SelectModal from '../../components/modal/SelectModal/SelectModal';
import HowToMeasure from '../../components/modal/HowToMeasure/HowToMeasure';
import SnackGuidelines from '../../components/modal/SnackGuidelines/SnackGuidelines';
//styles
import {styles} from './EditDailyTrackingStyle';
//svg
import CalendarSvg from '../../assets/svg/calendar1.svg';
import ClockSvg from '../../assets/svg/time.svg';
import DropDownSvg from '../../assets/svg/dropdown-arrow.svg';
//global
import {Colors, ScreenNames, Server} from '../../global';
//redux
import {connect, useDispatch} from 'react-redux';
import {useKeyboard} from '../../hooks/isKeyBoardOpen';
import {CustomAlertAction} from '../../redux/actions/actions';
import {heightToDp} from '../../global/Constant';

const EditDailyTracking = ({navigation, userToken, route}) => {
  //hook : ref
  const currentWeightField = useRef();
  const currentWaistField = useRef();
  const waterIntakeRef = useRef();
  //variables : route variable
  const routeFlag = route.params.flag;
  const data = routeFlag == 0 ? [] : route.params.data;
  //variables : hooks
  const dispatch = useDispatch();
  const isKeyBoardOpen = useKeyboard();
  //data
  const bowelMovementData = [
    {
      id: 1,
      name: 'Yes',
      value: 'Y',
    },
    {
      id: 2,
      name: 'No',
      value: 'N',
    },
  ];
  //hook : States
  const [showLoader, setshowLoader] = useState(false);
  const [CurrentWeight, setCurrentWeight] = useState(
    routeFlag == 0 ? '' : data?.current_day_weight,
  );
  const [CurrentWaist, setCurrentWaist] = useState(
    routeFlag == 0 ? '' : data?.current_day_waist_measurement,
  );
  const [WaterIntake, setWaterIntake] = useState(
    routeFlag == 0 ? 0 : data?.water_intake,
  );
  const [selectedBowelMovement, setSelectedBowelMovement] = useState(
    routeFlag == 0 ? 0 : data?.bowel_movement == 'Y' ? 0 : 1,
  );
  //---->modal data
  const [showSnackGuideline, setShowSnackGuideline] = useState(false);
  const [howToMeasureModal, sethowToMeasureModal] = useState(false);
  const [selectedModalData, setselectedModalData] = useState([]);
  const [showSelectModal, setshowSelectModal] = useState(false);
  const [modalTitle, setmodalTitle] = useState('');
  const [flag, setflag] = useState();
  //---->supplement
  const [supplementData, setsupplementData] = useState([]);
  const [OtherSupplementId, setOtherSupplementId] = useState(100);
  const [otherSupplement, setOtherSupplement] = useState('');
  const [SelectedSupplementData, setSelectedSupplementData] = useState(
    routeFlag == 0 ? [] : data?.supplement,
  );
  ///---->exercise
  const [exerciseData, setexerciseData] = useState([]);
  const [SelectedExerciseData, setSelectedExerciseData] = useState(
    routeFlag == 0 ? [] : data?.exercise,
  );
  const [LunchTime, setLunchTime] = useState(
    routeFlag == 0 ? {} : data?.lunch?.start_time,
  );
  const [Lunch, setLunch] = useState(
    routeFlag == 0 ? [] : data?.lunch?.food_type,
  );
  const [Snack, setSnack] = useState(routeFlag == 0 ? [] : data?.snack);
  const [DinnerTime, setDinnerTime] = useState(
    routeFlag == 0 ? {} : data?.dinner?.end_time,
  );
  const [Dinner, setDinner] = useState(
    routeFlag == 0 ? [] : data?.dinner?.food_type,
  );
  const [note, setNote] = useState(routeFlag == 0 ? '' : data?.note);
  //function : imp function
  const selectMMValue = value => {
    if (value) {
      return value;
    } else {
      return 'Minutes';
    }
  };
  const Exercise_time_validation = () => {
    const value = SelectedExerciseData.map(e => e.hasOwnProperty('mm'));
    const checkExists = value.includes(false);
    if (checkExists) {
      dispatch(CustomAlertAction.showToast('Enter exercise time'));
    } else {
      return true;
    }
  };
  const getTotalExerciseDuration = () => {
    let dummyTotolMM = 0;
    if (SelectedExerciseData.length > 0) {
      SelectedExerciseData.forEach(e => {
        dummyTotolMM += parseInt(e.mm ? e.mm : 0);
      });
      return {
        mm: dummyTotolMM,
      };
    } else {
      return {
        mm: dummyTotolMM,
      };
    }
  };

  const ClearValueFunction = () => {
    setCurrentWeight('');
    setCurrentWaist('');
    setWaterIntake(0);
    setSelectedSupplementData([]);
    setSelectedExerciseData([]);
    setLunchTime({});
    setDinnerTime({});
    setLunch([]);
    setSnack([]);
    setDinner([]);
  };

  const Add_Validation = () => {
    var OneDecimalPoint = /^(\d*)\.{0,1}(\d){0,1}$/;
    if (CurrentWeight != '') {
      var reg = /[^0-9.]|\.(?=.*\.)/g;
      if (!reg.test(CurrentWeight)) {
        if (!reg.test(CurrentWaist)) {
          if (WaterIntake == null || !reg.test(WaterIntake)) {
            if (!reg.test(WaterIntake)) {
              if (Exercise_time_validation()) {
                if (OneDecimalPoint.test(CurrentWeight)) {
                  if (routeFlag == 0) {
                    if (AddValidation()) {
                      sendDailyTrackingReport();
                    }
                  } else {
                    if (AddValidation()) {
                      editDailyTrackingReport();
                    }
                  }
                } else {
                  currentWeightField.current.focus();
                  dispatch(
                    CustomAlertAction.showToast('Enter valid current weight'),
                  );
                }
              } else
                dispatch(CustomAlertAction.showToast('Enter exercise time'));
            } else {
              waterIntakeRef.current.focus();
              dispatch(CustomAlertAction.showToast(`Enter valid water intake`));
            }
          } else {
            waterIntakeRef.current.focus();
            dispatch(CustomAlertAction.showToast('Enter valid water intake'));
          }
        } else {
          currentWaistField.current.focus();
          dispatch(CustomAlertAction.showToast(`Enter valid today's waist`));
        }
      } else {
        currentWeightField.current.focus();
        dispatch(CustomAlertAction.showToast(`Enter valid today's weight`));
      }
    } else {
      currentWeightField.current.focus();
      dispatch(CustomAlertAction.showToast(`Enter today's weight`));
    }
  };
  const AddValidation = () => {
    if (Lunch.length > 0 && JSON.stringify(LunchTime) === JSON.stringify({})) {
      dispatch(CustomAlertAction.showToast('Set the Lunch time'));
    } else if (
      Dinner.length > 0 &&
      JSON.stringify(DinnerTime) === JSON.stringify({})
    ) {
      dispatch(CustomAlertAction.showToast('Set the Dinner time'));
    } else return true;
  };
  const Validation = () => {
    if (Lunch.length > 0 && JSON.stringify(LunchTime) === JSON.stringify({})) {
      dispatch(CustomAlertAction.showToast('Set the lunch time'));
    } else if (Dinner.length > 0 && DinnerTime === undefined) {
      dispatch(CustomAlertAction.showToast('Set the dinner time'));
    } else return true;
  };
  const CheckOtherSuppExist = () => {
    const index = SelectedSupplementData?.findIndex(e => e.name == 'Others');
    if (index > -1) {
      return true;
    } else false;
  };
  const addSuppByTextInput = () => {
    const index = SelectedSupplementData.findIndex(
      e => e.name.toUpperCase() === otherSupplement.toUpperCase(),
    );
    if (index > -1) {
      dispatch(
        CustomAlertAction.showToast(
          `${otherSupplement} already added into supplemts`,
        ),
      );
    } else {
      const data = {
        id: OtherSupplementId,
        name: otherSupplement,
      };
      setSelectedSupplementData([...SelectedSupplementData, data]);
      setOtherSupplementId(OtherSupplementId + 1);
      setOtherSupplement('');
    }
  };
  //function : service function
  const getSupplimentList = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.SUPPLEMENT_LIST,
      );
      if (resp.data.status) {
        const tempData = resp.data.data;
        const otherData = {
          id: resp?.data?.data?.length + 1,
          name: 'Others',
        };
        tempData.push(otherData);
        setsupplementData(tempData);
      } else dispatch(CustomAlertAction.showToast('Something went wrong!'));
    } catch (error) {
      console.log('error in getSupplimentList', error);
    }
  };
  const getExerciseList = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.EXERCISE_LIST,
      );
      if (resp.data.status) {
        setexerciseData(resp.data.data);
      } else dispatch(CustomAlertAction.showToast('Something went wrong!'));
    } catch (error) {
      console.log('error in getExerciseList', error);
    }
  };
  const sendDailyTrackingReport = async () => {
    setshowLoader(true);
    const DailyReportData = {
      track_date: moment(route?.params?.date).format(`MM/DD/YYYY`),
      current_day_weight: CurrentWeight,
      current_day_waist_measurement: CurrentWaist,
      water_intake: parseFloat(WaterIntake).toFixed(2),
      bowel_movement: bowelMovementData[selectedBowelMovement].value,
      supplement: SelectedSupplementData,
      exercise: SelectedExerciseData,
      total_exercise_duration: getTotalExerciseDuration(),
      lunch: {start_time: LunchTime ? LunchTime : {}, food_type: Lunch},
      snack: Snack,
      dinner: {end_time: DinnerTime ? DinnerTime : {}, food_type: Dinner},
      note: note,
    };
    try {
      const resp = await Server.postApiWithToken(
        userToken,
        Server.STORE_DAILY_TRACKING,
        DailyReportData,
      );
      if (resp.data.status) {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        setshowLoader(false);
        navigation.navigate(ScreenNames.DAILY_TRACKING);
        ClearValueFunction();
      } else {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        setshowLoader(false);
      }
    } catch (error) {
      console.log('error in sendDailyTrackingReport', error);
      setshowLoader(false);
    }
  };

  const editDailyTrackingReport = async () => {
    setshowLoader(true);
    const DailyReportData = {
      track_date: moment(data.created_at).format(`MM/DD/YYYY`),
      current_day_weight: CurrentWeight
        ? CurrentWeight
        : data.current_day_weight,
      current_day_waist_measurement: CurrentWaist
        ? parseFloat(CurrentWaist).toFixed(2)
        : data.current_day_waist_measurement,
      water_intake: WaterIntake
        ? parseFloat(WaterIntake).toFixed(2)
        : data.water_intake,
      bowel_movement: bowelMovementData[selectedBowelMovement].value,
      supplement: SelectedSupplementData,
      exercise: SelectedExerciseData,
      total_exercise_duration: getTotalExerciseDuration(),
      lunch: {start_time: Lunch.length > 0 ? LunchTime : {}, food_type: Lunch},
      snack: Snack,
      dinner: {
        end_time: Dinner.length > 0 ? DinnerTime : {},
        food_type: Dinner,
      },
      note: note,
    };
    try {
      const endPoint = `${Server.UPDATE_DAILY_TRACKING}${data.id}`;
      const resp = await Server.putApiWithToken(
        userToken,
        endPoint,
        DailyReportData,
      );
      if (resp.data.status) {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        setshowLoader(false);
        navigation.navigate(ScreenNames.DAILY_TRACKING);
        ClearValueFunction();
      } else {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        setshowLoader(false);
      }
    } catch (error) {
      console.log('error in editDailyTrackingReport', error);
      setshowLoader(false);
    }
  };
  //useEffect
  useEffect(() => {
    getSupplimentList();
    getExerciseList();
    return () => {
      ClearValueFunction();
    };
  }, [userToken]);

  //UI
  return (
    <KeyboardAvoidingView
      behavior={Platform === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <SimpleHeader headerName="Daily Tracking" />
        <KeyboardAwareScrollView style={styles.mainView}>
          {/* first card section */}
          <View style={styles.CardStyle}>
            <ItemHeader HeaderTitle="Please Enter Details" />
            <View style={styles.cardBody}>
              <Text style={styles.firstCardSectionBodyDateText}>Date *</Text>
              <TextIconItem
                TitleText={
                  routeFlag == 0
                    ? moment(route?.params?.date).format(`MM/DD/YYYY`)
                    : moment(data?.track_date).format(`MM/DD/YYYY`)
                }
                Svg={<CalendarSvg />}
                disabled={true}
              />
              <TextInputArea
                textInputTitle="Today's Weight"
                value={CurrentWeight}
                setValue={setCurrentWeight}
                placeholderTextColor="gray"
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'default'}
                required={true}
                myTextInputRef={currentWeightField}
                onSubmitEditing={() => currentWaistField.current.focus()}
                textInputBottomText="Number in pounds with one decimal point for ounce(300.1)"
                placeholder={routeFlag == 0 ? '00.0' : data?.current_day_weight}
                TextInputBorder={true}
              />
              <TextInputArea
                textInputTitle="Today's Waist Measurement"
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'default'}
                value={CurrentWaist}
                myTextInputRef={currentWaistField}
                placeholderTextColor="gray"
                onSubmitEditing={() => currentWaistField.current.focus()}
                AnotherLinkText={'How to measure'}
                anotherLinkButtonPress={() => sethowToMeasureModal(true)}
                setValue={setCurrentWaist}
                placeholder={
                  routeFlag == 0
                    ? 'Inches'
                    : data?.current_day_waist_measurement
                }
                TextInputBorder={true}
              />
              <View style={styles.SupplementView}>
                <Text style={styles.titleTextStyle}>Supplements Taken</Text>
                <TouchableOpacity
                  onPress={() => {
                    setflag(1);
                    setshowSelectModal(true);
                    setselectedModalData(supplementData);
                    setmodalTitle('Select Supplement');
                  }}
                  style={styles.SelectSupplementView}>
                  <Text>{'Select Supplement'}</Text>
                  <DropDownSvg />
                </TouchableOpacity>
                {CheckOtherSuppExist() ? (
                  <View style={styles.otherSuppView}>
                    <TextInput
                      value={otherSupplement}
                      placeholder="Enter Supplement"
                      onChangeText={text => setOtherSupplement(text)}
                      placeholderTextColor={Colors.BLACK}
                      style={styles.otherSuppTextInput}
                    />
                    <TouchableOpacity
                      style={styles.addButtonView}
                      onPress={addSuppByTextInput}>
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              {SelectedSupplementData?.length > 0 ? (
                <View style={styles.greenSmallItemView}>
                  {SelectedSupplementData?.map((item, index) => (
                    <SmallGreenItem
                      Data={SelectedSupplementData}
                      setData={setSelectedSupplementData}
                      key={item.id}
                      id={item.id}
                      removeButton={true}
                      name={item.name}
                    />
                  ))}
                </View>
              ) : null}
              <TextInputArea
                myTextInputRef={waterIntakeRef}
                textInputTitle="Water Intake"
                value={WaterIntake}
                setValue={setWaterIntake}
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'default'}
                textInputBottomText="Number in ounces with two decimal points(125.02)"
                placeholder={
                  routeFlag == 0 ? 'Number in ounces' : data.water_intake
                }
                placeholderTextColor="gray"
                TextInputBorder={true}
              />
              <View>
                <Text style={styles.firstCardSectionBodyDateText}>
                  Bowel Movement
                </Text>
                <MyRadioButton
                  radioData={bowelMovementData}
                  selectedRadioValue={selectedBowelMovement}
                  setSelectedRadioValue={setSelectedBowelMovement}
                />
              </View>
            </View>
          </View>
          {/* exercise section */}
          <View style={styles.CardStyle}>
            <ItemHeader HeaderTitle="Exercise" />
            <View style={styles.cardBody}>
              <View style={styles.SupplementView}>
                <Text style={styles.titleTextStyle}>Exercise</Text>
                <TouchableOpacity
                  onPress={() => {
                    setflag(2);
                    setshowSelectModal(true);
                    setselectedModalData(exerciseData);
                    setmodalTitle('Select Exercise');
                  }}
                  style={styles.SelectSupplementView}>
                  <Text>Select Exercise</Text>
                  <DropDownSvg />
                </TouchableOpacity>
              </View>
              {SelectedExerciseData?.length > 0
                ? SelectedExerciseData?.map((item, index) => (
                    <SmallgreenCard
                      key={item.id}
                      id={item.id}
                      Data={SelectedExerciseData}
                      setData={setSelectedExerciseData}
                      TitleName={item.name}
                      FirstTextInputPlaceholder={
                        routeFlag == 0
                          ? 'Enter Minutes'
                          : selectMMValue(item.mm)
                      }
                      keyboardType="number-pad"
                     
                      maxLength={3}
                    />
                  ))
                : null}
              <View style={{height: 10}} />
              <Text style={styles.firstCardSectionBodyDateText}>
                Total Exercise Duration
              </Text>
              <TextIconItem
                TitleText={getTotalExerciseDuration().mm}
                Svg={<ClockSvg />}
                disabled={true}
              />
            </View>
          </View>
          {/* <FoodTimeItemCard
            FoodTime="Breakfast"
            Data={BreakFast}
            setData={setBreakFast}
            startTime={BreakFastTime}
            setStartTime={setBreakFastTime}
            bodyMsg={BreakFast?.length > 0 ? false : true}
          /> */}
          <FoodTimeItemCard
            FoodTime="Lunch"
            Data={Lunch}
            setData={setLunch}
            startTime={LunchTime}
            setStartTime={setLunchTime}
            bodyMsg={Lunch?.length > 0 ? false : true}
          />
          <FoodTimeItemCard
            FoodTime="Dinner"
            Data={Dinner}
            setData={setDinner}
            startTime={DinnerTime}
            setStartTime={setDinnerTime}
            bodyMsg={Dinner?.length > 0 ? false : true}
          />
          {/* <FoodTimeItemCard
            FoodTime="Snack"
            Data={Snack}
            setData={setSnack}
            startTime={SnackTime}
            setStartTime={setSnackTime}
            bodyMsg={Snack?.length > 0 ? false : true}
          /> */}
          <SnackCategory
            Data={Snack}
            setData={setSnack}
            routeFlag={routeFlag}
            onPress={() => setShowSnackGuideline(true)}
          />
          <View style={styles.noteView}>
            <Text style={styles.noteText}>Note</Text>
            <TextInput
              value={note}
              placeholder="Enter note"
              placeholderTextColor="gray"
              onChangeText={text => setNote(text)}
              multiline
              numberOfLines={5}
              style={styles.noteTextInput}
            />
          </View>

          <MyButton ButtonTitle="Submit" onPress={Add_Validation} />
          <View style={{height: isKeyBoardOpen ? 50 : 40}} />
        </KeyboardAwareScrollView>
        <HowToMeasure
          visible={howToMeasureModal}
          setVisibility={sethowToMeasureModal}
        />
        <SelectModal
          visible={showSelectModal}
          setVisible={setshowSelectModal}
          SelectModalTitle={modalTitle}
          data={selectedModalData}
          SelectedItem={
            flag == 1 ? setSelectedSupplementData : setSelectedExerciseData
          }
          SelectedItems={
            flag == 1 ? SelectedSupplementData : SelectedExerciseData
          }
        />
        <CustomLoader showLoader={showLoader} />
      </View>
      <SnackGuidelines
        visible={showSnackGuideline}
        setVisibility={setShowSnackGuideline}
      />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(EditDailyTracking);
