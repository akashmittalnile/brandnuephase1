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
  mainView: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 18,
    marginVertical: 10,
  },
  subText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 14,
    marginVertical: 10,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
