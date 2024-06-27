import {StyleSheet} from 'react-native';
import {Colors} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    position: 'absolute',
    justifyContent: 'center',
    right: '5%',
    left: '5%',
    top: '45%',
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 20,
  },
});
