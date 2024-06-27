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
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  detailText: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  bulletTitle: {
    fontFamily: Fonts.SEMI_BOLD,
    marginVertical: 5,
  },
  bulletPoint: {
    textAlign: 'center',
    marginVertical: 5,
  },
});
