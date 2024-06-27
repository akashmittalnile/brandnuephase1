import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: '40%',
    width: '75%',
  },
  onlineStoreText: {
    fontFamily: Fonts.SEMI_BOLD,
    marginTop: 20,
    textAlign: 'center',
  },
  onlineStoreDetailText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 10,
    marginTop: 10,
    textAlign: 'center',
    width: '70%',
  },
  ButtonStyle: {
    marginTop: 30,
    backgroundColor: Colors.LITEGREEN,
    padding: 10,
    width: '60%',
    borderRadius: 20,
  },
  ButtonText: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 12,
  },
});
