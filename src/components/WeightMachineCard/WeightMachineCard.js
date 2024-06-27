//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//styles
import {styles} from './WeightMachineCardStyle';
//svg
import WeightMachineSvg from '../../assets/svg/weight-machine.svg';
import EditSvg from '../../assets/svg/edit.svg';
import DeleteSvg from '../../assets/svg/delete.svg';

const WeightMachineCard = ({
  weightText,
  weightValue,
  editButton,
  editButtonPressed = () => {},
  deleteButtonPress = () => {},
  HowToMeasure,
  HowToMeasureButtonPressed = () => {},
}) => {
  //UI
  return (
    <View
      style={{
        ...styles.upperHeaderSectionView,
        borderRadius: editButton ? 0 : 10,
      }}>
      <View style={styles.iconTextView}>
        <WeightMachineSvg />
        <View style={styles.TextView}>
          <Text style={styles.startingWeightText}>{weightText}</Text>
          <Text style={styles.poundsOuncesText}>{weightValue}</Text>
        </View>
      </View>
      {editButton ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => editButtonPressed()}
            style={styles.editButtonView}>
            <View style={styles.editIconView}>
              <EditSvg />
            </View>
            <Text style={styles.EditButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteButtonPress()}
            style={styles.deleteButtonView}>
            <View style={styles.editIconView}>
              <DeleteSvg />
            </View>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {HowToMeasure ? (
        <TouchableOpacity
          onPress={() => HowToMeasureButtonPressed()}
          style={styles.editButtonView}>
          <Text style={styles.EditButtonText}>How to Measure</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default WeightMachineCard;
