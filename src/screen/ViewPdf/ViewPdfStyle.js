import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerStyle: {
    // position: "absolute",
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 0,
    left: 0,
    height: 50,
    elevation: 4,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
  },
  titleStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 16,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
