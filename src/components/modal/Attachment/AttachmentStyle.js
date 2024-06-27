import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../global/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    margin: 20,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
  },
  optionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  ButtonView: {
    backgroundColor: Colors.LITEGREEN,
    padding: 10,
    borderRadius: 100,
  },
  textStyle: {
    fontFamily: Fonts.SEMI_BOLD,
  },
});
