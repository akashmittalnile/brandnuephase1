import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../global';
import {windowWidth} from '../../../global/Constant';

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    marginVertical: 10,
  },
  ModalDesc: {
    marginVertical: 20,
    fontFamily: Fonts.REGULAR,
    fontSize: 11,
    textAlign: 'center',
  },
  ImageStyle: {
    height: 200,
    width: windowWidth - 50,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'stretch',
  },
});
