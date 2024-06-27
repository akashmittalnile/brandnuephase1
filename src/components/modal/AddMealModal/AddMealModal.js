//react components
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
//globals
import {Colors, Server} from '../../../global';
//styles
import {styles} from './AddMealModalStyle';
//redux
import {connect} from 'react-redux';

const AddMealModal = ({
  visible = false,
  setVisible = () => {},
  setmealQuantityModal,
  setSelectedMealType,
  userToken,
}) => {
  //States
  const [selectedItem, setselectedItem] = useState(0);
  const [MealType, setMealType] = useState([]);
  const getAllMealType = async () => {
    try {
      const resp = await Server.getApiWithToken(userToken, Server.ADD_MEAL);
      if (resp.data.status) {
        setMealType(resp.data.data);
      }
    } catch (error) {
      console.error('error in getAllMealType', error);
    }
  };
  //function : imp function
  const setIntakeQuantity = () => {
    setSelectedMealType(MealType[selectedItem].name);
    closeModal();
    setmealQuantityModal(true);
  };
  //function : modal function
  const closeModal = () => {
    setVisible(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent={true}
      onShow={getAllMealType}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View style={styles.mainView}>
          <Text style={styles.titleStyle}>Add to which meal</Text>
          {MealType.length > 0 ? (
            MealType.map((item, index) => (
              <TouchableOpacity
                style={{
                  ...styles.RadioButtonView,
                  borderColor:
                    selectedItem == index ? Colors.ORANGE : Colors.BLACK,
                }}
                onPress={() => setselectedItem(index)}
                key={index}>
                <View
                  style={{
                    ...styles.outerCircleView,
                    borderColor:
                      selectedItem == index ? Colors.ORANGE : Colors.BLACK,
                  }}>
                  {selectedItem == index ? (
                    <View style={styles.innerCircleView} />
                  ) : null}
                </View>
                <Text style={styles.ItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <ActivityIndicator size="large" color="#f39322" />
          )}
          <TouchableOpacity
            onPress={() => setIntakeQuantity()}
            style={styles.ButtonView}>
            <Text style={styles.ButtonText}>Set Intake Quantity</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(React.memo(AddMealModal));
