import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {ScreenNames} from '../global';

export function useNetworkError() {
  const navigation = useNavigation();
  const {isConnected, isInternetReachable} = useNetInfo();
  useEffect(() => {
    //only for checking when wifi or data is on
    // if (isConnected === null) return;
    // if (!isConnected) {
    //   navigation?.navigate(ScreenNames.NETWORK_ERROR);
    // } else {
    //   if (navigation?.canGoBack()) {
    //     navigation?.goBack();
    //   }
    // }
    //actual checking of internet reachability
    if (isInternetReachable === undefined || isInternetReachable === null)
      return;
    if (!isInternetReachable) {
      navigation.navigate(ScreenNames.NO_CONNECTION);
    } else {
      if (navigation?.canGoBack()) {
        navigation?.goBack();
      }
    }
  }, [isInternetReachable]);
}
