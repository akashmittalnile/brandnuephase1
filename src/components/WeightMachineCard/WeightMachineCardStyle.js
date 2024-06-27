import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';

export const styles = StyleSheet.create({
  upperHeaderSectionView: {
    flexDirection: 'row',
    backgroundColor: Colors.LITEGREEN,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  iconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextView: {
    marginLeft: 10,
  },
  startingWeightText: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 10,
    color: Colors.WHITE,
  },
  poundsOuncesText: {
    marginVertical: 5,
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.WHITE,
    fontSize: 12,
  },
  editIconView: {
    backgroundColor: Colors.WHITE,
    padding: 2,
    borderRadius: 100,
  },
  editButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    padding: 5,
    marginRight: 10,
    borderColor: Colors.WHITE,
  },
  deleteButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.WHITE,
    padding: 5,
  },
  deleteButtonText: {
    marginLeft: 3,
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 8,
    color: Colors.WHITE,
  },
  EditButtonText: {
    marginLeft: 3,
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: 8,
    color: Colors.WHITE,
  },
});
