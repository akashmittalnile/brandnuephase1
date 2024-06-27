//react components
import React, {useState, useCallback, Fragment, useEffect} from 'react';
import {View, ScrollView, Linking} from 'react-native';
import {CommonActions, useFocusEffect} from '@react-navigation/core';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import MyProfileCard from '../../components/MyProfileCard/MyProfileCard';
import WeightMachineCard from '../../components/WeightMachineCard/WeightMachineCard';
import ItemListView from '../../components/ItemListView/ItemListView';
import ValuePairItemList from '../../components/ValuePairItemList/ValuePairItemList';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//modal
import ChangePassword from '../../components/modal/ChangePassword/ChangePassword';
//styles
import {styles} from './MyProfileStyle';
//global
import {Colors, ScreenNames, Server} from '../../global';
//Svg
import TermSvg from '../../assets/svg/term.svg';
import PrivacyPolicySvg from '../../assets/svg/privacyPolicy.svg';
import LogoutSvg from '../../assets/svg/log-out.svg';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfile = ({navigation, userToken, dispatch}) => {
  //variables : common actions
  const resetIndexGoWelcom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.WELCOME}],
  });
  //states
  const [ShowLoader, setShowLoader] = useState(false);
  const [ChangePasswordModal, setChangePasswordModal] = useState(false);
  const [ProfileDetail, setProfileDetail] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  //function : navigation function
  // const gotoEditProfile = () =>
  //   navigation.navigate(ScreenNames.SIGNUP, {flag: 1});
  const gotoEditProfile = () =>
    navigation.navigate(ScreenNames.EDIT_PROFILE, {
      userInfo: ProfileDetail.user,
    });
  const gotoChangePassword = () => setChangePasswordModal(true);
  const gotoChatNow = () => navigation.navigate(ScreenNames.CHAT_NOW);
  const gotoFavouritePage = () =>
    navigation.navigate(ScreenNames.FAVOURITE_MEALS);
  //function : service function
  useFocusEffect(
    useCallback(() => {
      const getProfileData = async () => {
        setShowLoader(true);
        try {
          const resp = await Server.getApiWithToken(userToken, Server.PROFILE);
          if (resp?.data?.status) {
            console.log('====================================');
            console.log(resp?.data?.data?.user?.plan);
            console.log('====================================');
            setProfileDetail(resp?.data?.data);
            const jsonValue = JSON.stringify(resp?.data?.data?.user);
            await AsyncStorage.setItem('userInfo', jsonValue);
            dispatch(UserAction.setUser(resp?.data?.data?.user));
          }
        } catch (error) {
          console.log('error in getProfileData', error);
        }
        setShowLoader(false);
      };
      getProfileData();
    }, []),
  );
  const gotoPrivacyPolicy = async () => {
    const privacyPolicyLink = `${Server.BASE_URL}api-page/privacy-policy`;
    try {
      // const supported = await Linking.canOpenURL(privacyPolicyLink);
      // if (supported) {
      await Linking.openURL(privacyPolicyLink);
      // } else Alert.alert(`Error`, `unsupported URL: ${privacyPolicyLink}`);
    } catch (error) {
      console.log('error in gotoPrivacyPolicy', error);
    }
  };
  const gotoTermOfUse = async () => {
    const termOfUseLink = `${Server.BASE_URL}api-page/terms-conditions`;
    try {
      // const supported = await Linking.canOpenURL(termOfUseLink);
      // if (supported) {
      await Linking.openURL(termOfUseLink);
      // } else Alert.alert(`Error`, `unsupported URL: ${termOfUseLink}`);
    } catch (error) {
      console.log('error in gotoTermOfUse', error);
    }
  };
  const logOutUser = async () => {
    try {
      setshowLoader(true);
      const resp = await Server.getApiWithToken(userToken, Server.LOGOUT);
      if (resp?.data?.status) {
        await AsyncStorage.clear();
        dispatch(UserAction.logOutUser());
        setshowLoader(false);
        navigation.dispatch(resetIndexGoWelcom);
      }
    } catch (error) {
      setshowLoader(false);
      console.log('error in logOutUser', error);
    }
  };

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="My Profile" />
      {Object.keys(ProfileDetail).length === 0 ? (
        <CustomLoader showLoader={ShowLoader} />
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          style={styles.mainView}>
          <Fragment>
            <MyProfileCard
              Data={ProfileDetail?.user}
              editButtonClicked={() => gotoEditProfile()}
              changePasswordClicked={() => gotoChangePassword()}
              role={ProfileDetail?.user?.role}
            />
            <View style={{height: 20}} />
            {ProfileDetail?.user?.role == 'ADMIN' ? null : (
              <Fragment>
                <WeightMachineCard
                  weightText="Starting Weight"
                  weightValue={`${parseFloat(ProfileDetail.pounds).toFixed(
                    1,
                  )} lbs`}
                />
                <ItemListView
                  number={ProfileDetail.favourite_meal}
                  text="Favorite Meals"
                  backgroundColor={Colors.ORANGE}
                  onPress={() => gotoFavouritePage()}
                />
                <View style={styles.myViewStyle}>
                  <ValuePairItemList
                    name="Age"
                    value={`${ProfileDetail.age} years(${ProfileDetail.user.gender})`}
                    isBorder={true}
                  />
                  <ValuePairItemList
                    name={ProfileDetail.weight_loss_to_date_text}
                    value={`${parseFloat(
                      ProfileDetail.weight_loss_to_date,
                    ).toFixed(1)} pounds`}
                    isBorder={true}
                  />
                  <ValuePairItemList
                    name={ProfileDetail.waist_loss_to_date_text}
                    value={`${parseFloat(
                      ProfileDetail.waist_loss_to_date,
                    ).toFixed(2)} inches`}
                    isBorder={true}
                  />
                  <ValuePairItemList
                    name="Relative Fat Mass (RFM)"
                    value={`${ProfileDetail.rfm} %`}
                  />
                </View>
              </Fragment>
            )}
            <ItemListView
              icon={<TermSvg stroke={Colors.WHITE} height={24} width={24} />}
              text="Terms of Use"
              backgroundColor={Colors.ORANGE}
              onPress={() => gotoTermOfUse()}
            />
            <ItemListView
              icon={
                <PrivacyPolicySvg
                  stroke={Colors.WHITE}
                  height={24}
                  width={24}
                />
              }
              text="Privacy Policy"
              backgroundColor={Colors.ORANGE}
              onPress={() => gotoPrivacyPolicy()}
            />

            <ItemListView
              icon={<LogoutSvg stroke={Colors.WHITE} />}
              text="Logout"
              backgroundColor={Colors.ORANGE}
              onPress={() => logOutUser()}
              disabled={showLoader}
            />
          </Fragment>
        </ScrollView>
      )}
      <ChangePassword
        visible={ChangePasswordModal}
        setVisible={setChangePasswordModal}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
