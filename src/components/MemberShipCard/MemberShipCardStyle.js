import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../global';
import {windowWidth} from '../../global/Constant';

export const styles = StyleSheet.create({
  parentView: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#789310',
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    paddingHorizontal: 15,
  },
  planTitle: {
    color: Colors.WHITE,
    marginVertical: 10,
    fontSize: 18,
  },
  planTypeText: {
    color: Colors.WHITE,
    marginBottom: 10,
  },
  childView: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 20,
    paddingBottom: 25,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  dollarText: {
    color: Colors.GREY,
    marginTop: -10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
  },
  lineStyle: {
    marginBottom: 10,
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 0.5,
  },
  planDisc: {
    fontSize: 12,
    color: Colors.GREY,
    marginBottom: 10,
  },
  planIncludeViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '90%',
  },
  planIncludeTextStyle: {
    fontSize: 14,
    color: Colors.GREY,
    fontFamily: Fonts.SEMI_BOLD,
    marginLeft: 10,
  },
  planView: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  planTextStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    marginLeft: 10,
  },
  radioButtonOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.LITEGREEN,
  },
  radioButtonInnerCircle: {
    height: 13,
    width: 13,
    borderRadius: 100,
    backgroundColor: Colors.LITEGREEN,
  },
  buttonView: {
    elevation: 4,
    borderWidth: 0.5,
    borderColor: Colors.LITEGREEN,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: -20,
  },
  buttonText: {
    padding: 5,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    color: Colors.LITEGREEN,
  },
  slidableBottomDotStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  slidableDotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  slidableDotStyle: {
    height: 10,
    width: 10,
    marginHorizontal: 2,
    borderRadius: 10,
    marginTop: -20,
  },
});
