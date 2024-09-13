//import : react components
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
//import : custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
//import : global
import {Colors, ScreenNames, Server} from '../../global';
//import : styles
import {styles} from './ChatMemberStyle';
//import : redux
import {connect} from 'react-redux';

const ChatMember = ({userToken, navigation}) => {
  //hook : states
  const [users, setUsers] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [showLoader, setshowLoader] = useState(true);
  //function : navigation function
  const gotoAdminChatNow = item => {
    navigation?.navigate(ScreenNames.ADMIN_CHAT_NOW, {
      userId: item.id,
      name: item.name,
      ImageUrl: item.profile_image,
    });
    setUserData([]);
  };
  //function : service function
  useFocusEffect(
    useCallback(() => {
      const getAllUsers = async () => {
        try {
          setshowLoader(true);
          const {response, status} = await Server.getAPI(
            Server.CUSTOMER_LIST,
            userToken,
          );
          if (status) {
            console.log(JSON.stringify(response.data?.slice(0,10)));
            
            setUserData(response.data);
            setUsers(response.data);
            setshowLoader(false);
          }
        } catch (error) {
          console.log('error in getAllUsers', error?.response?.data);
          setshowLoader(false);
        }
      };
      getAllUsers();
      return () => {};
    }, []),
  );
  const searchMember = nameEmail => {
    try {
      const filteredMember = UserData.filter(
        e =>
          e.first_name.toUpperCase().includes(nameEmail.toUpperCase()) ||
          e.email.toUpperCase().includes(nameEmail.toUpperCase()),
      );
      setUsers(filteredMember);
    } catch (error) {
      console.error('error in searchMember', error);
    }
  };
  //function : render function
  const usersRenderFunction = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => gotoAdminChatNow(item)}
        style={{
          ...styles.MemberView,
          //   borderBottomWidth: index === UserData.length - 1 ? 0 : 0.5,
          borderBottomWidth: 0.5,
        }}>
        {item.profile_image ? (
          <Image
            source={{uri: Server.BASE_URL + item.profile_image}}
            style={styles.ImageStyle}
          />
        ) : (
          <Image
            source={require('../../assets/Images/user.png')}
            style={styles.ImageStyle}
          />
        )}
        <View style={styles.userDetailView}>
          <Text style={styles.userNameText}>{item.name}</Text>
          <Text style={styles.emailText}>{item.email}</Text>
          {parseInt(item.total) > 0 ? (
            <Text style={styles.unreadMessageText}>
              {`${item.total} unseen messages`}
            </Text>
          ) : (
            <Text style={styles.readmessageText}>seen</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  //useEffect
  // useEffect(() => {
  //   getAllUsers();
  //   return () => {};
  // }, [userToken]);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Chat" />
      <View style={styles.mainView}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="search"
            onChangeText={text => searchMember(text)}
            placeholderTextColor="gray"
            style={styles.searchTextInput}
          />
        </View>

        {users.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 50}}
            data={users}
            renderItem={usersRenderFunction}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <>
            <ActivityIndicator
              animating={showLoader}
              size="large"
              color={Colors.ORANGE}
            />
            {showLoader ? null : (
              <Text style={{textAlign: 'center'}}>No Elite Member Found</Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(ChatMember);
