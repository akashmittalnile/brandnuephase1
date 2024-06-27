//react components
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//third parties
import moment from 'moment';
//global
import {ScreenNames, Server} from '../../global';
//styles
import {styles} from './NotificationStyle';
//svg
import CalendarSvg from '../../assets/svg/calendar.svg';
//redux
import {connect} from 'react-redux';

const Notification = ({navigation, userToken}) => {
  //states
  const [notificationData, setNotificationData] = useState([]);
  const [showLoader, setshowLoader] = useState(true);
  //function : navigation function
  const naviationToNotificationDetail = id => {
    navigation.navigate(ScreenNames.NOTIFICATION_DETAIL, {notificationId: id});
  };
  const gotoHome = () => navigation.navigate(ScreenNames.BOTTOM_TAB);
  //function : service function
  const getAllNotificationsList = async () => {
    setshowLoader(true);
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.NOTIFICATION_LIST,
      );
      if (resp.data.status) {
        setNotificationData(resp.data.data);
      }
    } catch (error) {
      console.log('error in getAllNotificationsList', error);
    }
    setshowLoader(false);
  };
  //function : render function
  const notificationRenderFunction = ({item}) => (
    <TouchableOpacity
      onPress={() => naviationToNotificationDetail(item.id)}
      key={item.id}
      style={styles.CardView}>
      <View style={styles.CardTextView}>
        <Text style={styles.notificationTitleText}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.notificationDescText}>
          {item.data}
        </Text>
        <View style={styles.timeDateView}>
          <CalendarSvg />
          <Text style={{...styles.timeDateText, marginLeft: 5}}>
            {item.created_at}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //useEffect
  useEffect(() => {
    getAllNotificationsList();
    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Notification" />
      <View style={styles.mainView}>
        {notificationData.length > 0 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: '20%'}}
            data={notificationData}
            renderItem={notificationRenderFunction}
            keyExtractor={item => item.id}
          />
        ) : (
          <>
            {showLoader ? null : (
              <View style={styles.EmptyNotificationView}>
                <Image
                  source={require('../../assets/Images/Notification-infographic.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.title}>No Notification Here</Text>
                <View style={{height: 20}} />
                <TouchableOpacity onPress={gotoHome} style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(Notification);
