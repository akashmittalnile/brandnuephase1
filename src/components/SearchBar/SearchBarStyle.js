import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  SearchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: Colors.WHITE,
  },
  textInputStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    marginLeft:10,
    width: '80%',
  },
  dropDownItems: {
    padding: 10,
  },
  dropDownText: {
    fontFamily: Fonts.SEMI_BOLD,
    color:Colors.BLACK,
  },
});
