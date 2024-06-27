import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';
import {widthToDp} from '../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: '40%',
    width: '75%',
  },
  dailyTrackingText: {
    fontFamily: Fonts.SEMI_BOLD,
    marginTop: 20,
  },
  dailyTrackingDetailText: {
    fontFamily: Fonts.REGULAR,
    fontSize: widthToDp(1),
    textAlign: 'center',
    width: '60%',
    marginVertical: 10,
  },
  ButtonStyle: {
    backgroundColor: Colors.ORANGE,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: '60%',
  },
  buttonText: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: widthToDp(1),
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
