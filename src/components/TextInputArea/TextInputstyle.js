import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';
export const styles = StyleSheet.create({
  textAreaView: {
    marginVertical: 5,

    borderColor: Colors.GREY,
    borderRadius: 10,
    margin: 2,
    padding: 5,
  },
  TextInputTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  TextInputTitle: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  anotherlinkTitle: {
    fontSize: 12,
    color: Colors.LITEGREEN,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: 5,
  },
  linkTitle: {
    fontSize: 12,
    color: Colors.LITEGREEN,
    textDecorationLine: 'underline',
  },
  TextInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textInputBottomText: {
    fontSize: 8,
    fontFamily: Fonts.REGULAR,
  },
});
