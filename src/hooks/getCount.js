import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Server} from '../global';

const getCount = ({userToken}) => {
  const getCount = async () => {
    try {
      const endPoint = `${Server.CHAT_NOTIFICATION_COUNT}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);
      if (resp.data.status) {
        return resp.data.data;
        // setUnreadCount(resp.data?.data?.notification_unread_count);
        // dispatch(UserAction.setChatCount(resp.data?.data?.chat_unread_count))
      }
    } catch (error) {
      console.log('error in getCount', error);
    }
  };
  useEffect(() => {
    getCount();
  }, [userToken]);
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(getCount);
