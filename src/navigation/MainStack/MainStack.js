//react components
import React from 'react';
import {Platform, Text, View} from 'react-native';

// react navigation
import {createStackNavigator} from '@react-navigation/stack';

// global
import {ScreenNames} from '../../global';
// screens
import Splash from '../../screen/Splash/Splash';
import Welcome from '../../screen/Welcome/Welcome';
import SignIn from '../../screen/SignIn/SignIn';
import SignUp from '../../screen/SignUp/SignUp';
import Home from '../../screen/Home/Home';
import MembershipPlan from '../../screen/MembershipPlan/MembershipPlan';
import PlanPayment from '../../screen/PlanPayment/PlanPayment';
import ViewPlan from '../../screen/ViewPlan/ViewPlan';
import Notification from '../../screen/Notification/Notification';
import BottomTabs from '../BottomTab/BottomTab';
import DigitalLibraryItem from '../../screen/DigitalLibraryItem/DigitalLibraryItem';
import ItemListing from '../../screen/ItemListing/ItemListing';
import NotificationDetail from '../../screen/NotificationDetail/NotificationDetail';
import ItemDetail from '../../screen/ItemDetail/ItemDetail';
import DetailScreen from '../../screen/DetailScreen/DetailScreen';
import DigitalLibraryItems from '../../screen/DigitalLibraryItems/DigitalLibraryItems';
import AddedMeals from '../../screen/AddedMeals/AddedMeals';
import TrackerReport from '../../screen/TrackerReport/TrackerReport';
import EditDailyTracking from '../../screen/EditDailyTracking/EditDailyTracking';
import MyProfile from '../../screen/MyProfile/MyProfile';
import ChatNow from '../../screen/ChatNow/ChatNow';
import EliteMembership from '../../screen/EliteMembership/EliteMembership';
import NoConnection from '../../screen/NoConnection/NoConnection';
import FavouriteMeals from '../../screen/FavouriteMeals/FavouriteMeals';
import FullImageView from '../../screen/FullImageView/FullImageView';
import DashBoard from '../../screen/DashBoard/DashBoard';
import ChatMember from '../../screen/ChatMember/ChatMember';
import AdminChatNow from '../../screen/AdminChatNow/AdminChatNow';
import ViewPdf from '../../screen/ViewPdf/ViewPdf';
import TrackingSheet from '../../screen/TrackingSheet/TrackingSheet';
import EditProfile from '../../screen/EditProfile/EditProfile';
import SignUpWelcome from '../../screen/SignUp/SignUpWelcome/SignUpWelcome';
import BasicSignUp from '../../screen/SignUp/BasicSignUp/BasicSignUp';
import MetricSignUp from '../../screen/SignUp/MetricSignUp/MetricSignUp';
import WaistSignUp from '../../screen/SignUp/WaistSignUp/WaistSignUp';
import CurrentStatusSignUp from '../../screen/SignUp/CurrentStatusSignUp/CurrentStatusSignUp';
import HealthConcern from '../../screen/SignUp/HealthConcern/HealthConcern';
import CurrentMotivation from '../../screen/SignUp/CurrentMotivation/CurrentMotivation';
import PreDiet from '../../screen/SignUp/PreDiet/PreDiet';
import DidNotWork from '../../screen/SignUp/DidNotWork/DidNotWork';
import PersonalNeed from '../../screen/SignUp/PersonalNeed/PersonalNeed';
import Metabolism from '../../screen/SignUp/Metabolism/Metabolism';
import LastQuestion from '../../screen/SignUp/LastQuestion/LastQuestion';
import SignUpSuccess from '../../screen/SignUp/SignUpSuccess/SignUpSuccess';
import MemberShipSignUp from '../../screen/SignUp/MemberShipSignUp/MemberShipSignUp';
import ShippingAddress from '../../screen/SignUp/ShippingAddress/ShippingAddress';
import ChoosePlan from '../../screen/SignUp/ChoosePlan/ChoosePlan';
import PlanPreview from '../../screen/SignUp/PlanPreview/PlanPreview';

const MainStack = () => {
  //variables
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  const inititalRouteName = ScreenNames.SPLASH;

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={inititalRouteName}>
      <Stack.Screen name={ScreenNames.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenNames.WELCOME} component={Welcome} />
      <Stack.Screen name={ScreenNames.SIGNIN} component={SignIn} />
      <Stack.Screen name={ScreenNames.SIGNUP} component={SignUp} />
      <Stack.Screen
        name={ScreenNames.SIGNUP_WELCOME}
        component={SignUpWelcome}
      />
      <Stack.Screen name={ScreenNames.BASIC_SIGNUP} component={BasicSignUp} />
      <Stack.Screen name={ScreenNames.BOTTOM_TAB} component={BottomTabs} />
      <Stack.Screen name={ScreenNames.HOME} component={Home} />
      <Stack.Screen
        name={ScreenNames.DIGITAL_LIBRARY_ITEM}
        component={DigitalLibraryItem}
      />
      <Stack.Screen
        name={ScreenNames.DIGITAL_LIBRARY_ITEMS}
        component={DigitalLibraryItems}
      />
      <Stack.Screen name={ScreenNames.ITEM_LISTING} component={ItemListing} />
      <Stack.Screen name={ScreenNames.ITEM_DETAIL} component={ItemDetail} />
      <Stack.Screen name={ScreenNames.DETAIL_SCREEN} component={DetailScreen} />
      <Stack.Screen
        name={ScreenNames.MEMBERSHIP_PLAN}
        component={MembershipPlan}
      />
      <Stack.Screen name={ScreenNames.PLAN_PAYMENT} component={PlanPayment} />
      <Stack.Screen name={ScreenNames.VIEW_PLAN} component={ViewPlan} />
      <Stack.Screen name={ScreenNames.ADDED_MEALS} component={AddedMeals} />
      <Stack.Screen name={ScreenNames.NOTIFICATION} component={Notification} />
      <Stack.Screen
        name={ScreenNames.NOTIFICATION_DETAIL}
        component={NotificationDetail}
      />
      <Stack.Screen
        name={ScreenNames.TRACKER_REPORT}
        component={TrackerReport}
      />
      <Stack.Screen
        name={ScreenNames.EDIT_DAILY_TRACKING}
        component={EditDailyTracking}
      />
      <Stack.Screen name={ScreenNames.MY_PROFILE} component={MyProfile} />
      <Stack.Screen name={ScreenNames.CHAT_NOW} component={ChatNow} />
      <Stack.Screen
        name={ScreenNames.ELITE_MEMBERSHIP}
        component={EliteMembership}
      />
      <Stack.Screen name={ScreenNames.NO_CONNECTION} component={NoConnection} />
      <Stack.Screen
        name={ScreenNames.FAVOURITE_MEALS}
        component={FavouriteMeals}
      />
      <Stack.Screen
        name={ScreenNames.FULL_IMAGE_VIEW}
        component={FullImageView}
      />
      <Stack.Screen name={ScreenNames.DASHBOARD} component={DashBoard} />
      <Stack.Screen name={ScreenNames.CHAT_MEMBER} component={ChatMember} />
      <Stack.Screen
        name={ScreenNames.ADMIN_CHAT_NOW}
        component={AdminChatNow}
      />
      <Stack.Screen name={ScreenNames.VIEW_PDF} component={ViewPdf} />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ScreenNames.METRIC_SIGNUP} component={MetricSignUp} />
      <Stack.Screen name={ScreenNames.WAIST_SIGNUP} component={WaistSignUp} />
      <Stack.Screen name={ScreenNames.PRE_DIET} component={PreDiet} />
      <Stack.Screen name={ScreenNames.DID_NOT_WORK} component={DidNotWork} />
      <Stack.Screen name={ScreenNames.PERSONAL_NEED} component={PersonalNeed} />
      <Stack.Screen name={ScreenNames.METABOLISM} component={Metabolism} />
      <Stack.Screen name={ScreenNames.LAST_QUESTION} component={LastQuestion} />
      <Stack.Screen
        name={ScreenNames.SIGN_UP_SUCCESS}
        component={SignUpSuccess}
      />
      <Stack.Screen
        name={ScreenNames.MEMBERSHIP_SIGNUP}
        component={MemberShipSignUp}
      />
      <Stack.Screen
        name={ScreenNames.SHIPPING_ADDRESS}
        component={ShippingAddress}
      />
      <Stack.Screen name={ScreenNames.CHOOSE_PLAN} component={ChoosePlan} />
      <Stack.Screen
        name={ScreenNames.CURRENT_MOTIVATION_SIGNUP}
        component={CurrentMotivation}
      />
      <Stack.Screen
        name={ScreenNames.HEALTH_CONCERN_SIGNUP}
        component={HealthConcern}
      />
      <Stack.Screen
        name={ScreenNames.CURRENT_STATUS_SIGNUP}
        component={CurrentStatusSignUp}
      />
      <Stack.Screen name={ScreenNames.PLAN_PREVIEW} component={PlanPreview} />
      <Stack.Screen
        name={ScreenNames.TRACKING_SHEET}
        component={TrackingSheet}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
