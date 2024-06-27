//import : react components
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
//import : custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
//import : global
import {Colors, Server} from '../../global';
//import : styles
import {styles} from './DashBoardStyle';
//import : redux
import {connect} from 'react-redux';

const DashBoard = ({userToken}) => {
  //hook : states
  const [DashBoardData, setDashBoardData] = useState([]);
  //function : service function
  const getAdminDashBoard = async () => {
    try {
      const {response, status} = await Server.getAPI(
        Server.DASHBOARD,
        userToken,
      );
      if (status) {
        setDashBoardData(response.data);
      }
    } catch (error) {
      console.error('error in getAdminDashBoard', error);
    }
  };
  //function : render function
  const DashBoardRenderFunction = ({name, value}) => {
    return (
      <View
        style={{
          height: 100,
          width: '45%',
          borderWidth: 1,
          borderRadius: 20,
          borderColor: Colors.LITEGREEN,
          backgroundColor: Colors.LEMONGREEN,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{name}</Text>
        <Text>{value}</Text>
      </View>
    );
  };
  //hook : useEffect
  useEffect(() => {
    getAdminDashBoard();
  }, [userToken]);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="DashBoard" IsDrawer={true} />
      <View style={styles.mainView}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <DashBoardRenderFunction
            name="Total Daily Tracker"
            value={DashBoardData.total_daily_trackers}
          />
          <DashBoardRenderFunction
            name="Total Digital Library"
            value={DashBoardData.total_digital_library}
          />
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <DashBoardRenderFunction
            name="Total Membership plans"
            value={DashBoardData.total_membership_plans}
          />
          <DashBoardRenderFunction
            name="Total Users"
            value={DashBoardData.total_users}
          />
        </View>
        {/* <View style={{ alignSelf: "center" }} >
                    <FlatList
                        data={DashBoardData}
                        renderItem={DashBoardRenderFunction}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                </View> */}
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(DashBoard);
