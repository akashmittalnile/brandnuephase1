//import : react navigation
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
//import : global
import {ScreenNames} from '../../global';
//import : screens
import MainStack from '../MainStack/MainStack';
import CustomDrawer from './CustomDrawer';
import Welcome from '../../screen/Welcome/Welcome';

export default () => {
  //variables
  const Drawer = createDrawerNavigator();
  const options = {
    swipeEnabled: false,
  };
  const initialRouteName = ScreenNames.MAIN_STACK;
  const renderCustomDrawer = ({navigation}) => (
    <CustomDrawer navigation={navigation} />
  );
  //UI
  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      initialRouteName={initialRouteName}>
      <Drawer.Screen
        options={options}
        name={ScreenNames.MAIN_STACK}
        component={MainStack}
      />
    </Drawer.Navigator>
  );
};
