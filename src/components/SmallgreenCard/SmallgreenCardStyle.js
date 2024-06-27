import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LEMONGREEN,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  TitleIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TitleText: {
    fontFamily: Fonts.SEMI_BOLD,
    width: '85%',
  },
  IconView: {
    backgroundColor: Colors.RED,
    padding: 4,
    borderRadius: 100,
  },
  TextInputView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  TextInputStyle: {
    width: '48%',
    backgroundColor: Colors.WHITE,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    fontFamily: Fonts.SEMI_BOLD,
  },
  bottomInputText: {
    fontSize: 8,
    fontFamily: Fonts.REGULAR,
    marginVertical: 5,
  },
});
