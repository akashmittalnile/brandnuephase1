//react components
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//custom components
import MyButton from '../../components/MyButton/MyButton';
//third parties
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';
//global
import {Colors, Server} from '../../global';
//styles
import {styles} from './MyProfileCardStyles';
import {connect} from 'react-redux';
import moment from 'moment';

const MyProfileCard = ({
  role,
  Data,
  editButtonClicked = () => {},
  changePasswordClicked = () => {},
  userToken,
}) => {
  //states
  const [showLoader, setshowLoader] = useState(false);
  //function : imp function
  const CheckGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      openLibrary();
    } else {
      const res = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === RESULTS.GRANTED) {
        openLibrary();
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        res2 === RESULTS.GRANTED ? openLibrary() : CheckGalleryPermission();
      } else if (res === RESULTS.BLOCKED) {
        Alert.alert(
          'To continue, Brand NUE needs your permission to access Photos.',
          'Go to Settings>> Brand Nue>>Photos.',
        );
      }
    }
  };
  const openLibrary = async () => {
    try {
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
      }).then(image => {
        updateAdminProfile(image);
      });
    } catch (error) {
      console.error('error in openLibrary', error);
    }
  };
  //function : service function
  const updateAdminProfile = async image => {
    try {
      setshowLoader(true);
      const formData = new FormData();
      const imageName = image.path.slice(
        image.path.lastIndexOf('/'),
        image.path.length,
      );
      formData.append('profile_image', {
        name: imageName,
        type: image.mime,
        uri: image.path,
      });
      const resp = await Server.postApiWithToken(
        userToken,
        Server.UPDATE_PROFILE_IMAGE,
        formData,
      );
      if (resp?.data?.status) {
        setshowLoader(false);
      }
    } catch (error) {
      console.error('error in updateAdminProfile', error);
      setshowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.ImageTextView}>
        <TouchableOpacity
          onPress={() => CheckGalleryPermission()}
          disabled={role == 'ADMIN' ? false : true}>
          {Data?.profile_image ? (
            <Image
              source={{uri: `${Server.BASE_URL}${Data.profile_image}`}}
              style={styles.ImageStyle}
            />
          ) : (
            <Image
              source={require('../../assets/Images/user.png')}
              style={styles.ImageStyle}
            />
          )}
        </TouchableOpacity>
        <View style={styles.TextView}>
          <Text style={styles.profileNameText}>{Data?.name}</Text>
          {role == 'ADMIN' ? null : (
            <Text style={styles.otherTextStyle}>
              DOB : {moment(Data?.dob).format('MM-DD-YYYY')}
            </Text>
          )}
          <Text style={{...styles.otherTextStyle, marginVertical: 5}}>
            {Data?.email}
          </Text>
          <Text style={styles.otherTextStyle}>{Data?.phone}</Text>
        </View>
      </View>
      {showLoader ? (
        <ActivityIndicator
          animating={showLoader}
          size="large"
          color="#f39322"
        />
      ) : null}
      <View
        style={{
          ...styles.ButtonView,
          alignSelf: role == 'ADMIN' ? 'center' : 'auto',
        }}>
        {role == 'ADMIN' ? null : (
          <MyButton
            ButtonTitle="Edit Profile"
            backgroundColor={Colors.ORANGE}
            onPress={editButtonClicked}
          />
        )}
        <MyButton
          ButtonTitle="Change Password"
          disabled={showLoader ? true : false}
          onPress={changePasswordClicked}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(React.memo(MyProfileCard));
