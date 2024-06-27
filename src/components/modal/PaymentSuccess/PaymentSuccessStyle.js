import {Colors, Fonts} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  childContainer: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  headerContainer: {},
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.REGULAR,
    textAlign: 'center',
    marginBottom: 5,
  },
  TextInputTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
