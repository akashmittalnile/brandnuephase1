import {StyleSheet} from 'react-native';
import {Colors, Constant, Fonts} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK + 'cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // blurView: {
  //   flex: 1,
  // },
  mainView: {
    justifyContent: 'space-around',
    margin: '10%',
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  logoStyle: {
    height: '30%',
    width: Constant.windowWidth / 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: -10,
  },
  subText: {
    color: Colors.BLACK,
    fontFamily: Fonts.SEMI_BOLD,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomSection: {
    justifyContent: 'center',
  },
  buttonView: {
    backgroundColor: Colors.LITEGREEN,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
  },
});
