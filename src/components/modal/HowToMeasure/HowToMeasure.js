//react components
import React from 'react';
import {Modal, Text, Image, TouchableOpacity, View} from 'react-native';
//custom components
import MyButton from '../../MyButton/MyButton';
// styles
import {styles} from './HowToMeasureStyle';

const HowToMeasure = ({visible = false, setVisibility = () => {}}) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };

  //UI
  return (
    <Modal
      onRequestClose={closeModal}
      visible={visible}
      animationType="fade"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View style={styles.childContainer}>
          <Text style={styles.modalTitle}>How to Measure</Text>
          {/* <Text style={styles.ModalDesc}>
                        In publishing and graphic design, form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                    </Text> */}
          <Image
            source={require('../../../assets/Images/measure.jpg')}
            style={styles.ImageStyle}
          />
          <MyButton ButtonTitle="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(HowToMeasure);
