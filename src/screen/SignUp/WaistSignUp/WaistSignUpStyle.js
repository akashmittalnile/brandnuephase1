import {Colors, Fonts} from 'global/index';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    color: Colors.LITEGREEN,
    marginBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  noteText: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
