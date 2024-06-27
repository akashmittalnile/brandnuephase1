import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    elevation: 4,
    margin: 20,
    backgroundColor: Colors.WHITE,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  imageStyle: {
    height: 200,
    width: '100%',
    borderRadius: 5,
  },
  title: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 12,
    marginTop: 20,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  Time: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 8,
    color: Colors.GREY,
  },
  notificationDetailText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 10,
    color: Colors.BLACK,
  },
});
