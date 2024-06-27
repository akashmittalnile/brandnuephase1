import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  mainView: {
    padding: 20,
  },
  forgotPasswordText: {
    textAlign: 'center',
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 12,
  },
});
