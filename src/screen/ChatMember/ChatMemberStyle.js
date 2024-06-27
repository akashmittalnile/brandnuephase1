import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
  },
  searchBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 5,
  },
  searchTextInput: {
    width: '100%',
    height: 40,
  },
  MemberView: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingBottom: 5,
    borderBottomColor: Colors.GREY,
  },
  ImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  userDetailView: {
    marginLeft: 10,
  },
  userNameText: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  emailText: {
    fontSize: 12,
  },
  unreadMessageText: {
    fontSize: 12,
    color: Colors.LITEGREEN,
  },
  readmessageText: {
    color: Colors.GREY,
    fontSize: 12,
  },
});
