//import : react components
import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
//import : custom components
// import : globals
//import : styles
import {styles} from './CustomAlertStyle';
// import : redux
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Fonts, ScreenNames} from '../../../global';
import {CustomAlertAction} from '../../../redux/actions/actions';

const CustomAlert = () => {
  //variables
  const dispatch = useDispatch();
  //variables : redux variables
  const text = useSelector(state => state.customAlert.text);
  const visible = useSelector(state => state.customAlert.visible);
  const duration = useSelector(state => state.customAlert.duration);
  const hasButtons = useSelector(state => state.customAlert.hasButtons);
  //function : navigation functi

  //function : modal function
  const closeModal = () => {
    dispatch(CustomAlertAction.hideToast());
  };
  const closeAutomatic = () => {
    setTimeout(() => {
      dispatch(CustomAlertAction.hideToast());
    }, duration);
  };
  //UI
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={closeModal}
      onShow={closeAutomatic}
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View style={styles.mainView}>
          <Text
            style={{
              fontFamily: Fonts.SEMI_BOLD,
              fontSize: 16,
            }}>
            {text}
          </Text>
          {hasButtons ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginTop: 10,
              }}>
              <Text>Hello</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={closeModal}
              style={{
                backgroundColor: Colors.LITEGREEN,
                borderRadius: 100,
                alignSelf: 'flex-end',
                padding: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: Colors.WHITE}}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
