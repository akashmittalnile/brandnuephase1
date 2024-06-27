import {StyleSheet} from 'react-native';

// styles
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LITEGREEN,
    borderRightColor: Colors.WHITE,
    borderRightWidth: 2,
  },
  profileSectionView: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImageStyle: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  drawerMiddleView: {
    marginTop: 50,
  },
  DrawerBottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    padding: 20,
  },
  TextIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutStyle: {
    backgroundColor: Colors.LEMONGREEN,
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'center',
    width: '10%',
    padding: 5,
  },
  logoutTextStyle: {
    marginLeft: 5,
    color: Colors.WHITE,
    fontSize: 12,
    fontFamily: Fonts.SEMI_BOLD,
  },
});
