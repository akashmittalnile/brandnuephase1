//react components
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
//third parties
import moment from 'moment';
//global
import {Server} from '../../global';
//styles
import {styles} from './NotificationDetailStyle';
//svg
import CalendarSvg from '../../assets/svg/calendar.svg';
//redux
import {connect} from 'react-redux';

const NotificationDetail = ({userToken, route}) => {
  //variables : route variables
  const notificationId = route.params.notificationId;

  //states
  const [notificationDetail, setnotificationDetail] = useState([]);
  //function : service function
  const getNotificationDetailById = async () => {
    try {
      const endPoint = `${Server.NOTIFICATION_DETAIL}${notificationId}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);

      if (resp.data.status) {
        // console.warn(resp.data.data);
        setnotificationDetail(resp.data.data);
      }
    } catch (error) {
      console.log('error in getNotificationDetailById', error);
    }
  };
  //useEffect
  useEffect(() => {
    getNotificationDetailById();
    return () => {};
  }, [notificationId]);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Notification" />
      <View style={styles.mainView}>
        {notificationDetail?.image ? (
          <Image
            resizeMode="contain"
            source={{uri: `${Server.BASE_URL}${notificationDetail.image}`}}
            style={styles.imageStyle}
          />
        ) : null}

        <Text style={styles.title}>{notificationDetail.title}</Text>
        <View style={styles.timeView}>
          <CalendarSvg />
          <Text style={{...styles.Time, marginLeft: 5}}>
            {notificationDetail.created_at}
          </Text>
        </View>
        <Text style={styles.notificationDetailText}>
          {notificationDetail.data}
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(NotificationDetail);
