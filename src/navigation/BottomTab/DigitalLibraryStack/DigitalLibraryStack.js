import React from 'react';
// import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//global
import { ScreenNames } from '../../../global';
//screen
import DigitalLibrary from '../../../screen/DigitalLibrary/DigitalLibrary';

// enableScreens();
const stack = createNativeStackNavigator();
const DigitalLibraryStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.DIGITAL_LIBRARY}
		>
			<stack.Screen
				name={ScreenNames.DIGITAL_LIBRARY}
				component={DigitalLibrary} />
		
		</stack.Navigator>
	);
};
export default DigitalLibraryStack;