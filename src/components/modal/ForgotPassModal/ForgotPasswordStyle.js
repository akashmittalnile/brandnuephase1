import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: Fonts.SEMI_BOLD,
    alignSelf: 'center',
    fontSize: 18,
  },
  textInputHeader: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: Fonts.SEMI_BOLD,
  },
  textInputView: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textInputStyle: {
    width: '80%',
    height: 40,
    marginLeft: 5,
  },
});
