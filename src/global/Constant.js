import {useNavigation} from '@react-navigation/core';
import {Dimensions, PixelRatio} from 'react-native';
import {ScreenNames} from '.';

export const windowWidth = Dimensions.get('screen').width;
export const windowHeight = Dimensions.get('screen').height;

export const EmailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const widthToDp = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.getPixelSizeForLayoutSize((windowWidth * givenWidth) / 100);
};

const heightToDp = number => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.getPixelSizeForLayoutSize(
    (windowHeight * givenHeight) / 100,
  );
};
export function cmToFeet(cm) {
  const feetInOneCm = 1 / 30.48;
  const feet = cm * feetInOneCm;
  return parseFloat(feet).toFixed(2);
}
export function cmToInches(cm) {
  const inchesInOneCm = 1 / 2.54;
  const inches = cm * inchesInOneCm;
  return parseFloat(inches).toFixed(2);
}
export function gotoChatScreen() {
  const navigation = useNavigation();
  navigation.navigate(ScreenNames.CHAT_NOW);
}
export const chartViewData = [
  {
    id: 1,
    name: 'Weekly View',
    value: 'weekly',
  },
  {
    id: 2,
    name: 'Monthly View',
    value: 'monthly',
  },
  {
    id: 3,
    name: 'Yearly View',
    value: 'yearly',
  },
];
export {widthToDp, heightToDp};
