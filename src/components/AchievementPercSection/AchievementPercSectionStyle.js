import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  lbsAchievementSection: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colors.GRASS_GREEN,
  },
  lbsAchievementText: {
    fontFamily: Fonts.BOLD,
    color: Colors.LITEGREEN,
    fontSize: 11,
    marginBottom: 10,
  },
  lbsPercentageMeterView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftPercentMeter: {
    height: 10,
    backgroundColor: Colors.LITEGREEN,
  },
  RightPercentMeter: {
    height: 10,
    backgroundColor: Colors.WHITE,
  },
  lbsPercentageView: {
    marginHorizontal: 10,
    position: 'absolute',
    height: 30,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
  },

  lbsPercentageText: {
    padding: 3,
    color: Colors.LITEGREEN,
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 10,
  },
});
