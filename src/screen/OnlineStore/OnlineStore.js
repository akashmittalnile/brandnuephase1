//react components
import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import {ScreenNames} from '../../global';
//styles
import {styles} from './OnlineStoreStyle';

const OnlineStore = ({navigation}) => {
  const url = `https://brandnueweightloss.com/shop`;
  //function : navigation function
  const gotoOnlineStore = async () => {
    // const supported = await Linking.canOpenURL(url);
    // if (supported) {
    await Linking.openURL(url);
    // } else {
    // Alert.alert('Unsupported url');
    // }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader
        headerName="Online Store"
        IsNotification={true}
        IsDrawer={true}
      />
      <View style={styles.mainView}>
        <Image
          resizeMode="contain"
          source={require('../../assets/Images/store-infographic.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.onlineStoreText}>online Store</Text>
        {/* <Text style={styles.onlineStoreDetailText}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,</Text> */}
        <TouchableOpacity onPress={gotoOnlineStore} style={styles.ButtonStyle}>
          <Text style={styles.ButtonText}>Go To Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnlineStore;
