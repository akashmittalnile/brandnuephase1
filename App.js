//import : react components
import React, {useState} from 'react';
import {StatusBar, SafeAreaView, AppState, Platform,LogBox} from 'react-native';
//import : third parties
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {NotificationManagerAndroid} from './NotificationManagerAndroid';

//notification manager : IOS
import {NotificationManagerIOS} from './NotificationManagerIOS';
//firebase
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
//Drawer Stack
import Drawer from './src/navigation/Drawer/Drawer';
//redux
import {store} from './src/redux/store/store';
import AppUpdate from './src/components/modal/AppUpdate/AppUpdate';
import VersionCheck from 'react-native-version-check';

var firebaseConfig = {
  apiKey: 'AIzaSyADZnINeiDcYx8Ora6LpXeVsogrB-t3pCo',
  authDomain: 'brandnue-bcfc6.firebaseapp.com',
  databaseURL: 'https://brandnue-bcfc6-default-rtdb.firebaseio.com',
  projectId: 'brandnue-bcfc6',
  storageBucket: 'brandnue-bcfc6.appspot.com',
  messagingSenderId: '824207574439',
  appId: '1:824207574439:web:8248d972c280cea0886282',
  measurementId: 'G-D5MHKWHSEQ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  LogBox.ignoreAllLogs()
  //hook : states
  const [isUpdatedAvailable, setIsUpdatedAvailable] = useState(false);
  //function : imp function
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
  }
  async function requestUserPermissionIos() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.debug('Authorization status:', authStatus);
    }
  }
  const checkAppUpdate = () => {
    var currentVersion = VersionCheck.getCurrentVersion();
    VersionCheck.getLatestVersion({}).then(latestVersion => {
      VersionCheck.needUpdate({
        currentVersion: currentVersion,
        latestVersion: latestVersion,
      }).then(res => {
        console.log('====================================');
        console.log('hihihih',res.isNeeded);
        console.log('====================================');
        if (res.isNeeded) {
          setIsUpdatedAvailable(true);
        }
      });
    });
  };
  //hook : useEffect
  React.useEffect(() => {
    checkAppUpdate();
    NotificationManagerAndroid.createChannel();
    NotificationManagerAndroid.configure();
    try {
      if (Platform.OS == 'android') {
        requestUserPermission();
      } else {
        requestUserPermissionIos();
      }
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const {messageId} = remoteMessage;
        const data = remoteMessage.notification;
        if (Platform.OS === 'android') {
          NotificationManagerAndroid.showNotification(
            data.title,
            data.body,
            data.subText,
            messageId,
            data,
          );
        } else {
          NotificationManagerIOS.showNotification(
            messageId,
            data.title,
            data.body,
            data,
            {},
          );
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error(error.message);
    }
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const {data, messageId} = remoteMessage;
      const {Title, notificationText, subText} = data;
      if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(
          Title,
          notificationText,
          subText,
          messageId,
        );
      } else {
        NotificationManagerIOS.showNotification(
          messageId,
          Title,
          notificationText,
          data,
          {},
        );
      }
    });
  }, []);

  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer theme={DefaultTheme}>
          {/* <StatusBar translucent={false} backgroundColor="#FFFFFF" /> */}
          <Drawer />
        </NavigationContainer>
      </Provider>
      <AppUpdate
        visible={isUpdatedAvailable}
        setVisibility={setIsUpdatedAvailable}
      />
    </SafeAreaView>
  );
};
export default App;
