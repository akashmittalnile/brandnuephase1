import {Colors, Fonts} from 'global/index';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  mainView: {
    padding: 20,
  },
  titleText: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 16,
  },
  subText: {
    fontFamily: Fonts.REGULAR,
    marginVertical: 10,
  },
  warningText: {
    color: Colors.ORANGE,
    marginVertical: 10,
    fontFamily: Fonts.ITALIC,
    fontSize: 12,
  },
});
