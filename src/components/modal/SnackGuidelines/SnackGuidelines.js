//react components
import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
//styles
import {styles} from './SnackGuidelinesStyle';

const SnackGuidelines = ({visible, setVisibility}) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <Text style={styles.Title}>Snacking Guide</Text>
          <Text style={styles.detailText}>
            To keep an accurate daily fasting window, snacks should only include
            protein (meats and eggs), water- based vegetables (listed below),
            and/or pre-approved low caloric products (I.e., Walden Farms &
            Skinny Girl dressings). These foods will not significantly increase
            insulin levels and do not break the fast in our system. Snacking is
            always optional and should only occur when you are physically
            hungry.
          </Text>
          <Text style={styles.bulletTitle}>
            To know if you should have a time entry for snack consumption,
            please follow this guide:
          </Text>
          <Text style={styles.bulletPoint}>
            1)If your snack is within the parameters above, you should NOT have
            a time entry.
          </Text>
          <Text style={styles.bulletPoint}>
            2)If your snack is outside these parameters, you SHOULD have a time
            entry.
          </Text>
          <Text style={styles.detailText}>
            “FREE” water-based vegetables: lettuce, tomato, onion, bell peppers,
            jalapeño/banana peppers, cabbage, mushrooms, celery, cucumber
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default SnackGuidelines;
