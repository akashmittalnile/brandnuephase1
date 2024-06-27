import {Colors, Fonts} from 'global/index';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
  },
  planCard: {
    padding: 20,
    backgroundColor: '#92b116',
    borderRadius: 50,
  },
  titleText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  normalText: {
    color: Colors.WHITE,
  },
  subText: {
    color: Colors.WHITE,
    fontFamily: Fonts.SEMI_BOLD,
    marginVertical: 10,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  listText: {
    color: Colors.WHITE,
    marginLeft: 5,
    width: '80%',
    fontFamily: Fonts.REGULAR,
  },
  buttonView: {
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.LITEGREEN,
    fontFamily: Fonts.SEMI_BOLD,
  },
});
