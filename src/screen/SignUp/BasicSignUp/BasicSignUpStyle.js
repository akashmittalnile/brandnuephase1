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
  title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    color: Colors.LITEGREEN,
    width: '40%',
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: Fonts.SEMI_BOLD,
    marginBottom: 10,
  },
});
