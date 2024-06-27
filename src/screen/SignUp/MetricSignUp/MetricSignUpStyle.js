import {Colors, Fonts} from 'global/index';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 16,
    marginBottom: 10,
  },
});
