import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  TitleText: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  TextInputView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-between',
  },
  TextInputstyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
    overflow: 'hidden',
    width: '60%',
  },
  iconView: {
    backgroundColor: Colors.LITEGREEN,
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dropdownStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    height: 40,
    width: '15%',
    borderRadius: 5,
  },
  flexRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vegNonvegView: {
    position: 'absolute',
    left: 2,
    right: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  addText: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.WHITE,
  },
});
