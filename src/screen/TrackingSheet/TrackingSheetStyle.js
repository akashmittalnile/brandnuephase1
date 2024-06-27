import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Constant, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    elevation: 4,
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
