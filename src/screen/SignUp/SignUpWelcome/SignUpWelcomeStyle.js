import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 24,
    color: Colors.LITEGREEN,
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    fontSize: 14,
    marginTop: 15,
    width: '60%',
  },
});
