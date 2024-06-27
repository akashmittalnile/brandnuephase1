//react components
import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
//custom components
import MyButton from '../../MyButton/MyButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//styles
import {styles} from './SelectModalStyle';

const SelectModal = ({
  visible,
  setVisible = () => {},
  SelectModalTitle,
  SelectedItems,
  SelectedItem = () => {},
  data,
}) => {
  //function : modal function
  const selectItem = item => {
    const index = SelectedItems.findIndex(e => e.id === item.id);
    if (index > -1) {
      closeModal();
    } else {
      SelectedItem([...SelectedItems, item]);
      closeModal();
    }
  };
  const closeModal = () => {
    setVisible(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      transparent={true}
      animationType="fade">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <KeyboardAwareScrollView>
          <View style={styles.mainView}>
            <Text style={styles.modalTitle}>{SelectModalTitle}</Text>
            {data.length > 0
              ? data.map((item, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => selectItem(item)}
                    style={{
                      ...styles.itemView,
                      borderBottomWidth: data.length - 1 == index ? null : 0.5,
                    }}>
                    <Text style={styles.ItemTextStyle}>{item.name}</Text>
                  </TouchableOpacity>
                ))
              : null}
            <MyButton ButtonTitle="Cancel" onPress={closeModal} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default React.memo(SelectModal);
