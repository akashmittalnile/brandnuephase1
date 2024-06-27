import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LITEPINK,
    padding: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TitleText: {
    fontFamily: Fonts.SEMI_BOLD,
    marginHorizontal: 10,
  },
  linktext: {
    color: Colors.LITEGREEN,
    fontSize: 12,
    textDecorationLine: 'underline',
    fontFamily: Fonts.SEMI_BOLD,
  },
});
