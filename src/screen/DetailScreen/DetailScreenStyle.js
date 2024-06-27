import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    padding: 20,
  },
  titleStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    marginBottom: 10,
  },
  descStyle: {
    fontFamily: Fonts.REGULAR,
    fontSize: 12,
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdfViewStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    // borderWidth:1,
    margin: 10,
    // borderColor:Colors.LITEGREEN,
    alignItems: 'center',
  },
  pdfTextStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    textAlign: 'center',
    marginLeft: 10,
    width: '80%',
  },
});
