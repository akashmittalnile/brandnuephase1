//import : react components
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
//import : custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import LineWeightChart from '../../components/LineWeightChart/LineWeightChart';
import AchievementPercSection from '../../components/AchievementPercSection/AchievementPercSection';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//import : third parties
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
//import : modal
import AchievementLevel from '../../components/modal/AchievementLevel/AchievementLevel';
//import : global
import {Constant, Server} from '../../global';
//import : styles
import {styles} from './HomeStyle';
//import :  svg
import ZeroPercSvg from '../../assets/svg/0-goal-forHome.svg';
import TwentyPercSvg from '../../assets/svg/20-goal-forHome.svg';
import FortyPercSvg from '../../assets/svg/40-goal-forHome.svg';
import SixtyPercSvg from '../../assets/svg/60-goal-forHome.svg';
import EightyPercSvg from '../../assets/svg/80-goal-forHome.svg';
import HundredPercSvg from '../../assets/svg/100-goal-forHome.svg';
import DropDownSvg from '../../assets/svg/dropdown-arrow.svg';
//import : redux
import {connect, useDispatch} from 'react-redux';
import {CustomAlertAction} from '../../redux/actions/actions';

const Home = ({userToken}) => {
  //variables
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //hook : states
  const [showLoader, setshowLoader] = useState(false);
  const [achievementModal, setachievementModal] = useState(false);
  const [HomeData, setHomeData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [showChartViewOption, setShowChartViewOption] = useState(false);
  const [selectedChartView, setSelectedChartView] = useState(
    Constant.chartViewData[1],
  );
  //function : service function
  const getHomeData = async () => {
    setshowLoader(true);
    try {
      const {response, status} = await Server.getAPI(
        Server.HOME_PAGE,
        userToken,
      );
      console.log('response.data in getHomeData', response.data);
      console.log(response.data.current_year_weight_diary);
      if (status) {
        setHomeData(response.data);
      }
    } catch (error) {
      console.log('error in getHomeData', error);
    }
    setshowLoader(false);
  };
  const resetAFT = () => {
    try {
      Alert.alert(
        'Are you sure you want to reset the Average Fasting Time ?',
        '',
        [
          {
            text: 'YES',
            onPress: () => resetFastingTime(),
          },
          {
            text: 'CANCEL',
            onPress: () => console.log('cancel Pressed'),
          },
        ],
      );
    } catch (error) {
      console.log('error in resetAFT', error);
    }
  };
  const getChartData = async selectedValue => {
    try {
      const endPoint = `${Server.CHART_SHORT}${selectedValue}`;
      const {response, status} = await Server.getAPI(endPoint, userToken);
      console.log(response);
      if (status) {
        setChartData(response?.data);
      }
    } catch (error) {
      console.log('error in getChartData', error);
    }
  };
  const resetFastingTime = async () => {
    try {
      const resp = await Server.postApiWithToken(
        userToken,
        Server.RESET_FASTING_TIME,
        {},
      );
      if (resp.data.status) {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        // console.warn(resp.data);
        getHomeData();
      } else {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
      }
    } catch (error) {
      console.log('error in resetFastingTime', error);
    }
  };
  //hook : useEffect
  // useEffect(() => {
  //   getHomeData();
  //   return () => {};
  // }, [isFocused]);

  useEffect(() => {
    if (userToken == null || userToken == '') {
    } else {
      getHomeData();
    }
    return () => {};
  }, [isFocused]);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Home" IsNotification={true} IsDrawer={true} />
      {Object.keys(HomeData).length > 0 ? (
        <View style={styles.mainView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.ProfileSectionView}>
              <View style={styles.profileNameImageView}>
                {HomeData?.user_details?.profile_image ? (
                  <Image
                    source={{
                      uri: `${Server.BASE_URL}${HomeData?.user_details?.profile_image}`,
                    }}
                    style={styles.ImageStyle}
                  />
                ) : (
                  <Image
                    source={require('../../assets/Images/user.png')}
                    style={styles.ImageStyle}
                  />
                )}

                <Text style={styles.weightTitleText}>
                  Hi {HomeData?.user_details?.first_name}{' '}
                  {HomeData?.user_details?.last_name}
                </Text>
              </View>
              <View style={styles.weightLossSectionView}>
                <Text style={styles.weightTitleText}>
                  {HomeData?.current_achievement_level_text}{' '}
                </Text>
                <View style={styles.performanceView}>
                  <View style={styles.InnerBorderView}>
                    {HomeData?.current_achievement_level?.percentage == 0 ? (
                      <ZeroPercSvg />
                    ) : null ||
                      HomeData?.current_achievement_level?.percentage <= 20 ? (
                      <TwentyPercSvg />
                    ) : null ||
                      HomeData?.current_achievement_level?.percentage <= 40 ? (
                      <FortyPercSvg />
                    ) : null ||
                      HomeData?.current_achievement_level?.percentage <= 60 ? (
                      <SixtyPercSvg />
                    ) : null ||
                      HomeData?.current_achievement_level?.percentage <= 80 ? (
                      <EightyPercSvg />
                    ) : null ||
                      HomeData?.current_achievement_level?.percentage <= 100 ? (
                      <HundredPercSvg />
                    ) : null}
                    <View>
                      <Text style={styles.performancePercentage}>
                        {HomeData?.current_achievement_level?.percentage}%
                      </Text>
                      <Text style={styles.toGoalText}>TO GOAL</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.ProfilePerformanceText}>
                  {HomeData?.current_achievement_level?.percentage_level}
                </Text>
                <TouchableOpacity
                  onPress={() => setachievementModal(true)}
                  style={styles.profileSectionButton}>
                  <Text style={styles.profileSectionButtonText}>
                    Show Achievement levels
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.weightLossSection}>
              <Text style={styles.weightLossToDateText}>
                {HomeData.current_loss_weight_text} :{' '}
              </Text>
              <Text style={styles.weightlossText}>
                {parseFloat(HomeData.current_loss_weight).toFixed(1)} lbs
              </Text>
            </View>

            {HomeData?.current_achievement_level?.next_achievement_percentage <=
            100 ? (
              <AchievementPercSection
                NextWeight={
                  HomeData?.current_achievement_level?.next_achievement_weight
                }
                Percentage={
                  HomeData?.current_achievement_level
                    ?.next_achievement_percentage > 100
                    ? 100
                    : HomeData?.current_achievement_level
                        ?.next_achievement_percentage
                }
              />
            ) : null}

            <View style={styles.averageFastimeSection}>
              <View style={styles.averageFastimeTextView}>
                <Text style={styles.averageFastimeText}>
                  Average Fasting Time
                </Text>
                {parseFloat(HomeData?.fast_time_current_month_hours).toFixed(
                  2,
                ) > 0 ? (
                  <TouchableOpacity
                    onPress={resetAFT}
                    style={styles.resetButtonStyle}>
                    <Text style={styles.buttonTextStyle}>Reset</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={styles.averageFastimeClock}>
                <ImageBackground
                  source={require('../../assets/Images/clock.png')}
                  resizeMode="cover"
                  style={styles.clockViewStyle}>
                  <CircularProgress
                    percent={
                      HomeData?.fast_time_current_month_hours == undefined
                        ? parseFloat(0 * 4.16666667).toFixed(2)
                        : parseFloat(
                            HomeData?.fast_time_current_month_hours *
                              4.16666667,
                          ).toFixed(2)
                    }
                  />
                </ImageBackground>
              </View>
            </View>
            <View style={styles.weightDiarySection}>
              <View
                style={{
                  ...styles.weightDiarySectionTextView,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.weightDiaryText}>Weight Diary</Text>
                {showChartViewOption ? (
                  <ScrollView
                    contentContainerStyle={{
                      paddingBottom: 10,
                    }}
                    style={styles.dropDownScrollView}>
                    {Constant.chartViewData.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedChartView(item);
                            getChartData(item.value);
                            setShowChartViewOption(false);
                          }}
                          key={index.toString()}
                          style={{
                            ...styles.dropDownItemView,
                            borderBottomWidth:
                              index == Constant.chartViewData.length - 1
                                ? 0
                                : 0.5,
                          }}>
                          <Text style={styles.selectedViewText}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <TouchableOpacity
                    onPress={() => setShowChartViewOption(true)}
                    style={styles.dropDownStyle}>
                    <Text style={styles.selectedViewText}>
                      {selectedChartView.name}
                    </Text>
                    <DropDownSvg />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.weightDiaryChart}>
                {HomeData.current_year_weight_diary ? (
                  <LineWeightChart
                    Data={
                      Object.keys(chartData).length > 0
                        ? chartData
                        : HomeData.current_year_weight_diary
                    }
                  />
                ) : null}
              </View>
            </View>
            <View style={{height: 50}} />
          </ScrollView>
        </View>
      ) : (
        <CustomLoader showLoader={showLoader} />
      )}

      <AchievementLevel
        Data={HomeData?.current_achievement_level?.data}
        MyPercentage={HomeData?.current_achievement_level?.percentage}
        visible={achievementModal}
        setVisible={setachievementModal}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  userToken: state?.user?.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
