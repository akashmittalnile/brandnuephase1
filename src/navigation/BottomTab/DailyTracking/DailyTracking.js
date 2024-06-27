import React from 'react';
// import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//global
import { ScreenNames } from '../../../global';
//screen

import DailyTracking from '../../../screen/DailyTracking/DailyTracking';

// enableScreens();
const stack = createNativeStackNavigator();
const DailyTrackingStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.DAILY_TRACKING}
		>
			<stack.Screen
				name={ScreenNames.DAILY_TRACKING}
				component={DailyTracking} />
		
		</stack.Navigator>
	);
};
export default DailyTrackingStack;