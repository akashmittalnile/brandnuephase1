//import : react components
import React, {useState, useEffect} from 'react';
import {
  Image,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
//import :  components
import DrawerItem from '../../components/DrawerItem/DrawerItem';
//import :  global
import {Colors, ScreenNames, Server} from '../../global';
// styles
import {styles} from './DrawerStyle';
// svgs
import CloseSideBarSvg from '../../assets/svg/close-sidebar.svg';
import ProfileSvg from '../../assets/svg/myprofile.svg';
import DailyTrackingSvg from '../../assets/svg/daily-tracking.svg';
import ChatNowSvg from '../../assets/svg/chat-sidebar.svg';
import FavMealSvg from '../../assets/svg/meal.svg';
import MyPlanSvg from '../../assets/svg/myplan.svg';
import PrivacyPolicySvg from '../../assets/svg/privacyPolicy.svg';
import TermSvg from '../../assets/svg/term.svg';
import TrackingSvg from '../../assets/svg/activity.svg';
import LogoutSvg from '../../assets/svg/LogoutUser.svg';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/modal/CustomAlert/CustomAlert';
import {CustomAlertAction} from '../../redux/actions/actions';

const CustomDrawer = ({navigation, dispatch, userToken, chatCount}) => {
  const isDrawerOpen = useIsDrawerOpen();
  //variables : common actions
  const resetIndexGoWelcom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.WELCOME}],
  });
  //hook : states
  const [showLoader, setshowLoader] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  //function : navigation function
  const closeDrawer = () => navigation.closeDrawer();
  const gotoTrackingSheet = () =>
    navigation.navigate(ScreenNames.TRACKING_SHEET);
  const gotoProfile = () => navigation?.navigate(ScreenNames.MY_PROFILE);
  const gotoDailyTracking = () =>
    navigation.navigate(ScreenNames.TRACKER_REPORT);
  const gotoFavouriteMeals = () =>
    navigation?.navigate(ScreenNames.FAVOURITE_MEALS);
  const gotoMyPlan = () => navigation?.navigate(ScreenNames.VIEW_PLAN);
  const gotoPrivacyPolicy = async () => {
    const privacyPolicyLink = `${Server.BASE_URL}api-page/privacy-policy`;
    try {
      await Linking.openURL(privacyPolicyLink);
    } catch (error) {
      console.log('error in gotoPrivacyPolicy', error);
    }
  };
  const gotoTermOfUse = async () => {
    const termOfUseLink = `${Server.BASE_URL}api-page/terms-conditions`;
    try {
      await Linking.openURL(termOfUseLink);
    } catch (error) {
      console.log('error in gotoTermOfUse', error);
    }
  };
  const gotoChatNow = () =>
    userInfo.role == 'ADMIN'
      ? navigation?.navigate(ScreenNames.CHAT_MEMBER)
      : navigation?.navigate(ScreenNames.CHAT_NOW);
  const logOutUser = async () => {
    try {
      setshowLoader(true);
      const {response, status} = await Server.getAPI(Server.LOGOUT, userToken);
      if (status) {
        await AsyncStorage.clear();
        dispatch(UserAction.logOutUser());
        setshowLoader(false);
        closeDrawer();
        navigation.dispatch(resetIndexGoWelcom);
      }
    } catch (error) {
      setshowLoader(false);
      console.log('error in logOutUser', error);
    }
  };
  //function : service function
  const getUserDetail = async () => {
    try {
      const {response, status} = await Server.getAPI(Server.PROFILE, userToken);
      if (status) {
        setUserInfo(response.data?.user);
      } else {
        if (response.msg == 'User not found') {
          dispatch(
            CustomAlertAction.showToast(
              `Your account has been deleted please contact the owner for same.`,
            ),
          );
          await AsyncStorage.clear();
          dispatch(UserAction.logOutUser());
          navigation.dispatch(resetIndexGoWelcom);
        }
      }
    } catch (error) {
      console.log('error in getUserDetail', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    if (userToken == null || userToken == '') {
    } else {
      getUserDetail();
    }

    return () => {};
  }, [isDrawerOpen]);

  //UI
  return (
    <View style={styles.container}>
      <CustomAlert />
      {/* <StatusBar backgroundColor={Colors.ORANGE} /> */}
      <ScrollView>
        <View style={styles.profileSectionView}>
          {userInfo.profile_image ? (
            <Image
              source={{uri: `${Server.BASE_URL}${userInfo.profile_image}`}}
              style={styles.profileImageStyle}
            />
          ) : (
            <Image
              source={require('../../assets/Images/user.png')}
              style={styles.profileImageStyle}
            />
          )}
          <TouchableOpacity onPress={() => closeDrawer()}>
            <CloseSideBarSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerMiddleView}>
          <DrawerItem
            DrawerItemSvg={<ProfileSvg />}
            DrawerItemName="My Profile"
            draweritemClick={() => gotoProfile()}
          />

          {userInfo.role == 'ADMIN' ? null : (
            <DrawerItem
              DrawerItemSvg={<DailyTrackingSvg />}
              DrawerItemName="Submit Daily Tracking"
              draweritemClick={() => gotoDailyTracking()}
            />
          )}
          {userInfo.role == 'ADMIN' ? (
            <DrawerItem
              DrawerItemSvg={<ChatNowSvg />}
              DrawerItemName="Chat Now"
              count={chatCount}
              draweritemClick={() => gotoChatNow()}
            />
          ) : null}
          {userInfo.role != 'ADMIN' &&
          // userInfo?.plan?.elite_member_id == userInfo?.plan?.id
          userInfo?.plan?.name?.includes('Elite') ? (
            <>
              <DrawerItem
                DrawerItemSvg={<ChatNowSvg />}
                DrawerItemName="Chat Now"
                count={chatCount}
                draweritemClick={() => gotoChatNow()}
              />
              <DrawerItem
                DrawerItemSvg={<TrackingSvg />}
                DrawerItemName="Tracking Sheet"
                draweritemClick={() => gotoTrackingSheet()}
              />
            </>
          ) : null}

          {userInfo.role == 'ADMIN' ? null : (
            <>
              <DrawerItem
                DrawerItemSvg={<FavMealSvg />}
                DrawerItemName="Favorite Meals"
                draweritemClick={() => gotoFavouriteMeals()}
              />
              <DrawerItem
                DrawerItemName="My Plan"
                DrawerItemSvg={<MyPlanSvg />}
                draweritemClick={() => gotoMyPlan()}
              />
              <DrawerItem
                DrawerItemName="Privacy Policy"
                DrawerItemSvg={<PrivacyPolicySvg />}
                draweritemClick={() => gotoPrivacyPolicy()}
              />
              <DrawerItem
                DrawerItemName="Terms of Use"
                DrawerItemSvg={<TermSvg />}
                draweritemClick={() => gotoTermOfUse()}
              />
            </>
          )}
          <ActivityIndicator
            animating={showLoader}
            size="large"
            color={Colors.WHITE}
          />
        </View>
      </ScrollView>
      <View style={styles.DrawerBottomView}>
        <TouchableOpacity onPress={logOutUser} style={styles.TextIconView}>
          <View style={styles.logoutStyle}>
            <LogoutSvg />
          </View>
          <Text style={styles.logoutTextStyle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({dispatch});
const mapStateToProps = state => ({
  userToken: state.user.userToken,
  chatCount: state.user.chatCount,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(CustomDrawer));
