import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  headerView: {
    height: 50,
    // elevation: 20,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTextStyle: {
    fontSize: 18,
    fontFamily: Fonts.SEMI_BOLD,
    textAlign: 'center',
  },
  headerIconStyle: {},
  countViewStyle: {
    position: 'absolute',
    backgroundColor: Colors.RED,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    borderRadius: 100,
    right: -5,
    top: -5,
  },
  notificationCountStyle: {
    fontSize: 10,
    color: Colors.WHITE,
    fontFamily: Fonts.SEMI_BOLD,
    textAlign: 'center',
  },
});
