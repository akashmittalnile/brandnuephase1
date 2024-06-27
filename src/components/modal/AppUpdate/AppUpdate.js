//import : react components
import React, {useState} from 'react';
import {
  View,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import : third parties
import VersionCheck from 'react-native-version-check';
//import : styles
import {styles} from './AppUpdateStyle';

const AppUpdate = ({visible, setVisibility}) => {
  //variables
  //hook : states
  const [latestVersion, setlatestVersion] = useState(
    VersionCheck.getCurrentVersion(),
  );
  const showDetail = async () => {
    VersionCheck.getLatestVersion().then(latestVersion => {
      setlatestVersion(latestVersion);
    });
  };
  const updateApp = async () => {
    let url;
    if (Platform.OS === 'android') {
      url = await VersionCheck.getStoreUrl({});
    } else {
      url = `https://apps.apple.com/in/app/brand-nue/id1614626120`;
    }
    Linking.openURL(url);
  };
  //UI
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onShow={showDetail}
      transparent>
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/Images/logo.png')}
            style={styles.logoStyle}
          />
          <Text style={styles.title}>Important Update</Text>
          <Text style={styles.subText}>
            A new version is now available for the Brand NUE app. Please click
            on UPDATE button below to get the latest version.
          </Text>
          {/* <Text style={styles.subText}>
            {`What's new in v${latestVersion}`}
          </Text> */}
          <TouchableOpacity onPress={updateApp} style={styles.buttonView}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
          {/* <View style={styles.bottomSection}>
            
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default AppUpdate;
