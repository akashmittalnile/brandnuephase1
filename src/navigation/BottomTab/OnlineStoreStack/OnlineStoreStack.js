import React from 'react';
// import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//global
import { ScreenNames } from '../../../global';
//screen
import OnlineStore from '../../../screen/OnlineStore/OnlineStore';

// enableScreens();
const stack = createNativeStackNavigator();
const OnlineStoreStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.ONLINE_STORE}
		>
			<stack.Screen
				name={ScreenNames.ONLINE_STORE}
				component={OnlineStore} />
		
		</stack.Navigator>
	);
};
export default OnlineStoreStack;