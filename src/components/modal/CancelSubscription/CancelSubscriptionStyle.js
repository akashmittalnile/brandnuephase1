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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '10%',
  },
  TitleText: {
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    textAlign: 'center',
  },
  bulletView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletTextStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.GREY,
    marginLeft: 10,
  },
});
