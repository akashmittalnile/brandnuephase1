import React from 'react';
// import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//global
import { ScreenNames } from '../../../global';
//screen
import Home from '../../../screen/Home/Home';

// enableScreens();
const stack = createNativeStackNavigator();
const HomeStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.HOME}
		>
			<stack.Screen
				name={ScreenNames.HOME}
				component={Home} />
		
		</stack.Navigator>
	);
};
export default HomeStack;