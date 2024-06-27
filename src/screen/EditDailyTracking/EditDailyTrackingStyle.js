import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
  },
  CardStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginVertical: 5,
  },
  cardBody: {
    padding: 10,
    paddingHorizontal: 20,
  },
  firstCardSectionBodyDateText: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  greenSmallItemView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  SupplementView: {
    marginVertical: 5,
  },
  SelectSupplementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    padding: 5,
  },
  titleTextStyle: {
    marginVertical: 5,
    fontFamily: Fonts.SEMI_BOLD,
  },
  otherSuppView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderWidth: 0.5,
    height: 40,
    borderRadius: 5,
  },
  otherSuppTextInput: {
    width: '80%',
    paddingLeft: 10,
  },
  addButtonView: {
    backgroundColor: Colors.ORANGE,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButtonText: {
    textAlign: 'center',
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.WHITE,
  },
  noteView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  noteText: {
    marginVertical: 5,
    fontFamily: Fonts.SEMI_BOLD,
  },
  noteTextInput: {
    backgroundColor: Colors.WHITE,
    textAlignVertical: 'top',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 100,
  },
});
