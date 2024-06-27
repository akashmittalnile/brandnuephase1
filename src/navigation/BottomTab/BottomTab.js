//React components
import * as React from 'react';
import {Platform, View, Text} from 'react-native';
//Bottomtab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Stack
import HomeStack from './HomeStack/HomeStack';
import DigitalLibraryStack from './DigitalLibraryStack/DigitalLibraryStack';
import OnlineStoreStack from './OnlineStoreStack/OnlineStoreStack';
import DailyTrackingStack from './DailyTracking/DailyTracking';
//styles
import {styles} from './BottomTabStyle';
// SVG
import HomeActiveSvg from '../../assets/svg/HomeActive.svg';
import HomeInActiveSvg from '../../assets/svg/HomeInActive.svg';
import DigLibraryActiveSvg from '../../assets/svg/DigitalLibraryActive.svg';
import DigLibraryInActiveSvg from '../../assets/svg/DigitalLibraryInActive.svg';
import OnlineStoreActiveSvg from '../../assets/svg/OnlineStoreActive.svg';
import OnlineStoreInActiveSvg from '../../assets/svg/OnlineStoreInActive.svg';
import DailyTrackingActiveSvg from '../../assets/svg/DailyTrackingActive.svg';
import DailyTrackingInActiveSvg from '../../assets/svg/DailyTrackingInActive.svg';
//custom Hooks
import {useNetworkError} from '../../hooks/useNetworkError';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  // useNetworkError();
  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        showLabel: false,
        style: styles.TabStyleView,
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabItemView}>
                <HomeActiveSvg />
                <Text style={styles.TabItemActiveText}>Home</Text>
              </View>
            ) : (
              <View style={styles.TabItemView}>
                <HomeInActiveSvg />
                <Text style={styles.TabItemInActiveText}>Home</Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={DigitalLibraryStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabItemView}>
                <DigLibraryActiveSvg />
                <Text style={styles.TabItemActiveText}>Digital Library</Text>
              </View>
            ) : (
              <View style={styles.TabItemView}>
                <DigLibraryInActiveSvg />
                <Text style={styles.TabItemInActiveText}>Digital Library</Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={OnlineStoreStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabItemView}>
                <OnlineStoreActiveSvg />
                <Text style={styles.TabItemActiveText}>Online Store</Text>
              </View>
            ) : (
              <View style={styles.TabItemView}>
                <OnlineStoreInActiveSvg />
                <Text style={styles.TabItemInActiveText}>Online Store</Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DailyTrackingStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabItemView}>
                <DailyTrackingActiveSvg />
                <Text style={styles.TabItemActiveText}>Daily Tracking</Text>
              </View>
            ) : (
              <View style={styles.TabItemView}>
                <DailyTrackingInActiveSvg />
                <Text style={styles.TabItemInActiveText}>Daily Tracking</Text>
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabs;
