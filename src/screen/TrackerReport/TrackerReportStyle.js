import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';
import {windowHeight} from '../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    elevation: 4,
    backgroundColor: Colors.WHITE,
  },
  upperSection: {
    marginVertical: 10,
    elevation: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  NoRecordFoundStyle: {
    textAlign: 'center',
    marginTop: windowHeight / 3,
    fontFamily: Fonts.BOLD,
  },
  FABButtonView: {
    justifyContent: 'flex-end',
    flex: 1,
    padding: 10,
    bottom: 20,
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: Colors.ORANGE,
    bottom: 20,
    right: 20,
  },
  ButtonTextStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: 25,
  },
  upperBodySection: {
    margin: 10,
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: Colors.WHITE,
  },
  listSectionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  listSectionTitleText: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 10,
  },
  listSectionText: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 10,
    color: Colors.BLACK,
  },

  listFooterSectionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingVertical: 10,
    backgroundColor: Colors.ORANGE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listFooterSectionText: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.WHITE,
    fontSize: 10,
  },
});
