//react components
import React from 'react';
import {View, Text} from 'react-native';
//styles
import {styles} from './CircularProgressStyle';

const CircularProgress = ({percent}) => {
  /**
   * Override styles that get passed from props
   **/
  const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + percent * 3.6;
    return {
      transform: [{rotateZ: `${rotateBy}deg`}],
    };
  };

  const renderThirdLayer = percent => {
    if (percent > 50) {
      /**
       * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
       * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
       * before passing to the propStyle function
       **/
      return (
        <View
          style={[
            styles.secondProgressLayer,
            propStyle(percent - 50, 45),
          ]}></View>
      );
    } else {
      return <View style={styles.offsetLayer}></View>;
    }
  };
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  //UI
  return (
    <View style={styles.container}>
      <Text style={styles.sixHourText}>6</Text>
      <Text style={styles.twelveHourText}>12</Text>
      <Text style={styles.eighteenHourText}>18</Text>
      <Text style={styles.twentyFourHourText}>24</Text>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      <Text style={styles.display}>
        {parseFloat(percent / 4.16666667).toFixed(2)}HRS
      </Text>
    </View>
  );
};

export default CircularProgress;
