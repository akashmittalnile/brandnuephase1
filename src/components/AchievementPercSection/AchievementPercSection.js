//react components
import {View, Text} from 'react-native';
import React from 'react';
//styles
import {styles} from './AchievementPercSectionStyle';

const AchievementPercSection = ({NextWeight, Percentage}) => {
  return (
    <View style={styles.lbsAchievementSection}>
      <Text style={styles.lbsAchievementText}>
        {parseFloat(NextWeight).toFixed(1)} LBS. until next achievement
      </Text>
      <View style={styles.lbsPercentageMeterView}>
        <View
          style={{
            ...styles.leftPercentMeter,
            width: `${Percentage}%`,
          }}
        />
        <View
          style={{
            ...styles.RightPercentMeter,
            width: `${100 - Percentage}%`,
          }}
        />
      </View>
      <View
        style={{
          ...styles.lbsPercentageView,
          left: `${Percentage}%`,
        }}>
        <Text style={styles.lbsPercentageText}>
          {parseInt(Percentage).toFixed(0)}%
        </Text>
      </View>
    </View>
  );
};

export default React.memo(AchievementPercSection);
