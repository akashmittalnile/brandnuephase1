//import : react components
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert,Platform} from 'react-native';
//import : components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import TrackerReportItem from '../../components/TrackerReportItem/TrackerReportItem';
import WeightMachineCard from '../../components/WeightMachineCard/WeightMachineCard';
import SmallGreenItem from '../../components/SmallGreenItem/SmallGreenItem';
import TextIconItem from '../../components/TextIconItem/TextIconItem';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//import : third parties
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
//import : global
import {Colors, ScreenNames, Server} from '../../global';
//import : styles
import {styles} from './TrackerReportStyle';
//import : svg
import CalendarSvg from '../../assets/svg/calendar1.svg';
import PlusSvg from '../../assets/svg/plus.svg';
//import : redux
import {connect} from 'react-redux';
import {CustomAlertAction} from '../../redux/actions/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postAPI } from 'global/Server';
import { color } from 'react-native-reanimated';

const TrackerReport = ({navigation, userToken, dispatch, route}) => {
  //hook : states
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showLoader, setshowLoader] = useState(false);
  const [DailyTrackingData, setDailyTrackingData] = useState([]);
  //function : navigation function
  const gotoDailyTrackingReport = () => {
    navigation.navigate(ScreenNames.EDIT_DAILY_TRACKING, {
      flag: 0,
      date: date,
    });
  };
  const gotoEditDailyTracking = () => {
    navigation.navigate(ScreenNames.EDIT_DAILY_TRACKING, {
      flag: 1,
      data: {
        ...DailyTrackingData,
        current_day_waist_measurement:
          DailyTrackingData.current_day_waist_measurement
            ? DailyTrackingData.current_day_waist_measurement
            : '',
      },
    });
  };
  //function : service function
  const getDailyTrackingList = async () => {
    setshowLoader(true);
    try {
      const SelectedDate = moment(date).format(`MM/DD/YYYY`);
      const endPoint = `${Server.DAILY_TRACKING_BY_DATE}${SelectedDate}`;
      const {response, status} = await Server.getAPI(endPoint, userToken);
      if (status) {
        if (response.data) {
          setDailyTrackingData(response.data);
          setshowLoader(false);
        } else {
          setDailyTrackingData([]);
          setshowLoader(false);
        }
      }
    } catch (error) {
      console.log('error in getDailyTrackingList', error);
      setshowLoader(false);
    }
  };
  const deleteTrackSheetById = async () => {
    setshowLoader(true);
    try {
      const endPoint = `${Server.DELETE_DAILY_TRACKING}${DailyTrackingData.id}`;
      const {response, status} = await Server.getAPI(endPoint, userToken);
      if (status) {
        dispatch(CustomAlertAction.showToast(response.msg));
        getDailyTrackingList();
      }
    } catch (error) {
      console.error('error in deleteTrackSheetById', error);
    }
    setshowLoader(false);
  };
  //hook : useEffect
  useEffect(() => {
    getDailyTrackingList();
    return () => {};
  }, [date]);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Tracker Report" />
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <TextIconItem
          TitleText={moment(date).format(`MM/DD/YYYY`)}
          Svg={<CalendarSvg />}
          onPress={() => setOpen(true)}

        />
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
        collapsable={true}
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
      {DailyTrackingData.length != 0 ? (
        <ScrollView style={styles.mainView}>
          <View style={styles.upperSection}>
            <WeightMachineCard
              weightText="Weight"
              weightValue={
                DailyTrackingData?.current_day_weight
                  ? `${parseFloat(
                      DailyTrackingData?.current_day_weight,
                    ).toFixed(1)} lbs`
                  : `lbs`
              }
              editButton={true}
              deleteButtonPress={() => deleteTrackSheetById()}
              editButtonPressed={() => gotoEditDailyTracking()}
            />
            <View style={styles.upperBodySection}>
              <View style={styles.listSectionView}>
                <Text style={styles.listSectionTitleText}>Weight :</Text>
                {DailyTrackingData?.current_day_weight ? (
                  <Text style={styles.listSectionText}>
                    {`${parseFloat(
                      DailyTrackingData?.current_day_weight,
                    ).toFixed(1)} Pounds`}
                  </Text>
                ) : (
                  <Text style={styles.listSectionText}>`Pounds`</Text>
                )}
              </View>
              <View style={styles.listSectionView}>
                <Text style={styles.listSectionTitleText}>
                  Waist Measurement:
                </Text>
                {DailyTrackingData?.current_day_waist_measurement ? (
                  <Text style={styles.listSectionText}>
                    {`${parseFloat(
                      DailyTrackingData?.current_day_waist_measurement,
                    ).toFixed(2)} Inch`}
                  </Text>
                ) : (
                  <Text style={styles.listSectionText}>'Inch'</Text>
                )}
              </View>
              {DailyTrackingData?.supplement?.length > 0 ? (
                <View style={styles.listSectionView}>
                  <Text style={styles.listSectionTitleText}>
                    Supplement Taken:
                  </Text>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {DailyTrackingData?.supplement.map((item, index) => (
                      <SmallGreenItem
                        Data={DailyTrackingData?.supplement}
                        key={index.toString()}
                        id={item.id}
                        name={item.name}
                      />
                    ))}
                  </View>
                </View>
              ) : null}
              <View style={styles.listSectionView}>
                <Text style={styles.listSectionTitleText}>Water Intake:</Text>
                <Text style={styles.listSectionText}>
                  {DailyTrackingData?.water_intake
                    ? `${DailyTrackingData?.water_intake} Ounces`
                    : `Ounces`}
                </Text>
              </View>
              <View style={styles.listSectionView}>
                <Text style={styles.listSectionTitleText}>Note:</Text>
                <Text style={styles.listSectionText}>
                  {DailyTrackingData?.note ? `${DailyTrackingData?.note}` : ``}
                </Text>
              </View>
              <View
                style={{
                  ...styles.listSectionView,
                  borderBottomWidth: 0,
                  paddingBottom: 5,
                }}>
                <Text style={styles.listSectionTitleText}>Bowel Movement:</Text>
                <Text style={styles.listSectionText}>
                  {DailyTrackingData?.bowel_movement == 'Y' ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
            <View style={styles.upperBodySection}>
              {DailyTrackingData?.exercise?.length > 0
                ? DailyTrackingData?.exercise?.map((item, index) => (
                    <View key={index.toString()} style={styles.listSectionView}>
                      <Text style={styles.listSectionTitleText}>
                        {item.name} :
                      </Text>
                      <Text style={styles.listSectionText}>
                        {`${item.mm}`} Minutes
                      </Text>
                    </View>
                  ))
                : null}
              <View style={styles.listFooterSectionView}>
                <Text style={styles.listFooterSectionText}>
                  Total Exercise Duration:
                </Text>
                <Text style={styles.listFooterSectionText}>
                  {DailyTrackingData?.total_exercise_duration
                    ? `${DailyTrackingData?.total_exercise_duration.mm} Minutes`
                    : '0:00 Minutes'}
                    
                </Text>
              </View>
            </View>
          </View>
          {/* bottom section */}
          <TrackerReportItem
            key="1"
            titleName="Lunch"
            Data={DailyTrackingData?.lunch?.food_type}
            TimeType="Start Time"
            time={`${DailyTrackingData?.lunch?.start_time?.hh}:${DailyTrackingData?.lunch?.start_time?.mm}`}
            AMORPM={DailyTrackingData?.lunch?.start_time?.ext}
          />
          <TrackerReportItem
            key="2"
            titleName="Dinner"
            Data={DailyTrackingData?.dinner?.food_type}
            TimeType="End Time"
            time={`${DailyTrackingData?.dinner?.end_time?.hh}:${DailyTrackingData?.dinner?.end_time?.mm}`}
            AMORPM={DailyTrackingData?.dinner?.end_time?.ext}
          />
          <TrackerReportItem
            key="3"
            titleName="Snack"
            Data={DailyTrackingData?.snack}
            TimeType="Start Time"
          />

          <View style={{height: 30}} />
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <Text style={styles.NoRecordFoundStyle}>No record found</Text>
          <TouchableOpacity
            onPress={gotoDailyTrackingReport}
            style={styles.FABButtonView}>
            <PlusSvg />
          </TouchableOpacity>
        </View>
      )}
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDisptachToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDisptachToProps)(TrackerReport);
